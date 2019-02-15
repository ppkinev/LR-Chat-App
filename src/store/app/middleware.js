import { IFRAME_MESSAGE_SEND } from './actions'

const middleware = store => next => (action) => {
  const { payload, type } = action

  if (type === IFRAME_MESSAGE_SEND) {
    const { message } = payload
    window.parent.postMessage(JSON.stringify(message), '*')
  }

  return next(action)
}

export default middleware
