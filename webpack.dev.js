const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './index.jsx',
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    publicPath: '/dist',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  postcss: function() {
    return [autoprefixer]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', { allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
