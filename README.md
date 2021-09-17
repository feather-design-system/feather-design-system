# feather design system

## Dev setup

### Initial

```js
npm install
npm run build
```

Be sure to run install then build command. This ensures that all packages are ready for consumption of sibiling packages. For example if you are going to work on `textarea` you will need the `input` package built.

### Dev

```js
npm run serve
```

## Docs

### Development

Our component documentation is auto generate based on the `docs` folder in each package. There is static documentation that exists in the root `docs` folder which is mainly used for UX patterns.

To run the docs locally:

```js
npm run docs:dev
```

To perform a static build of the docs run:

```js
npm run docs:build
```

## Packages

To generate a new package with a rough scaffold run:

```js
npm run new -- package
```

You will then recieve prompts for the package name and for the name of the first component to put in.
