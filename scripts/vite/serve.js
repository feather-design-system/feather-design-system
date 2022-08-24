import { createServer } from "vite";
import { sassImports, moduleImport, fileImport } from "./alias.js";
const run = async () =>
  createServer({
    // any valid user config options, plus `mode` and `configFile`
    configFile: "./vite.config.js",
    root: process.cwd(),
    resolve: {
      alias: [...sassImports, ...moduleImport, ...fileImport],
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    server: {
      port: 3000,
      host: true,
    },
  });

export { run };
