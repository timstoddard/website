const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
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
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: false,
      uglifyOptions: {
        output: {
          comments: false,
        },
        compress: {
          unused: true,
          dead_code: true,
          warnings: false,
          drop_debugger: true,
          conditionals: true,
          evaluate: true,
          drop_console: false,
          sequences: true,
          booleans: true,
        },
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new MiniCssExtractPlugin({ filename: 'bundle.css' }),
    new HtmlWebpackPlugin({
      template: 'app.html',
      filename: '../index.html',
      minify: {
        collapseWhitespace: true,
        minifyJS: {
          mangle: false,
        },
        removeComments: true,
      },
    }),
  ],
}
