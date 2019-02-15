import { initialState } from './selectors'
import {
  SIGNAL_R_CONNECTED,
  SIGNAL_R_INIT,
  SIGNAL_R_RECEIVED,
  SIGNAL_R_MESSAGE_CONVERT,
} from './actions'

export default (state = initialState, { type, payload = { message: {} } }) => {
  switch (type) {
    case SIGNAL_R_CONNECTED:
      return {
        ...state,
        messages: [...state.messages, payload.message],
        ready: true,
      }
    case SIGNAL_R_INIT:
    case SIGNAL_R_RECEIVED:
      return {
        ...state,
        messages: [...state.messages, payload.message],
      }
    case SIGNAL_R_MESSAGE_CONVERT:
      return {
        ...state,
        messages: [
          ...state.messages.map((mes) => {
            if (mes.id === payload.id) return { ...mes, unpinned: true }
            return mes
          }),
        ],
      }
    default:
      return {
        ...state,
      }
  }
}
