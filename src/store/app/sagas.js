import { take, put, call, fork } from 'redux-saga/effects'
// import { eventChannel } from 'redux-saga'
import { iframeMessageSend, getAppFail, getAppSuccess, GET_APP_REQUEST } from './actions'
import fetchAPI from '../../services/api'

// const listenToPostMessage = () => {
//   return eventChannel((dispatch) => {
//     window.addEventListener('message', (ev) => {
//       dispatch(iframeMessageSend(ev.data))
//     })
//
//     return () => {
//
//     }
//   })
// }
// export function* watchPostMessageListen() {
//   const channel = yield call(listenToPostMessage)
//   while (true) {
//     const action = yield take(channel)
//     yield put(action)
//   }
// }

export function* getApp() {
  try {
    const app = yield call(fetchAPI, { endpoint: 'app/getclient' })
    yield put(getAppSuccess(app))
  } catch (e) {
    yield put(getAppFail(e))
  }
}

export function* watchGetApp() {
  while (true) {
    yield take(GET_APP_REQUEST)
    yield call(getApp)
  }
}

export default function* () {
  // yield fork(watchPostMessageListen)
  yield fork(watchGetApp)
}
