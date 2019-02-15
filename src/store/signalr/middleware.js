import { SIGNAL_R_INIT, SIGNAL_R_CONNECTED, SIGNAL_R_SEND, SIGNAL_R_RECEIVED } from './actions'
import { chatHub, signalRInit } from '../../services/signalr'
import { getPinnedBubbleInfo } from '../../services/helpers'

function getProperTime() {
  const time = new Date()
  const hours = time.getHours() < 10 ? (`0${time.getHours()}`) : time.getHours()
  const mins = time.getMinutes() < 10 ? (`0${time.getMinutes()}`) : time.getMinutes()

  return `${hours}:${mins}`
}

function getSystemPayload(text) {
  return {
    message: {
      text, isSystem: true, id: Date.now(),
    },
  }
}

const middleware = store => next => (action) => {
  const { payload, type } = action

  if (type === SIGNAL_R_INIT) {
    signalRInit()
    return next({
      ...action,
      payload: getSystemPayload('Connecting...'),
    })
  }

  if (type === SIGNAL_R_CONNECTED) {
    return next({
      ...action,
      payload: getSystemPayload('Connection established.'),
    })
  }

  if (type === SIGNAL_R_SEND) {
    const { message } = payload
    chatHub.server.sendMessage({
      ...message,
      pointsAmount: message.amountPlaced,
    })
  }

  if (type === SIGNAL_R_RECEIVED) {
    const { message } = payload
    const messageObject = {
      id: message.MessageId,
      text: message.Text,
      name: message.UserName,
      amountPlaced: message.PointsAmount,
      image: message.UserImageUrl,
    }
    messageObject.receivedAt = getProperTime()
    if (messageObject.amountPlaced) messageObject.isPinned = getPinnedBubbleInfo(messageObject.amountPlaced).isPinned

    return next({
      ...action,
      payload: {
        message: messageObject,
      },
    })
  }

// store.dispatch(entitiesReceive(entities))
  return next(action)
}

export default middleware
