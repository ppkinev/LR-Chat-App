import { signalRInit } from 'store/actions'
import {
  GET_ME_SUCCESS,
  POST_SIGN_IN_SUCCESS,
  POST_SIGN_UP_SUCCESS,

  POST_CONNECT_LR,
  POST_CONNECT_FB,
  POST_CONNECT_LR_SUCCESS,
  POST_CONNECT_FB_SUCCESS,
  POST_CONNECT_LR_FAIL,
  POST_CONNECT_FB_FAIL,

  POST_SIGN_IN_FAIL,
  POST_SIGN_UP_FAIL,
  POST_FORGOT_FAIL,

  getMeRequest,
  postConnectLRSuccess,
  postConnectLRFail,
  postConnectFBSuccess,
  postConnectFBFail,
} from './actions'
import { triggerLogInFlow } from '../../services/auth'
import { authData } from '../../config'

const middleware = store => next => (action) => {
  const { type, payload } = action

  if (
    type === GET_ME_SUCCESS
    || type === POST_SIGN_IN_SUCCESS
    || type === POST_SIGN_UP_SUCCESS
  ) {
    // Doing something on first user detection
    if (!store.getState().profile.id) {
      store.dispatch(signalRInit())
    }
  }

  if (type === POST_CONNECT_LR) {
    triggerLogInFlow({
      onSuccess: () => store.dispatch(postConnectLRSuccess()),
      onFail: () => store.dispatch(postConnectLRFail()),
    })
  }

  if (type === POST_CONNECT_FB) {
    triggerLogInFlow({
      isFB: true,
      onSuccess: () => store.dispatch(postConnectFBSuccess()),
      onFail: () => store.dispatch(postConnectFBFail()),
    })
  }

  if (type === POST_CONNECT_LR_SUCCESS
    || type === POST_CONNECT_FB_SUCCESS
    || type === POST_CONNECT_LR_FAIL
    || type === POST_CONNECT_FB_FAIL
  ) {
    authData.userManager && authData.userManager.getUser().then((user) => {
      if (user) store.dispatch(getMeRequest())
    })
  }

  if (
    type === POST_SIGN_IN_FAIL
    || type === POST_SIGN_UP_FAIL
    || type === POST_FORGOT_FAIL
  ) {
    const { error } = action.payload
    const { Message: message, ModelState: fields } = error
    const properError = { message }
    if (fields) {
      properError.fields = {}
      Object.entries(fields).forEach(([k, v]) => {
        properError.fields[k.substring(k.lastIndexOf('.') + 1, k.length).toLowerCase()] = v[0]
      })
    }
    return next({
      ...action,
      payload: {
        error: properError,
      },
    })
  }

  return next(action)
}

export default middleware
