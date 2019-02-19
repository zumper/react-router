# @zumper/react-router

This is a fork of [react-router](https://github.com/ReactTraining/react-router/). The only material difference is the addition of a `compile` function that allows for regex patterns when matching routes.

---

<h3 align="center">
  React Router
</h3>

<p align="center">
  Declarative routing for <a href="https://facebook.github.io/react">React</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/react-router"><img src="https://img.shields.io/npm/v/react-router.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/react-router"><img src="https://img.shields.io/npm/dm/react-router.svg?style=flat-square"></a>
  <a href="https://travis-ci.org/ReactTraining/react-router"><img src="https://img.shields.io/travis/ReactTraining/react-router/master.svg?style=flat-square"></a>
</p>

## Docs

**[View the docs here](https://reacttraining.com/react-router)**

[Migrating from 2.x/3.x?](/packages/react-router/docs/guides/migrating.md)

[3.x docs](https://github.com/ReactTraining/react-router/blob/v3/docs)

[2.x docs](https://github.com/ReactTraining/react-router/blob/v2.8.1/docs)

## Packages

This repository is a monorepo that we manage using [Lerna](https://github.com/lerna/lerna). That means that we actually publish [several packages](/packages) to npm from the same codebase, including:

| Package                                                | Version                                                                                                                             | Docs                                                                                                                                                                                                                                                                          | Description                                                                        |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [`react-router`](/packages/react-router)               | [![npm](https://img.shields.io/npm/v/react-router.svg?style=flat-square)](https://www.npmjs.com/package/react-router)               | [![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat-square)](https://reacttraining.com/react-router/core/guides/quick-start) [![](https://img.shields.io/badge/API%20Docs-markdown-lightgrey.svg?style=flat-square)](/packages/react-router/docs)          | The core of React Router                                                           |
| [`react-router-dom`](/packages/react-router-dom)       | [![npm](https://img.shields.io/npm/v/react-router-dom.svg?style=flat-square)](https://www.npmjs.com/package/react-router-dom)       | [![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat-square)](https://reacttraining.com/react-router/web/guides/quick-start) [![](https://img.shields.io/badge/API%20Docs-markdown-lightgrey.svg?style=flat-square)](/packages/react-router-dom/docs)       | DOM bindings for React Router                                                      |
| [`react-router-native`](/packages/react-router-native) | [![npm](https://img.shields.io/npm/v/react-router-native.svg?style=flat-square)](https://www.npmjs.com/package/react-router-native) | [![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat-square)](https://reacttraining.com/react-router/native/guides/quick-start) [![](https://img.shields.io/badge/API%20Docs-markdown-lightgrey.svg?style=flat-square)](/packages/react-router-native/docs) | [React Native](https://facebook.github.io/react-native/) bindings for React Router |
| [`react-router-config`](/packages/react-router-config) | [![npm](https://img.shields.io/npm/v/react-router-config.svg?style=flat-square)](https://www.npmjs.com/package/react-router-config) | [![](https://img.shields.io/badge/API%20Docs-readme-orange.svg?style=flat-square)](/packages/react-router-config/#readme)                                                                                                                                                     | Static route config helpers                                                        |

> **Redux users:** The [`react-router-redux` package](https://github.com/ReactTraining/react-router/tree/5345a820818c8d43ac923558670538a479ac2234/packages/react-router-redux) is now deprecated. See [Redux Integration](https://reacttraining.com/react-router/web/guides/redux-integration) for a better approach.

## About

`react-router` is developed and maintained by [React Training](https://reacttraining.com) and many [amazing contributors](https://github.com/ReactTraining/react-router/graphs/contributors). If you're interested in learning more about what React can do for your company, please [get in touch](mailto:hello@reacttraining.com)!
