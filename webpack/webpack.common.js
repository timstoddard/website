const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
  config: {
    entry: [
      './src/index.jsx',
      './src/index.scss',
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
      extensions: ['.js', '.jsx'],
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
