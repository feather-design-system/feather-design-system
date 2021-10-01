# Welcome to Feather Design System

Thank you so much for being interested in contributing to Feather Design System. Please take a few moments to familiarize yourself with the following guidelines before contributing:

- [Code of Conduct](https://github.com/feather-design-system/feather-design-system/blob/dev/CODE_OF_CONDUCT.md)
- [CLA](#CLA)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)

## Pull Request Guidelines

- The `main` branch is a snapshot of the latest stable release. The `dev` branch is where all latest code changes live.
- Checkout topic branches from the relevant branch, typically this will be `dev`.
- Do not check in `dist` or built assets.
- Make sure `npm run test` passes.
- Make sure all commit and pull request messages adhere to our commitlint standard. [We follow the Angular commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular).
- All PRs should have an accompanying issue.
- Please add test cases for new features or bug fixes.
- Please add any required documentation changes.

## Development Setup

Before beginning please make sure you have the LTS version of `node` and `npm` installed.

After cloning the repo, run:

```bash
npm i
```

## Project Structure

This is not an exhaustive guide but should provide enough detail for you to get started developing in this project. This project has 3 main areas; docs, demos and the components or packages themselves.

### Docs

Documentation is created using [Vuepress](https://v2.vuepress.vuejs.org/) and all of the documentation code is contained in the `docs` folder at the root of the project. We have a custom theme developed to help showcase the Feather Design System. Please ensure that you have updated all necessary documentation and examples if you are contributing to this project.

### Demos

When developing we recommend utilizing demos heavily to help showcase any new functionality. The `demos` folder located at the root of the project contains the main scaffolding of the `demos` application that is run when `npm run dev` is executed. The `scripts/demos.js` dynamically constructs the necessary routes needed for the `demos` application. It looks inside our `packages/@featherds/*/demos/` folders for any components and creates a route for them. The main reason for keeping all the demos so close to the packages source is that you will likely be working on the two at the same time. Rather than you modifying a demo and then having to search for the package source, it will make development easier if they are closer together.

- `<root>/demos/` demo application scaffolding
- `<root>/scripts/demos.js` creates routes for demos located in the packages
- `<root>/packages/@featherds/*/demos/` package specific demos

### Packages

All of our packages are in the `packages/@featherds` folder located at the root of the project. Key folders to note in each package are:

- `<package>/src/` contains package source.
- `<package>/demos/` contains package demos.
- `<package>/e2e/` contains e2e tests where applicable.
- `<package>/scss/` contains `scss` that can be externally consumed.

Specifically for the `@featherds/styles` package

- `<package>/src/` contains an entry point to load `lib/feather.scss`
- `<package>/lib/` contains application level `scss`. Should _NOT_ be used externally.
- `<package>/mixins/` contains all necessary mixins.
- `<package>/fonts/` contains all fonts that are used by the themes.
- `<package>/themes/` contains all available themes.

## CLA

Before contributing please be sure to agree to our [CLA](https://cla-assistant.io/feather-design-system/feather-design-system)
