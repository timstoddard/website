const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'eval',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    publicPath: '/dist'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react',
        exclude: /node_modules/
      },
      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader'])
      }
    ]
  },
  postcss: function () {
    return [autoprefixer];
  },
  plugins: [new ExtractTextPlugin('bundle.css', { allChunks: true})],
  devServer: {
    historyApiFallback: true,
  }
};
