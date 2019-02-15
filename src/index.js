// https://github.com/diegohaz/arc/wiki/Example-app
import 'react-hot-loader/patch'
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { basename } from 'config'
import configureStore from 'store/configure'
import App from 'components/App'

import { isNotSilentSignIn, authCallbackHandlers } from './services/auth/callbacks'
import { initAuthHandlers } from './services/auth'

const store = configureStore({})

const renderApp = () => (
  <Provider store={store}>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </Provider>
)

const root = document.getElementById('app')

isNotSilentSignIn(() => {
  authCallbackHandlers()
  initAuthHandlers(() => {
    render(renderApp(), root)

    if (module.hot) {
      module.hot.accept('components/App', () => {
        require('components/App')
        render(renderApp(), root)
      })
    }
  })
})

