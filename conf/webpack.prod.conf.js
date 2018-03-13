const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const transpile = process.env.TRANSPILE === 'true';

module.exports = {
  entry: {
    ...transpile && { polyfills: 'babel-polyfill' },
    'wc/webcomponents-loader': '../src/node_modules/@webcomponents/webcomponentsjs/webcomponents-loader', 
    app: '../src/bootstrap',
  },
  mode: 'production',
  output: {
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[name].js',
    path: path.resolve(__dirname, '../build'),
  },
  resolveLoader: {
    alias: {
      // Custom loaders
      'minify-template-loader': path.resolve(__dirname, 'minify-template-loader.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          tsConfigFile: path.resolve(__dirname, '../tslint.json'),
          failOnHint: true,
          typeCheck: true,
          fix: true,
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            exportAsEs6Default: true,
            minimize: true,
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'to-string-loader',
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
          ...transpile ? [{
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => {
                require('postcss-import')({ root: loader.resourcePath }),
                require('postcss-cssnext')(),
                require('autoprefixer')(),
                require('cssnano')()
              },
            },
          }] : [],
          {
            loader: 'sass-loader',
          },
        ],
      },
      ...transpile ? [{
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            'syntax-dynamic-import',
          ],
        },
      }] : [],
      {
        test: /\.ts$/,
        use: [
          ...transpile ? [{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                'syntax-dynamic-import',
              ],
            },
          }] : [],
          {
            loader: 'ts-loader',
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.[jt]s$/,
        use: {
          loader: 'minify-template-loader',
          options: {
            caseSensitive: true,
            collapseWhitespace: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.html']
  },
  plugins: [
    new CleanWebpackPlugin(['build'], {root: path.resolve(__dirname, '..')}),
    new HtmlWebpackPlugin({
      transpile,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
      },
      hash: true,
      inject: true,
      template: '!!handlebars-loader!../src/index.hbs',
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/static/'),
        to: '.',
        ignore: ['.*', 'sw.js']
      },
      {
        from: path.resolve(__dirname, '../src/node_modules/@webcomponents/webcomponentsjs/*.js'),
        to: './scripts/wc',
        ignore: ['gulpfile.js', 'webcomponents-loader.js'],
        flatten: true,
      },
    ]),
    new WorkboxPlugin({
      globDirectory: path.resolve(__dirname, '../build'),
      globPatterns: ['*.html', 'scripts/*.js', 'scripts/wc/webcomponents-loader.js', 'manifest.json'],
      swDest: path.resolve(__dirname, '../build/sw.js'),
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [{
        urlPattern: /\/scripts\/wc\/.*\.js/,
        handler: 'staleWhileRevalidate',
      }],
    }),
  ],
};
