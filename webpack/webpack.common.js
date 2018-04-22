const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  config: {
    entry: [
      './index.jsx',
      './index.scss',
    ],
    output: {
      filename: 'bundle.js',
      path: `${__dirname}/../dist`,
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
  },
  sharedPlugins: (mode) => {
    const htmlWebpackPluginOptions = {
      template: 'app.html',
      filename: '../index.html',
    }
    if (mode === 'prod') {
      htmlWebpackPluginOptions.minify = {
        collapseWhitespace: true,
        minifyJS: {
          mangle: false,
        },
        removeComments: true,
      }
    }
    return [
      new HtmlWebpackPlugin(htmlWebpackPluginOptions),
      new MiniCssExtractPlugin({ filename: 'bundle.css' }),
    ]
  },
}
