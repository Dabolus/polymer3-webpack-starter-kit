const {readdirSync} = require('fs');
const {resolve} = require('path');

module.exports = (() =>
    readdirSync(__dirname)
      .filter(l => l !== 'index.js')
      .reduce((currLoaders, loader) => ({
        ...currLoaders,
        [loader.slice(0, -3).replace('.', '-')]: resolve(__dirname, loader),
      }), {})
)();
