import { take, put, call, fork } from 'redux-saga/effects'
import fetchAPI from '../../services/api'
import {
  getMeSuccess, getMeFail, GET_ME_REQEUST,
  postSignInSuccess, postSignInFail, POST_SIGN_IN_REQUEST,
  postSignUpSuccess, postSignUpFail, POST_SIGN_UP_REQUEST,
  postForgotSuccess, postForgotFail, POST_FORGOT_REQUEST,
} from './actions'


export function* getMeAction() {
  try {
    const profile = yield call(fetchAPI, { endpoint: 'user/me' })
    yield put(getMeSuccess(profile))
  } catch (e) {
    yield put(getMeFail(e))
  }
}
export function* watchGetMe() {
  while (true) {
    yield take(GET_ME_REQEUST)
    yield call(getMeAction)
  }
}

export function* signInAction(credentials) {
  try {
    const profile = yield call(fetchAPI, { endpoint: 'auth/login', post: true, data: credentials })
    yield put(postSignInSuccess(profile))
  } catch (e) {
    yield put(postSignInFail(e))
  }
}
export function* watchSignIn() {
  while (true) {
    const { payload: { credentials } } = yield take(POST_SIGN_IN_REQUEST)
    yield call(signInAction, credentials)
  }
}

export function* signUpAction(credentials) {
  try {
    const profile = yield call(fetchAPI, { endpoint: 'auth/signup', post: true, data: credentials })
    yield put(postSignUpSuccess(profile))
  } catch (e) {
    yield put(postSignUpFail(e))
  }
}
export function* watchSignUp() {
  while (true) {
    const { payload: { credentials } } = yield take(POST_SIGN_UP_REQUEST)
    yield call(signUpAction, credentials)
  }
}

export function* forgotAction() {
  try {
    yield call(fetchAPI, { endpoint: 'auth/forgotpassword', post: true })
    yield put(postForgotSuccess())
  } catch (e) {
    yield put(postForgotFail(e))
  }
}
export function* watchForgot() {
  while (true) {
    yield take(POST_FORGOT_REQUEST)
    yield call(forgotAction)
  }
}

export default function* () {
  yield fork(watchGetMe)
  yield fork(watchSignIn)
  yield fork(watchSignUp)
  yield fork(watchForgot)
}
