const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('../app.config')(false);
const baseConfig = require('./base.config');
const devServerConfig = require('./dev-server.config');
const merge = require('webpack-merge');

module.exports = merge(baseConfig(config), {
  mode: 'development',
  devtool: 'inline-source-map',
  serve: devServerConfig,
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            exportAsEs6Default: true,
          },
        },
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      config,
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
        ignore: ['.*']
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
  ],
});
