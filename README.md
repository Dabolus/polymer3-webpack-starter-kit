<p align="center">
  <img src="https://dabolus.github.io/polymer3-webpack-starter-kit/p+w.svg">
</p>
<h1 align="center">Polymer 3 Starter Kit with Webpack</h1>

Want to use the latest Polymer 3 but you don't know how to get started?
Got you covered!

This starter kit was built from scratch to allow you to start using today
the features of tomorrow.

Features:
- Latest Polymer 3 preview
- Components split into component class, styles and templates. No more huge files with mixed content!
- TypeScript with TSLint preconfigured, so that you can write reliable, high quality code
- Using SCSS by default. Write less, do more!
- Lazy-loading using the brand new [JavaScript dynamic import syntax](https://developers.google.com/web/updates/2017/11/dynamic-import)
- Shared styles and custom iconset, just like the original [PSK](https://github.com/Polymer/polymer-starter-kit)
- Automatic service worker generation using [Workbox](https://github.com/GoogleChrome/workbox)
- [Webpack 4](https://webpack.js.org) to bundle 'em all!

### Preview
You can see an online preview of the project on my [Github Pages](https://dabolus.github.io/polymer3-webpack-starter-kit/).

_Note that GH Pages does not currently support routing all the requests to an index.html, so you won't be able to link
to a specific page of this online preview. However, you can still switch from one page to another
once you've loaded the index._

### Setup
- Install [Node.js](https://nodejs.org) (hopefully you already have it installed)
- Install [yarn](https://yarnpkg.com)
- Clone this repository
  ```bash
  git clone https://github.com/Dabolus/polymer3-webpack-starter-kit.git <your-app-name> && cd <your-app-name>
  ```
- Install the project dependencies
  ```bash
  yarn install
  ```
  _This will automatically install both the frontend and the build tools dependencies.
  Go on reading to understand the project structure and why it is organized in this way._
- Profit!

### Available scripts
```bash
yarn frontend [...args]
# Will execute any yarn command passed as arg on the frontend package
# e.g. yarn frontend add @polymer/paper-fab@next

yarn conf [...args]
# Will execute any yarn command passed as arg on the configuration package
# e.g. yarn conf add --dev htmllint htmllint-loader

yarn serve
# Starts webpack dev server with live reload on http://localhost:8080

yarn build
# Builds the production ready website in the build/ directory

yarn build:transpiled
# Same as the command above, but it also transpiles JS code to ES5

yarn install
# Installing the dependencies on the main package will automatically install
# The dependencies on both the frontend and the conf package
```

### Project Structure
So, if you already explored the project, you might have noticed something strange in it.
so let me answer that big question: **Why are there THREE package.json?**

Trust me, even if it might seem absurd, this is actually the best way to prevent you A LOT
of headaches. Basically, the whole thing works like this:

The choice of making three different packages is given by the fact that Polymer requires
its components to be installed as `flat` dependencies, while Webpack and most of the tools
around there want you to install them as normal dependencies. This causes a lot of
different problems:
1. If you choose to install Polymer components without the `flat` flag in your `package.json`,
   Polymer would be buggy, or it won't work at all
2. If you choose to install other dependencies with the `flat` flag in your `package.json`,
   you'd have to choose a resolution for each dependency of your dependency dependencies
   (great wordplay, right?). This will give you a lot of extra work, and each new library
   you add is not guaranteed to work with the resolutions you had to choose for the previously
   installed libraries
3. You might choose to use a `package.json` without the `flat` flag, and then install the
   Polymer components using the `--flat` CLI flag, but you'd have to remember to had that
   flag every time you install a new component
4. You might choose to use to different `package.json`, one to handle normal dependencies,
   and one to handle flat dependencies. This will avoid most of the problems, but you'd
   have to switch between the two directories every time you have to add a new dependency,
   and you are lazy, aren't you?

So, the solution I adopted is to you three different `package.json`, each one with its own
goal and logic.
- The `package.json` located in the root of the project represents your main package.
  You might probably want to add there your app name, version, description, etc.
  As you can see, it doesn't have any dependency installed. That's because it is only
  used to declare some tasks that will allow you to easily handle your project
- The `package.json` located in the `conf/` directory is the one used by Webpack
  and its plugins. It doesn't use a flat dependency tree
- The `package.json` located in the `src/` directory is the one used by your frontend.
  It uses a flat dependency tree, so it is the perfect place to install all your Polymer
  elements
Don't like it? Well, that's just a starter kit, so you can do whatever you want
with it, even completely change its structure :P

### Contributing
**PRs are welcome!**
You noticed a bug, a possible improvement or whatever?
Any help is always appreciated, so don't hesitate opening one!

Be sure to check out the [contributing guidelines](CONTRIBUTING.md) to fasten
up the merging process.
