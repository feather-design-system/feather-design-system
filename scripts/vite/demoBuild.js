import { build } from "vite";
import path from "path";
import { sassImports, moduleImport, fileImport } from "./alias.js";
const run = async () =>
  build({
    configFile: "./vite.config.mjs",
    root: process.cwd(),
    base: "/demos/",
    resolve: {
      alias: [...sassImports, ...moduleImport, ...fileImport],
      extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    define: {
      "process.env.NODE_ENV": "'production'",
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

export { run };
