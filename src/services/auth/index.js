import axios from 'axios'
import Qs from 'qs'
import isMobile from 'ismobilejs'
import { UserManager, WebStorageStateStore } from 'oidc-client'
import { getAppRequest } from 'store/actions'
import fetchAPI from '../../services/api'
import { authData, apiKey as clientID, redirectURIOverride, env } from '../../config'
import { saveAccessToken, getAuthSettings, saveAuthSettings } from './helpers'

const authURLs = {
  everton: {
    live: 'https://everton.auth.rewarded.club',
    test: 'http://everton.auth-test.rewarded.club',
    dev: 'http://everton.auth.localhost:5001',
  },
  mancity: {
    live: 'https://mancity.auth.rewarded.club',
    test: 'http://mancity.auth-test.rewarded.club',
    dev: 'http://mancity.auth.localhost:5001',
  },
  qpr: {
    live: 'https://qpr.auth.rewarded.club',
    test: 'http://qpr.auth-test.rewarded.club',
    dev: 'http://qpr.auth.localhost:5001',
  },
}

const isUserManagerExist = (callback) => {
  if (authData.userManager && callback) {
    callback()
    return
  }

  const interval = window.setInterval(() => {
    if (authData.userManager) {
      window.clearInterval(interval)
      if (callback) callback()
    }
  }, 200)
}

const prolongClientToken = (expiresIn, endpoint) => {
  const THRESHOLD = 30
  const checkIn = expiresIn > THRESHOLD ? expiresIn - THRESHOLD : expiresIn

  isUserManagerExist(() => {
    authData.userManager.getUser().then((user) => {
      if (!user) {
        const timeout = window.setTimeout(() => {
          window.clearTimeout(timeout)
          getClientToken(endpoint)
        }, checkIn * 1000)
      }
    })
  })
}

const getClientToken = (endpoint, callback) => {
  const data = Qs.stringify({
    grant_type: 'client_credentials',
    client_id: clientID,
    scope: 'coreapi_full',
  })

  axios({ url: endpoint, method: 'post', data })
    .then((response) => {
      window.console.info('Getting client access token')
      const { access_token: token, token_type: type, expires_in: expiresIn } = response.data

      saveAccessToken(`${type} ${token}`)

      prolongClientToken(expiresIn, endpoint)
      if (callback) callback()
    })
    .catch((error) => {
      window.console.warn('Failing client access token')
      window.console.warn(error)
    })
}

const initClientTokenFn = (authURL, callback) => {
  const configURL = `${authURL}.well-known/openid-configuration`

  axios({ url: configURL }).then((response) => {
    window.console.info('Getting URL for obtaining client access token')
    getClientToken(response.data.token_endpoint, callback)
  }).catch((error) => {
    window.console.warn('Failing getting URL for client access token')
    window.console.warn(error)
  })
}

const initUserManager = (authURL, callback) => {
  const callbackURI = redirectURIOverride
    || authData.clientRedirectURI
    || window.location.origin
  window.console.info('OpenID callbackURI', callbackURI)

  authData.userManager = new UserManager({
    authority: authURL,
    client_id: clientID,
    redirect_uri: callbackURI, // on successful login getting back to the same page
    silent_redirect_uri: callbackURI, // trying same URI to fetch silent token renewal
    response_type: 'id_token token',
    scope: 'openid coreapi_full',
    post_logout_redirect_uri: callbackURI, // getting back to the same page on logout

    // setting local storage as default user storage
    userStore: new WebStorageStateStore({ store: window.localStorage }),

    // should automatically renew the token using silent redirect page
    // check it, if not working, do this logic yourself
    automaticSilentRenew: true,
  })

  authData.userManager.events.addUserSignedOut(() => {
    authData.userManager.removeUser()
  })

  if (getAuthSettings() && getAuthSettings().loginRequired) {
    authData.userManager.removeUser()
  }

  // it uses authorization server to sign in in the background
  // if user logged in using other app
  // catch is needed as this shit always throws an error
  // right after retrieving the result
  saveAuthSettings({ isSilent: callbackURI, isInIFrame: window !== window.parent })


  authData.userManager.signinSilent().catch((err) => {
    window.console.warn(err)
  })

  // wrapping with a timeout to make sure that signinSilent will be able to finish its job
  window.setTimeout(() => {
    if (callback) callback()
  }, 1000)
}

// public API call to retrieve auth server address
function dummyPublicAPICall(callback) {
  let authURL = authURLs.everton.live // get this from the public API

  switch (env) {
    case 'test':
      authURL = authURLs.everton.test
      break
    case 'local':
      authURL = authURLs.everton.dev
      break
    default:

  }

  if (authURL[authURL.length - 1] !== '/') authURL += '/'

  if (callback) callback(authURL)
}

function onSuccessLogIn(response, callback) {
  if (callback) callback(response)
}

function onSuccessLogOut(response, callback) {
  if (callback) callback(response)
}

// var popupSettings = 'menubar=no,location=no,resizable=no,scrollbars=yes,status=no, width=200, height=200, top=0, left=0';
const getPopupSettings = (params) => {
  const w = params.w
  const h = params.h

  const width = w || 480
  const height = h || 750

  const top = (screen.height / 2) - (height / 2)
  const left = (screen.width / 2) - (width / 2)

  return 'menubar=no,location=no,resizable=no,scrollbars=yes,status=no, ' +
    'width=' + width + ', ' +
    'height=' + height + ', ' +
    'top=' + top + ', ' +
    'left=' + left
}

export const initAuthHandlers = (callback) => {
  dummyPublicAPICall((authURL) => {
    initClientTokenFn(authURL, () => {
      fetchAPI({ endpoint: 'app/getclient' })
        .then((res) => {
          authData.clientRedirectURI = res.Url
          initUserManager(authURL, callback)
        })
    })
  })
}

export const triggerLogInFlow = ({ isFB, onSuccess, onFail } = {}) => {
  const signinRequestArgs = {}
  if (isFB) signinRequestArgs.acr_values = 'idp:facebook'

  if (isMobile.any) {
    // for mobile
    saveAuthSettings({})

    authData.userManager.signinRedirect(signinRequestArgs)
      .then((response) => {
        onSuccessLogIn(response, onSuccess)
      })
      .catch((err) => {
        if (onFail) onFail(err)
        window.console.warn('OpenID redirect error', err)
      })
  } else {
    // for desktop
    saveAuthSettings({ isPopup: true })
    signinRequestArgs.popupWindowFeatures = getPopupSettings({ w: 480, h: 750, isCentered: true })

    authData.userManager.signinPopup(signinRequestArgs)
      .then((response) => {
        onSuccessLogIn(response, onSuccess)
      })
      .catch((err) => {
        authData.userManager.getUser().then((user) => {
          if (user) {
            onSuccessLogIn(user, onSuccess)
          } else {
            if (onFail) onFail(err)
            window.console.warn('OpenID popup error', err)
          }
        })
      })
  }
}

export const triggerLogOutFlow = ({ onSuccess, onFail } = {}) => {
  if (isMobile.any) {
    // for mobile
    saveAuthSettings({ isLogOut: true })

    authData.userManager.signoutRedirect()
      .then((response) => {
        onSuccessLogOut(response, onSuccess)
      })
      .catch((err) => {
        if (onFail) onFail(err)
        window.console.warn('OpenID redirect error', err)
      })
  } else {
    // for desktop
    saveAuthSettings({ isPopup: true, isLogOut: true })

    authData.userManager.signoutPopup({
      popupWindowFeatures: getPopupSettings({ w: 780, h: 450, isCentered: true }),
    })
      .then((response) => {
        onSuccessLogOut(response, onSuccess)
      })
      .catch((err) => {
        if (onFail) onFail(err)
        window.console.warn('OpenID popup error', err)
      })
  }
}

export const isUserLoggedIn = (callback) => {
  authData.userManager.getUser().then(user => callback && callback(!!user))
}
