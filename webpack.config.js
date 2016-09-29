const webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    publicPath: ''
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
  }
};
