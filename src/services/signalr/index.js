import { apiPrefix } from '../../config'
import { getAccessTokenPure } from '../auth/helpers'

const signalRIsReady = window.$ && window.$.connection
export const signalRInit = () => {
  if (signalRIsReady) {
    getAccessTokenPure((token) => {
      window.$.connection.hub.url = `${apiPrefix}signalr`
      window.$.connection.hub.qs = `access_token=${token}`
      window.$.connection.hub.logging = false
      window.$.connection.hub.start({ transport: 'webSockets' })
        .done(() => {
          window.console.info(`Now connected, connection ID=${window.$.connection.hub.id}`)

          // TODO: remove this part, when server will do it
          window.$.connection.chatHub.client.onConnected()
        })
        .fail(() => {
          window.console.warn('Could not Connect!')
        })
    })
  }
}

export const chatHub = signalRIsReady ? window.$.connection.chatHub : null
