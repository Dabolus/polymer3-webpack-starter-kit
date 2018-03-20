const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {HotModuleReplacementPlugin} = require('webpack');
const config = require('./app.config');

const devServerUrl =
  `${config.devServer.useHTTP2 ? 'https' : 'http'}://localhost:${config.devServer.port}${config.basePath}`;

module.exports = {
  entry: {
    app: [
      `webpack-dev-server/client?${devServerUrl}`, // live reload
      '../src/bootstrap',
    ],
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: resolve(__dirname, '../dev'),
    hot: true,
    historyApiFallback: true,
    port: config.devServer.port,
    https: config.devServer.useHTTP2,
    compress: config.devServer.enableGzip,
    publicPath: devServerUrl,
    openPage: config.basePath.substr(1), // remove the leading slash
  },
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
        test: /\.ejs$/,
        use: 'ejs-compiled-loader',
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
    new CleanWebpackPlugin(['dev'], {verbose: true, root: resolve(__dirname, '..')}),
    new HtmlWebpackPlugin({
      basePath: config.basePath,
      hash: true,
      inject: true,
      template: '../src/index.ejs',
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
