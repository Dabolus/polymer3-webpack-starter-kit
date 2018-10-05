const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {InjectManifest: InjectManifestPlugin} = require('workbox-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const config = require('../app.config')(true);
const baseConfig = require('./base.config');
const merge = require('webpack-merge');

module.exports = merge(baseConfig(config), {
  mode: 'production',
  // We need to provide our own Terser plugin to provide a custom configuration
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        extractComments: true,
      }),
    ],
    splitChunks: {
      // TODO: Checkout why this option isn't working.
      // The default value is 'async', but setting it to 'all' is suggested.
      // See https://github.com/webpack/webpack.js.org/blob/master/src/content/plugins/split-chunks-plugin.md#optimizationsplitchunkschunks-all
      // chunks: 'all',
      name: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          tsConfigFile: resolve(__dirname, '../../tslint.json'),
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
      ...config.app.transpile ? [{
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
          ...config.app.transpile ? [{
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
  plugins: [
    new CleanWebpackPlugin([config.outputDir], {root: resolve(__dirname, '../..')}),
    new HtmlWebpackPlugin({
      config,
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
      template: `!!handlebars-loader!${resolve(__dirname, '../../src/index.hbs')}`,
    }),
    new ScriptExtHtmlWebpackPlugin({
      defer: ['webcomponents-loader.js', 'app.js'],
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, '../../src/static/'),
        to: '.',
        ignore: ['.*', 'sw.js']
      },
      // Custom Elements ES5 adapter
      {
        from: resolve(__dirname, '../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'),
        to: './scripts/wc',
        flatten: true,
      },
      // WebComponents Polyfills
      {
        from: resolve(__dirname, '../../node_modules/@webcomponents/webcomponentsjs/bundles/**/*'),
        to: './scripts/wc/bundles',
        flatten: true,
      },
    ]),
    new InjectManifestPlugin({
      swSrc: resolve(__dirname, '../../src/service-worker.js'),
      swDest: resolve(__dirname, '../..', config.outputDir, 'sw.js'),
      exclude: [/webcomponents-(?!loader).*\.js$/, /images\/manifest/, /favicon\.ico$/],
    }),
    ...config.bundleAnalyzer.enabled ? [new BundleAnalyzerPlugin({
      analyzerHost: 'localhost',
      analyzerPort: config.bundleAnalyzer.port,
    })] : [],
  ],
});
