import { apiKey as clientID, authData } from '../../config'

export const getAccessToken = (callback) => {
  if (!callback) return null
  if (authData.userManager) {
    authData.userManager.getUser().then((user) => {
      if (user) {
        if (Date.now() - (user.expires_at * 1000) >= 0) {
          authData.userManager.removeUser()
          callback(window.localStorage.getItem(`${clientID}:access_token`))
        } else {
          callback(`${user.token_type} ${user.access_token}`)
        }
      } else {
        callback(window.localStorage.getItem(`${clientID}:access_token`))
      }
    })
  } else {
    callback(window.localStorage.getItem(`${clientID}:access_token`))
  }
}

export const saveAccessToken = (token) => {
  window.localStorage.setItem(`${clientID}:access_token`, token)
}

export const getAccessTokenPure = (callback) => {
  getAccessToken(token => token && token.split(' ').length > 1 && callback(token.split(' ')[1]))
}

export const getAuthSettings = () => {
  const set = window.localStorage.getItem(`${clientID}:auth_settings`)
  return set && JSON.parse(set)
}

export const saveAuthSettings = ({ isPopup, isLogOut, isSilent, loginRequired, isInIFrame } = {}) => {
  window.localStorage.setItem(`${clientID}:auth_settings`, JSON.stringify({
    isPopup,
    isLogOut,
    isSilent,
    loginRequired,
    isInIFrame,
  }))
}

export const getHashParameters = (url) => {
  const hash = url ? url.substring(url.lastIndexOf('#') + 1, url.length) : window.location.hash.substr(1)

  return hash.split('&').reduce((result, item) => {
    const parts = item.split('=')
    if (parts[0].length === 0 || parts[0] === '/') return result
    result[parts[0]] = parts[1]
    return result
  }, {})
}
