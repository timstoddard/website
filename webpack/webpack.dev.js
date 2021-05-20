const common = require('./webpack.common')

module.exports = common.merge(common.config('dev'), {
  mode: 'development',
  devtool: 'eval', // fastest page reload time
  plugins: common.sharedPlugins('dev'),
  devServer: {
    // contentBase: './dist',
    historyApiFallback: true,
    clientLogLevel: 'error',
  },
})
