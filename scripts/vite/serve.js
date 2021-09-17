const { createServer } = require("vite");
const { sassImports, moduleImport, fileImport } = require("./alias");
const run = async () =>
  createServer({
    // any valid user config options, plus `mode` and `configFile`
    configFile: "./vite.config.js",
    root: process.cwd(),
    resolve: {
      alias: [...sassImports, ...moduleImport, ...fileImport],
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
  });

module.exports = { run };
