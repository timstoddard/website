const merge = require('webpack-merge').merge // package now in TS
const ESLintPlugin = require('eslint-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const autoprefixer = require('autoprefixer')
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
    'css-modules-typescript-loader',
    cssLoader,
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            ['autoprefixer', { /* options */ }],
          ],
        },
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
      path: path.resolve(__dirname, '../dist'),
      publicPath: mode === 'prod' ? '/dist/' : '/',
      filename: '[name].[fullhash:8].js',
      chunkFilename: '[name].[chunkhash:8].chunk.js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: { transpileOnly: true },
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
        // images/etc
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
  }),
  sharedPlugins: (mode) => {
    const forkTsCheckerWebpackPluginOptions = mode == 'prod'
      ? {
        async: false,
        typescript: {
          memoryLimit: 4096,
        }
      }
      : {}

    const htmlWebpackPluginOptions = {
      template: 'src/app.html',
      filename: './index.html',
    }
    if (mode === 'prod') {
      htmlWebpackPluginOptions.minify = {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
      htmlWebpackPluginOptions.scriptLoading = 'defer'
    }
    return [
      new ForkTsCheckerWebpackPlugin(forkTsCheckerWebpackPluginOptions),
      new HtmlWebpackPlugin(htmlWebpackPluginOptions),
      new MiniCssExtractPlugin({
        filename: '[name].[fullhash:8].css',
        chunkFilename: '[name].[chunkhash:8].chunk.css',
      }),
      new ESLintPlugin({
        files: './src/**/!(*.d).{ts,tsx,js,jsx}',
      }),
    ]
  },
  merge,
}
