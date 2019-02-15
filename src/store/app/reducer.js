import { initialState } from './selectors'
import {
  GET_APP_REQUEST,
  GET_APP_FAIL,
  GET_APP_SUCCESS,
} from './actions'

export default (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case GET_APP_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true,
      }
    case GET_APP_FAIL:
      return {
        ...state,
        isFetching: false,
        error: payload.error,
      }
    case GET_APP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        title: payload.app.AppTitle,
        foundation: payload.app.FoundationName,
        foundationUrl: payload.app.FoundationRewardsSiteUrl,
        isActive: payload.app.IsActive,
        clientRedirectURI: payload.app.Url,
      }
    default:
      return {
        ...state,
      }
  }
}
