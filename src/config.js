const merge = require('lodash/merge')

const script = document.getElementById('main-app')
const scriptSrc = script && script.getAttribute('src')
const basePath = scriptSrc ? scriptSrc.substring(0, scriptSrc.lastIndexOf('/')) : '.'

const apiKey = window.apiKey || 'everton_rewards_chat_test'
const apiPrefix = window.apiPrefix || 'http://spr-api-test.cloudapp.net/core/v1/'
const redirectURIOverride = window.redirectUrl
const env = window.environment

const config = {
  all: {
    basename: process.env.PUBLIC_PATH,
    isBrowser: typeof window !== 'undefined',
    iconsPath: `${basePath}/icons`,
    apiKey,
    apiPrefix,
    basePath,
    redirectURIOverride,
    env,
    authData: {},
  },
  test: {},
  development: {},
  production: {
    apiUrl: 'https://jsonplaceholder.typicode.com',
  },
}

module.exports = merge(config.all, config[config.all.env])
