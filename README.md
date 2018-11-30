> _**Note:** following Polymer 3, **this project is now in maintenance mode**. This means that
> **it won't receive new features**, I will just keep updating its deps to keep it fresh.
> To write vanilla progressive web applications with web components, use the
> [PWA Webpack Starter Kit](https://github.com/Dabolus/pwa-webpack-starter-kit) instead._

<h1 align="center">Polymer 3 Starter Kit with Webpack</h1>
<p align="center">
  <a href="https://travis-ci.org/Dabolus/polymer3-webpack-starter-kit"><img src="https://travis-ci.org/Dabolus/polymer3-webpack-starter-kit.svg?branch=master" alt="Build Status"></a>
  <a href="https://david-dm.org/Dabolus/polymer3-webpack-starter-kit"><img src="https://david-dm.org/Dabolus/polymer3-webpack-starter-kit/status.svg" alt="Dependencies Status"></a>
  <a href="https://david-dm.org/Dabolus/polymer3-webpack-starter-kit?type=dev"><img src="https://david-dm.org/Dabolus/polymer3-webpack-starter-kit/dev-status.svg" alt="Dev Dependencies Status"></a>
  <a href="https://codeclimate.com/github/Dabolus/polymer3-webpack-starter-kit/maintainability"><img src="https://api.codeclimate.com/v1/badges/e7c87e529be2722569ae/maintainability" alt="Maintainability"></a>
  <a href="https://greenkeeper.io/"><img src="https://badges.greenkeeper.io/Dabolus/polymer3-webpack-starter-kit.svg" alt="Greenkeeper"></a>
</p>

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
- A static and a dynamic subroute example, currently missing from the original Starter Kit.
  This one has been added because it is not always so obvious how to use the router for a subroute
- Shared styles and custom iconset, just like the original [PSK](https://github.com/Polymer/polymer-starter-kit)
- Automatic service worker generation using [Workbox](https://github.com/GoogleChrome/workbox)
- [Webpack 4](https://webpack.js.org) to bundle 'em all!
- Basic [Firebase](https://firebase.google.com/) configuration to allow easy deployment out of the box

### Preview
You can see an online preview of the project on my [Github Pages](https://dabolus.github.io/polymer3-webpack-starter-kit/).

_Note that GH Pages does not currently support routing all the requests to an index.html, so you won't be able to link
to a specific page of this online preview. However, you can still switch from one page to another
once you've loaded the index._

### Setup
- Install [Node.js](https://nodejs.org). Because of the syntax used in the configuration files,
  at least `v8.3` is required. If you want to feel safe, the latest LTS will work well.
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
- _Optional:_ if you wish to deploy your PWA on Firebase, remember that you also need to
  install `firebase-tools`
  ```bash
  yarn global add firebase-tools
  ```
- Profit!

### Available scripts
```bash
yarn serve
# Starts webpack dev server with live reload on http://localhost:8080

yarn build
# Builds the production ready website in the build/ directory
# By default, the base path of the built project will be '/'
# If you wish to change this behavior, you can set the basePath
# variable to whatever you want the base path to be inside conf/app.config.js
# REMEMBER TO ADD THE LEADING AND TRAILING SLASHES

yarn deploy [...args]
# Alias of 'firebase deploy'. The args will be passed to firebase
# e.g. yarn deploy --only hosting
# Note that this command won't build the project before deploying it,
# so you will have to do it yourself.
# e.g. yarn build && yarn deploy
# By default, the files to deploy are the ones inside the build/ directory
# To change this behavior, change the "public" property in 'firebase.json'
```

### Project configuration
You can find a lot of useful configuration options inside the `conf/app.config.js` file.
If these options aren't enough for you, you can always edit webpack configuration and everything
else at you needs.

### Project Structure
---

<details>
  <summary><b>polymer3-webpack-starter-kit <code>(click to expand)</code></b></summary>
  <details>
    <summary><code>├── <b>conf</b></code></summary>
    <code>Contains the configuration-related files</code>
    <details>
      <summary><code>│   ├── <b>webpack</b></code></summary>
      <code>Files related to webpack configurations</code>
      <details>
        <summary><code>│   │   ├── <b>custom-loaders</b></code></summary>
        <code>Directory containing custom loaders for webpack</code>
        <details>
          <summary><code>│   │   │   ├── index.js</code></summary>
          <code>A file that automagically loads all the loaders that are added inside the 'custom-loaders' folder</code>
        </details>
        <details>
          <summary><code>│   │   │   └── minify-template.loader.js</code></summary>
          <code>A custom loader that minifies the HTML and CSS contained in template strings</code>
        </details>
      </details>
      <details>
        <summary><code>│   │   ├── base.config.js</code></summary>
        <code>The base webpack configuration, which other configurations extend</code>
      </details>
      <details>
        <summary><code>│   │   ├── dev-server.config.js</code></summary>
        <code>The development server configuration, aka the options passed to 'webpack-serve'</code>
      </details>
      <details>
        <summary><code>│   │   ├── dev.config.js</code></summary>
        <code>The development configuration for webpack, optimized for being fast and verbose</code>
      </details>
      <details>
        <summary><code>│   │   └── prod.config.js</code></summary>
        <code>The production configuration for webpack, optimized to output highly compressed chunks for production use</code>
      </details>
    </details>
    <details>
      <summary><code>│   ├── app.config.js</code></summary>
      <code>Contains some configuration variables used all around the project</code>
    </details>
    <details>
      <summary><code>│   ├── postcss.config.js</code></summary>
      <code>PostCSS configuration file</code>
    </details>
    <details>
      <summary><code>│   └── typify-env.js</code></summary>
      <code>An helper used to typify the environment variables (it detects whether an environment variable is a boolean, a number or a string)</code>
    </details>
  </details>
  <details>
    <summary><code>├── <b>src</b></code></summary>
    <code>Contains the app source files</code>
    <details>
      <summary><code>│   ├── <b>components</b></code></summary>
      <code>Contains our custom Web Components</code>
      <details>
        <summary><code>│   │   ├── <b>icons</b></code></summary>
        <code>A custom element used to define our own custom iconset</code>
        <details>
          <summary><code>│   │   │   ├── defs.html</code></summary>
          <code>The HTML file containing the icons SVG definitions</code>
        </details>
        <details>
          <summary><code>│   │   │   └── index.ts</code></summary>
          <code>The TypeScript class that declares the custom element and imports the icons definitions</code>
        </details>
      </details>
      <details>
        <summary><code>│   │   ├── <b>shared-styles</b></code></summary>
        <code>A custom element used to define the styles shared between our other elements</code>
        <details>
          <summary><code>│   │   │   ├── defs.scss</code></summary>
          <code>The SCSS file containing the shared styles definitions</code>
        </details>
        <details>
          <summary><code>│   │   │   └── index.ts</code></summary>
          <code>The TypeScript class that declares the custom element and imports the shared styles</code>
        </details>
      </details>
      <details>
        <summary><code>│   │   ├── <b>shell</b></code></summary>
        <code>Our app shell. It is the most important custom element in our app, as it will load all the other custom elements on demand. Check out the PRPL pattern for more info</code>
        <details>
          <summary><code>│   │   │   ├── shell.component.ts</code></summary>
          <code>The TypeScript class that declares the shell custom element and imports the element styles and template</code>
        </details>
        <details>
          <summary><code>│   │   │   ├── shell.style.scss</code></summary>
          <code>The styles for the shell component</code>
        </details>
        <details>
          <summary><code>│   │   │   └── shell.template.html</code></summary>
          <code>The template for the shell component</code>
        </details>
      </details>
      <details>
        <summary><code>│   │   ├── <b>view1</b></code></summary>
        <code>The view1 component, the most simple view in our app</code>
        <details>
          <summary><code>│   │   │   ├── view1.component.ts</code></summary>
          <code>The TypeScript class that declares the view1 custom element and imports the element styles and template</code>
        </details>
        <details>
          <summary><code>│   │   │   ├── view1.style.scss</code></summary>
          <code>The styles for the view1 component</code>
        </details>
        <details>
          <summary><code>│   │   │   └── view1.template.html</code></summary>
          <code>The template for the view1 component</code>
        </details>
      </details>
      <details>
        <summary><code>│   │   ├── <b>view2</b></code></summary>
        <code>The view2 component, that contains three lazy-loaded subviews</code>
        <details>
          <summary><code>│   │   │   ├── <b>subview1</b></code></summary>
          <code>view2 - static subview1</code>
          <details>
            <summary><code>│   │   │   │   ├── subview1.component.ts</code></summary>
          	<code>The TypeScript class that declares the subview1 custom element and imports the element styles and template</code>
          </details>
          <details>
            <summary><code>│   │   │   │   ├── subview1.style.scss</code></summary>
          	<code>The styles for the subview1 component</code>
          </details>
          <details>
            <summary><code>│   │   │   │   └── subview1.template.html</code></summary>
          	<code>The template for the subview1 component</code>
          </details>
        </details>
        <details>
          <summary><code>│   │   │   ├── <b>subview2</b></code></summary>
          <code>view2 - static subview2</code>
          <details>
            <summary><code>│   │   │   │   ├── subview2.component.ts</code></summary>
          	<code>The TypeScript class that declares the subview2 custom element and imports the element styles and template</code>
          </details>
          <details>
            <summary><code>│   │   │   │   ├── subview2.style.scss</code></summary>
          	<code>The styles for the subview2 component</code>
          </details>
          <details>
            <summary><code>│   │   │   │   └── subview2.template.html</code></summary>
          	<code>The template for the subview2 component</code>
          </details>
        </details>
        <details>
          <summary><code>│   │   │   ├── <b>subview3</b></code></summary>
          <code>view2 - static subview3</code>
          <details>
            <summary><code>│   │   │   │   ├── subview3.component.ts</code></summary>
          	<code>The TypeScript class that declares the subview3 custom element and imports the element styles and template</code>
          </details>
          <details>
            <summary><code>│   │   │   │   ├── subview3.style.scss</code></summary>
          	<code>The styles for the subview3 component</code>
          </details>
          <details>
            <summary><code>│   │   │   │   └── subview3.template.html</code></summary>
          	<code>The template for the subview3 component</code>
          </details>
        </details>
        <details>
          <summary><code>│   │   │   ├── view2.component.ts</code></summary>
          <code>The TypeScript class that declares the view2 custom element and imports the element styles and template</code>
        </details>
        <details>
          <summary><code>│   │   │   ├── view2.style.scss</code></summary>
          <code>The styles for the view2 component</code>
        </details>
        <details>
          <summary><code>│   │   │   └── view2.template.html</code></summary>
          <code>The template for the view2 component</code>
        </details>
      </details>
      <details>
        <summary><code>│   │   ├── <b>view3</b></code></summary>
        <code>The view3 component, that contains a lazy-loaded dynamic subview</code>
        <details>
          <summary><code>│   │   │   ├── <b>dynamic-subview</b></code></summary>
          <code>view3 - dynamic subview</code>
          <details>
            <summary><code>│   │   │   │   ├── dynamic-subview.component.ts</code></summary>
          	<code>The TypeScript class that declares the dynamic-subview custom element and imports the element styles and template</code>
          </details>
          <details>
            <summary><code>│   │   │   │   ├── dynamic-subview.style.scss</code></summary>
          	<code>The styles for the dynamic-subview component</code>
          </details>
          <details>
            <summary><code>│   │   │   │   └── dynamic-subview.template.html</code></summary>
          	<code>The template for the dynamic-subview component</code>
          </details>
        </details>
        <details>
          <summary><code>│   │   │   ├── view3.component.ts</code></summary>
          <code>The TypeScript class that declares the view3 custom element and imports the element styles and template</code>
        </details>
        <details>
          <summary><code>│   │   │   ├── view3.style.scss</code></summary>
          <code>The styles for the view3 component</code>
        </details>
        <details>
          <summary><code>│   │   │   └── view3.template.html</code></summary>
          <code>The template for the view3 component</code>
        </details>
      </details>
      <details>
        <summary><code>│   │   ├── <b>view404</b></code></summary>
        <code>The view404 component, that is loaded when the user tries to access to a non existent route</code>
        <details>
          <summary><code>│   │   │   ├── view404.component.ts</code></summary>
          <code>The TypeScript class that declares the view404 custom element and imports the element styles and template</code>
        </details>
        <details>
          <summary><code>│   │   │   ├── view404.style.scss</code></summary>
          <code>The styles for the view404 component</code>
        </details>
        <details>
          <summary><code>│   │   │   └── view404.template.html</code></summary>
          <code>The template for the view404 component</code>
        </details>
      </details>
      <details>
        <summary><code>│   │   └── index.ts</code></summary>
        <code>A file that loads and registers the static custom elements (the ones that are not lazy loaded)</code>
      </details>
    </details>
    <details>
      <summary><code>│   ├── <b>static</b></code></summary>
      <code>A folder containing the static assets of the app, i.e. the ones that will be copied without being altered by the webpack loaders</code>
      <details>
        <summary><code>│   │   ├── <b>images</b></code></summary>
        <code>Static images folder</code>
        <details>
          <summary><code>│   │   │   ├── <b>manifest</b></code></summary>
          <code>Manifest icons</code>
          <details>
            <summary><code>│   │   │   │   ├── icon-144x144.png</code></summary>
            <code>Manifest icon - 144x144px</code>
          </details>
          <details>
            <summary><code>│   │   │   │   ├── icon-192x192.png</code></summary>
            <code>Manifest icon - 192x192px</code>
          </details>
          <details>
            <summary><code>│   │   │   │   ├── icon-48x48.png</code></summary>
            <code>Manifest icon - 48x48px</code>
          </details>
          <details>
            <summary><code>│   │   │   │   ├── icon-512x512.png</code></summary>
            <code>Manifest icon - 512x512px</code>
          </details>
          <details>
            <summary><code>│   │   │   │   ├── icon-72x72.png</code></summary>
            <code>Manifest icon - 72x72px</code>
          </details>
          <details>
            <summary><code>│   │   │   │   └── icon-96x96.png</code></summary>
            <code>Manifest icon - 96x96px</code>
          </details>
        </details>
        <details>
          <summary><code>│   │   │   └── favicon.ico</code></summary>
          <code>The app favicon</code>
        </details>
      </details>
      <details>
        <summary><code>│   │   ├── manifest.json</code></summary>
        <code>The app manifest</code>
      </details>
      <details>
        <summary><code>│   │   └── sw.js</code></summary>
        <code>A mock service worker, used as a placeholder during development to avoid caching</code>
      </details>
    </details>
    <details>
      <summary><code>│   ├── bootstrap.ts</code></summary>
      <code>The bootstrapper of our app. It is used to load all the external dependencies together with our custom elements into the app bundle</code>
    </details>
    <details>
      <summary><code>│   ├── index.hbs</code></summary>
      <code>The index of our app, as an Handlebars template. Having an HBS file allows us to build the HTML with some basic logic, like referencing some scripts only if some condition happens</code>
    </details>
    <details>
      <summary><code>│   ├── service-worker.js</code></summary>
      <code>Description</code>
    </details>
    <details>
      <summary><code>│   └── typings.d.ts</code></summary>
      <code>It contains the custom typings for our app, i.e. the ones that are not bundled with the library we install and are not installable via @types/library</code>
    </details>
  </details>
  <details>
    <summary><code>├── .gitignore</code></summary>
    <code>The project gitignore file</code>
  </details>
  <details>
    <summary><code>├── .travis.yml</code></summary>
    <code>Travis configuration file, which will automatically build and deploy the project on Firebase</code>
  </details>
  <details>
    <summary><code>├── CONTRIBUTING.md</code></summary>
    <code>A file that explains how to contribute to the project</code>
  </details>
  <details>
    <summary><code>├── firebase.json</code></summary>
    <code>Firebase configuration file</code>
  </details>
  <details>
    <summary><code>├── package.json</code></summary>
    <code>The project main package.json. It contains our app information (name, description, version, etc) and dependencies, as well as the scripts to test, build and deploy the app</code>
  </details>
  <details>
    <summary><code>├── README.md</code></summary>
    <code>The README of the project (this file that you are reading)</code>
  </details>
  <details>
    <summary><code>├── tsconfig.json</code></summary>
    <code>TypeScript configuration file</code>
  </details>
  <details>
    <summary><code>├── tslint.json</code></summary>
    <code>TSLint configuration file</code>
  </details>
  <details>
    <summary><code>└── yarn.lock</code></summary>
    <code>The project Yarn lockfile</code>
  </details>
</details>

---

### Contributing
**PRs are welcome!**
You noticed a bug, a possible improvement or whatever?
Any help is always appreciated, so don't hesitate opening one!

Be sure to check out the [contributing guidelines](CONTRIBUTING.md) to fasten
up the merging process.
