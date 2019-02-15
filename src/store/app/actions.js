export const IFRAME_MESSAGE_RECEIVED = 'IFRAME_MESSAGE_RECEIVED'
export const iframeMessageReceived = message => ({
  type: IFRAME_MESSAGE_RECEIVED,
  payload: {
    message,
  },
})

export const IFRAME_MESSAGE_SEND = 'IFRAME_MESSAGE_SEND'
export const iframeMessageSend = message => ({
  type: IFRAME_MESSAGE_SEND,
  payload: {
    message,
  },
})

export const GET_APP_REQUEST = 'GET_APP_REQUEST'
export const getAppRequest = () => ({
  type: GET_APP_REQUEST,
})

export const GET_APP_SUCCESS = 'GET_APP_SUCCESS'
export const getAppSuccess = app => ({
  type: GET_APP_SUCCESS,
  payload: {
    app,
  },
})

export const GET_APP_FAIL = 'GET_APP_FAIL'
export const getAppFail = error => ({
  type: GET_APP_FAIL,
  payload: {
    error,
  },
})

export const SAFARI_COOKIE_SET = 'SAFARI_COOKIE_SET'
export const safariCookieSet = () => ({
  type: SAFARI_COOKIE_SET,
})
