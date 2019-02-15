export const SIGNAL_R_INIT = 'SIGNAL_R_INIT'
export const signalRInit = () => ({
  type: SIGNAL_R_INIT,
})

export const SIGNAL_R_CONNECTED = 'SIGNAL_R_CONNECTED'
export const signalRConnected = () => ({
  type: SIGNAL_R_CONNECTED,
})

export const SIGNAL_R_SEND = 'SIGNAL_R_SEND'
export const signalRSend = message => ({
  type: SIGNAL_R_SEND,
  payload: {
    message,
  },
})

export const SIGNAL_R_RECEIVED = 'SIGNAL_R_RECEIVED'
export const signalRReceived = message => ({
  type: SIGNAL_R_RECEIVED,
  payload: {
    message,
  },
})

export const SIGNAL_R_CLOSED = 'SIGNAL_R_CLOSED'
export const signalRClosed = () => ({
  type: SIGNAL_R_CLOSED,
})

export const SIGNAL_R_MESSAGE_CONVERT = 'SIGNAL_R_MESSAGE_CONVERT'
export const signalRMessageConvert = id => ({
  type: SIGNAL_R_MESSAGE_CONVERT,
  payload: {
    id,
  },
})
