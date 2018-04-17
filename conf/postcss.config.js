module.exports = ({file, options}) => ({
  parser: 'postcss-safe-parser',
  plugins: {
    'postcss-import': {root: file.dirname},
    'postcss-cssnext': {
      features: {
        autoprefixer: options.app.autoprefix,
      },
    },
    'cssnano': options.production ? {autoprefixer: false} : false,
  },
});
