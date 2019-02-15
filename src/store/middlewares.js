const { middleware: thunkMiddleware } = require('redux-saga-thunk')

const req = require.context('.', true, /\.\/.+\/middleware\.js$/)

const middlewares = req.keys()
  .map(key => req(key).default)
  .concat([
    thunkMiddleware,
  ])

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger')
  middlewares.push(logger)
}

module.exports = middlewares
