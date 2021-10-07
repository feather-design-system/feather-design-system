const { build } = require("vite");
const path = require("path");
const { sassImports, moduleImport, fileImport } = require("./alias");
const run = async () =>
  build({
    configFile: "./vite.config.js",
    root: process.cwd(),
    base: "/demos/",
    resolve: {
      alias: [...sassImports, ...moduleImport, ...fileImport],
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    build: {
      outDir: path.resolve(`${process.cwd()}/demo-dist/`),
      minify: false,
      lib: {
        entry: path.resolve(`${process.cwd()}/index.html`),
        formats: ["es"],
        fileName: "app",
      },
    },
  });

module.exports = { run };
