const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {HotModuleReplacementPlugin} = require('webpack');
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
            loader: 'postcss-loader',
            options: {
              config: {
                path: resolve(__dirname, '../postcss.config.js'),
                ctx: config,
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
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
      template: '!!handlebars-loader!../src/index.hbs',
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, '../../src/static/'),
        to: '.',
        ignore: ['.*']
      },
      {
        from: resolve(__dirname, '../../src/node_modules/@webcomponents/webcomponentsjs/*.js'),
        to: './scripts/wc',
        ignore: ['gulpfile.js', 'webcomponents-loader.js'],
        flatten: true,
      },
    ]),
    new HotModuleReplacementPlugin(),
  ],
});
