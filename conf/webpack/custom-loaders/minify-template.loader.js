const {minify} = require('html-minifier');

module.exports = (src) =>
  src.replace(
    /`(\s*<[a-z](?:[^`\\]|\\.)*>\s*)`/gi,
    (template, html) => `\`${minify(html, {
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
    })}\``,
  );
