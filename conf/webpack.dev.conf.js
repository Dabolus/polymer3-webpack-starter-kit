const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {HotModuleReplacementPlugin} = require('webpack');
const config = require('./app.config')(false);
const devServerConfig = require('./dev-server.config');

module.exports = {
  entry: {
    app: '../src/bootstrap',
  },
  mode: 'development',
  devtool: 'inline-source-map',
  serve: devServerConfig,
  output: {
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[name].js',
    path: resolve(__dirname, '../dev'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          tsConfigFile: resolve(__dirname, '../tslint.json'),
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
        use: ['to-string-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.html']
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
        from: resolve(__dirname, '../src/static/'),
        to: '.',
        ignore: ['.*']
      },
      {
        from: resolve(__dirname, '../src/node_modules/@webcomponents/webcomponentsjs/*.js'),
        to: '.',
        ignore: ['gulpfile.js'],
        flatten: true,
      },
    ]),
    new HotModuleReplacementPlugin(),
  ]
};
