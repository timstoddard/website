const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
  config: {
    entry: [
      './src/index.tsx',
      './src/index.scss',
    ],
    output: {
      path: `${__dirname}/../dist`,
      publicPath: '/dist/',
      filename: 'bundle.js',
      chunkFilename: '[name].[chunkhash:8].chunk.js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.js$/,
          loader: 'source-map-loader',
          enforce: 'pre',
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [autoprefixer],
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
  },
  sharedPlugins: (mode) => {
    const htmlWebpackPluginOptions = {
      template: 'src/app.html',
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
