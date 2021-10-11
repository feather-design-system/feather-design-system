const path = require("path");
const scope = "@featherds";
const folder = "@featherds";
const sassImports = [
  {
    find: new RegExp(`^${scope}/([a-z-/]+)/(.*)`),
    replacement: path.resolve(process.cwd(), `./packages/${folder}/$1/$2`),
  },
];
const moduleImport = [
  {
    find: new RegExp(`^${scope}/([a-z-]+)$`),
    replacement: path.resolve(
      process.cwd(),
      `./packages/${folder}/$1/src/index.js`
    ),
  },
];

const fileImport = [
  {
    //exclude composables, there mapping should be handled by the package.json exports feature.
    find: new RegExp(`^${scope}/(?!composables)([a-z-/]+)/(.*)`),
    replacement: path.resolve(process.cwd(), `./packages/${folder}/$1/$2`),
  },
];

module.exports = { sassImports, fileImport, moduleImport };
