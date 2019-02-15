// https://github.com/diegohaz/arc/wiki/Webpack
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devServer = require('@webpack-blocks/dev-server2')
// const splitVendor = require('webpack-blocks-split-vendor')
const happypack = require('webpack-blocks-happypack')

const {
  addPlugins, createConfig, entryPoint, env, setOutput,
  sourceMaps, defineConstants, webpack,
} = require('@webpack-blocks/webpack2')

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000
const sourceDir = process.env.SOURCE || 'src'

// './' used as relative path when in a subfolder
const publicPathProd = `/${process.env.PUBLIC_PATH || ''}/`.replace('//', './')

// '/' used if served from its own domain
const publicPathDev = `/${process.env.PUBLIC_PATH || ''}/`.replace('//', '/')
const sourcePath = path.join(process.cwd(), sourceDir)
const outputPath = path.join(process.cwd(), 'dist')

const staticServerTestUrl = 'http://spr-static-test.cloudapp.net'
const apiServerTestUrl = 'http://spr-api-test.cloudapp.net'
const staticServerProdUrl = 'https://static.rewarded.club'
const apiServerProdUrl = 'https://api.rewarded.club'

const babel = () => () => ({
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
})

const assets = () => () => ({
  module: {
    rules: [
      { test: /\.(png|jpe?g|svg|woff2?|ttf|eot)$/, loader: 'url-loader?limit=8000' },
    ],
  },
})

const resolveModules = modules => () => ({
  resolve: {
    modules: [].concat(modules, ['node_modules']),
  },
})

const isProduction = process.env.NODE_ENV === 'production'

const config = createConfig([
  entryPoint({
    app: sourcePath,
  }),
  setOutput({
    filename: '[name].js',
    path: outputPath,
    publicPath: publicPathProd,
  }),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV,
    'process.env.PUBLIC_PATH': publicPathProd.replace(/\/$/, ''),
  }),
  addPlugins([
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(process.cwd(), 'public/index.html'),
      staticUrl: isProduction ? staticServerProdUrl : staticServerTestUrl,
      apiUrl: isProduction ? apiServerProdUrl : apiServerTestUrl,
    }),
  ]),
  happypack([
    babel(),
  ]),
  assets(),
  resolveModules(sourceDir),

  env('development', [
    setOutput({
      publicPath: publicPathDev,
    }),
    devServer({
      contentBase: 'public',
      stats: 'errors-only',
      historyApiFallback: { index: publicPathDev },
      headers: { 'Access-Control-Allow-Origin': '*' },
      host,
      port,
    }),
    sourceMaps(),
    addPlugins([
      new webpack.NamedModulesPlugin(),
    ]),
  ]),

  env('pre-prod', [
    addPlugins([
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    ]),
  ]),

  env('production', [
    // splitVendor(),
    addPlugins([
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    ]),
  ]),
])

module.exports = config
