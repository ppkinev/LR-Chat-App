import { UserManager, WebStorageStateStore } from 'oidc-client'
import { getHashParameters, getAuthSettings, saveAuthSettings } from './helpers'

export const isNotSilentSignIn = (callback) => {
  // app is launched in iframe and has errors in url
// most probably it is due to silent sign in attempt
  if (window.parent !== window) {
    if (getHashParameters().error) {
      if (getHashParameters().error === 'login_required') {
        (() => {
          saveAuthSettings({ ...getAuthSettings(), loginRequired: true })
        })()
      }

      return null
    }

    if (getAuthSettings() && getAuthSettings().isSilent && !getAuthSettings().isInIFrame) {
      (new UserManager({
        userStore: new WebStorageStateStore({ store: window.localStorage }),
      })).signinRedirectCallback().catch(() => {
      })
      saveAuthSettings({ ...getAuthSettings(), isSilent: null })
      return null
    }
    callback && callback()
  } else {
    callback && callback()
  }

  return null
}

export const authCallbackHandlers = () => {
  const url = window.location.href
  const set = getAuthSettings() || {} // {page, isPopup, isLogOut}
  const manager = new UserManager({
    userStore: new WebStorageStateStore({ store: window.localStorage }),
  })

  const params = getHashParameters(url)

  function clearHash() {
    window.setTimeout(() => {
      window.location.hash = '/'
    }, 100)
  }

  function closeWinAttempt() {
    window.setTimeout(() => {
      window.close()
    }, 300)
  }

  // logout for some reason uses search query instead of hashes
  // so handled separately
  // if (url.indexOf('state=') !== -1 && set.isLogOut) {
  if (set.isLogOut) {
    if (set.isPopup) {
      manager.signoutPopupCallback()
      closeWinAttempt()
    } else {
      manager.signoutRedirectCallback()
      clearHash()
    }

    saveAuthSettings({ page: set.page })
  }


  if (params.access_token && params.id_token) {
    if (set.isPopup) {
      manager.signinPopupCallback()
      closeWinAttempt()
    } else {
      manager.signinRedirectCallback()
      clearHash()
    }

    saveAuthSettings({ page: set.page })
  }


  if (params.error) {
    switch (params.error) {
      // user is not logged in or token has to be obtained using UI
      case 'login_required':

        break
      // user has to grant permissions to the app to get be logged in
      case 'consent_required':

        break
      // user cancelled window or any other reason
      case 'access_denied':

        break
      default:
    }

    console.warn('Authorization error occurred', params.error)

    if (set.isPopup) {
      closeWinAttempt()
    } else {
      clearHash()
    }
    saveAuthSettings({ page: set.page })
  }
}
