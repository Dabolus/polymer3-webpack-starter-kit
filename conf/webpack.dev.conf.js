const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080', // live reload
      '../src/bootstrap',
    ],
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../build'),
    hot: true,
    historyApiFallback: true,
    // Uncomment next line if you want your dev server to use HTTP/2
    // https: true,
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../build'),
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
    new CleanWebpackPlugin(['build'], {verbose: true, root: path.resolve(__dirname, '..')}),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        useShortDoctype: true
      },
      hash: true,
      inject: true,
      template: '../src/index.html'
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/static/'),
        to: '.',
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../src/node_modules/@webcomponents/webcomponentsjs/*.js'),
        to: '.',
        ignore: ['gulpfile.js'],
        flatten: true,
      },
    ]),
    new webpack.HotModuleReplacementPlugin(),
  ]
};
