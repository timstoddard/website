const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common')

module.exports = merge(common.config, {
  plugins: [
    ...common.sharedPlugins('prod'),
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        warnings: true,
        toplevel: true,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
})
