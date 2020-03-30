const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const path = require('path')

const getCssLoaders = (useCssModules, mode) => {
  const cssLoader = useCssModules
    ? {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: mode === 'prod' ? '[hash:base64:5]' : '[local]__[hash:base64:5]',
        },
      },
    }
    : 'css-loader'
  return [
    MiniCssExtractPlugin.loader,
    cssLoader,
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: [autoprefixer],
      },
    },
    'sass-loader',
  ]
}

module.exports = {
  config: (mode) => ({
    entry: [
      './src/index.tsx',
      './src/index.scss',
    ],
    output: {
      path: path.join(__dirname, '../dist'),
      publicPath: mode === 'prod' ? '/dist/' : '/',
      filename: '[name].[hash:8].js',
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
        // use css modules for most styles
        {
          test: /\.scss$/,
          exclude: /(index.scss|node_modules)/,
          use: getCssLoaders(true, mode),
        },
        // load global styles normally
        {
          test: /\.scss$/,
          include: /(index.scss|node_modules)/,
          use: getCssLoaders(false, mode),
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
  }),
  sharedPlugins: (mode) => {
    const htmlWebpackPluginOptions = {
      template: 'src/app.html',
      filename: './index.html',
    }
    if (mode === 'prod') {
      htmlWebpackPluginOptions.minify = {
        collapseWhitespace: true,
        minifyJS: {
          mangle: false,
        },
        removeComments: true,
      }
      htmlWebpackPluginOptions.scriptLoading = 'defer'
    }
    return [
      new HtmlWebpackPlugin(htmlWebpackPluginOptions),
      new MiniCssExtractPlugin({
        filename: '[name].[hash:8].css',
        chunkFilename: '[name].[chunkhash:8].chunk.css',
      }),
    ]
  },
}
