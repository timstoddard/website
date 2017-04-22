/* eslint-disable no-console, import/no-extraneous-dependencies */

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const createServer = require('./server')
const config = require('./webpack.dev')

const compiler = webpack(config)

createServer((app) => {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    stats: { colors: true },
  }))
  app.use(webpackHotMiddleware(compiler, { log: console.log }))
})
