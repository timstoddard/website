const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  devtool: 'eval',
  entry: [
    './index.jsx',
    './index.scss',
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    publicPath: '/dist',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader?presets[]=env&presets[]=react',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'bundle.css' }),
    new HtmlWebpackPlugin({
      template: 'app.html',
      filename: '../index.html',
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
}
