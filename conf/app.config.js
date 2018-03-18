// Use this file to setup your app settings

module.exports = {
  // The output directory of your built project,
  // relative to the project dir.
  // e.g. The default value will output your project to
  // <project dir>/build directory
  outputDir: 'build',

  // The base path of your app.
  // It should ALWAYS start and end with a slash (unless it is just a slash, of course)
  // Note that changing this will also affect webpack dev server path
  basePath: '/',

  // Whether to transpile the app for older browsers or not.
  // Setting this variable to true will both transpile the JS code
  // and use PostCSS to autoprefix your CSS
  transpile: false,

  // Webpack dev server settings
  devServer: {
    // The port where webpack dev server should serve the app content
    port: 8080,

    // Set this to true if you want webpack dev server
    // to serve your content over HTTP/2
    useHTTP2: false,

    // Set this to true if you want webpack dev server
    // to gzip your content
    enableGzip: false,
  },

  // Webpack bundle analyzer settings
  bundleAnalyzer: {
    // Set this flag to true to enable the analyzer
    enabled: false,

    // The port where webpack bundle analyzer should serve its output
    port: 8081,
  },
};
