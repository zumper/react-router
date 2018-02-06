# react-router-dom

DOM bindings for [React Router](https://reacttraining.com/react-router).

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save react-router-dom

Then with a module bundler like [webpack](https://webpack.github.io/), use as you would anything else:

```js
// using ES6 modules
import { BrowserRouter, Route, Link } from 'react-router-dom'

// using CommonJS modules
const BrowserRouter = require('react-router-dom').BrowserRouter
const Route = require('react-router-dom').Route
const Link = require('react-router-dom').Link
```

The UMD build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>
```

You can find the library on `window.ReactRouterDOM`.

## Bundling this module independently
You can zip up a build of this package to use it as a requirement of another project. You would do this instead of publishing a private fork of this package.

```bash
$ npm run zumper
```

In your `package.json` you need to reference the prepackaged version of this package.

```json
"react-router": "https://your-cdn-repo/your-path-to-forks/react-router-dom-v4.2.2.tgz"
```

## Issues

If you find a bug, please file an issue on [our issue tracker on GitHub](https://github.com/ReactTraining/react-router/issues).

## Credits

React Router is built and maintained by [React Training](https://reacttraining.com).
