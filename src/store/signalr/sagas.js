import { take, call, put, fork } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { signalRReceived, signalRClosed, signalRConnected } from './actions'
import { chatHub } from '../../services/signalr'

function signalRInitChannel() {
  return eventChannel((dispatch) => {
    if (chatHub) {
      chatHub.client.onConnected = () => {
        return dispatch(signalRConnected())
      }

      chatHub.client.newMessage = (message) => {
        return dispatch(signalRReceived((message)))
      }

      chatHub.client.displayError = (error) => {
        // TODO: add popup with hints/errors functionality and show error there
        window.alert(error)
      }

      chatHub.client.onDisconnected = () => {
        return dispatch(signalRClosed())
      }
    }

    return () => {

    }
  })
}

export function* signalRSagas() {
  const channel = yield call(signalRInitChannel)
  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}

export default function* () {
  yield fork(signalRSagas)
}
