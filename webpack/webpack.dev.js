const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common.config('dev'), {
  mode: 'development',
  devtool: 'eval', // fastest page reload time
  plugins: common.sharedPlugins('dev'),
  devServer: {
    historyApiFallback: true,
  },
})
