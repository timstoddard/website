const merge = require('webpack-merge').merge // package now in TS
const ESLintPlugin = require('eslint-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
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
      meta: {
        // charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
        description: 'Tim Stoddard, Software Engineer',
      },
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

    const favicons = {
      path: '/', // Path for overriding default icons path. `string`
      appName: 'Tim Stoddard Website', // Your application's name. `string`
      appShortName: 'Tim Stoddard', // Your application's short_name. `string`. Optional. If not set, appName will be used
      appDescription: 'Tim Stoddard Website', // Your application's description. `string`
      developerName: 'Tim Stoddard', // Your (or your developer's) name. `string`
      developerURL: 'https://github.com/timstoddard', // Your (or your developer's) URL. `string`
      dir: 'auto', // Primary text direction for name, short_name, and description
      lang: 'en-US', // Primary language for name and short_name
      // background: '#fff', // Background colour for flattened icons. `string`
      // theme_color: '#fff', // Theme color user for example in Android's task switcher. `string`
      appleStatusBarStyle: 'black-translucent', // Style for Apple status bar: 'black-translucent', 'default', 'black'. `string`
      display: 'standalone', // Preferred display mode: 'fullscreen', 'standalone', 'minimal-ui' or 'browser'. `string`
      orientation: 'any', // Default orientation: 'any', 'natural', 'portrait' or 'landscape'. `string`
      scope: '/', // set of URLs that the browser considers within your app
      // start_url: '/?homescreen=1', // Start URL when launching the application from a device. `string`
      preferRelatedApplications: false, // Should the browser prompt the user to install the native companion app. `boolean`
      relatedApplications: undefined, // Information about the native companion apps. This will only be used if `preferRelatedApplications` is `true`. `Array<{ id: string, url: string, platform: string }>`
      version: '1.0', // Your application's version string. `string`
      logging: false, // Print logs to console? `boolean`
      pixel_art: false, // Keeps pixels 'sharp' when scaling up, for pixel art.  Only supported in offline mode.
      loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
      manifestMaskable: false, // Maskable source image(s) for manifest.json. 'true' to use default source. `boolean`, `string`, `buffer` or array of `string`
      // This is different than the mask applied on the icons. More information at https://web.dev/maskable-icon/
      icons: {
        // Platform Options:
        // - offset - offset in percentage
        // - background:
        //   * false - use default
        //   * true - force use default, e.g. set background for Android icons
        //   * color - set background for the specified icons
        // - mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
        // - overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
        // - overlayShadow - apply drop shadow after mask has been applied .`boolean`
        //
        android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        coast: true, // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        favicons: true, // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        firefox: true, // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        yandex: true, // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
      },
    };

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
      new FaviconsWebpackPlugin('media/favicon/timstoddard-logo.png', {
        prefix: 'favicon/',
        inject: true,
        favicons,
      }),
    ]
  },
  merge,
}
