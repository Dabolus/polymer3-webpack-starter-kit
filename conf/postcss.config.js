module.exports = ({file, options}) => ({
  parser: 'postcss-safe-parser',
  plugins: {
    'postcss-import': {root: file.dirname},
    'postcss-cssnext': {},
    'autoprefixer': options.app.autoprefix ? {} : false,
    'cssnano': options.production ? {} : false,
  },
});
