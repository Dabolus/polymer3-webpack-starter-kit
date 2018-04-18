const {resolve} = require('path');
const customLoaders = require('./custom-loaders');

module.exports = (config) => ({
  entry: {
    ...config.app.transpile && { polyfills: '@babel/polyfill' },
    'wc/webcomponents-loader': '../src/node_modules/@webcomponents/webcomponentsjs/webcomponents-loader',
    app: '../src/bootstrap',
  },
  output: {
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/components/[id].js',
    path: resolve(__dirname, '../..', config.outputDir),
  },
  resolveLoader: {
    // You can add your own custom loaders inside the `custom-loaders` directory
    // you don't need to include them anywhere, as they will automatically be included
    // e.g. The `minify-template.loader.js` is automatically loaded as `minify-template-loader`
    alias: customLoaders,
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.html']
  },
});
