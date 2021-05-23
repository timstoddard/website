const common = require('./webpack.common')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')

module.exports = common.merge(common.config('dev'), {
  mode: 'development',
  devtool: 'eval', // fastest page reload time
  plugins: [
    ...common.sharedPlugins('dev'),
    new ForkTsCheckerNotifierWebpackPlugin({
      title: 'TypeScript',
      excludeWarnings: false,
    }),
  ],
  devServer: {
    // contentBase: './dist',
    historyApiFallback: true,
    clientLogLevel: 'error',
  },
})
