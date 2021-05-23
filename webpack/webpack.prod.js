const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const common = require('./webpack.common')

module.exports = common.merge(common.config('prod'), {
  mode: 'production',
  plugins: [
    ...common.sharedPlugins('prod'),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
})
