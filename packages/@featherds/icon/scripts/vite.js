const path = require("path");
const fs = require("fs-extra");
const { build } = require("vite");

const vite = (folder, file) => {
  const config = {
    logLevel: "silent",
    publicDir: false,
    configFile: path.join(process.cwd(), "./vite.config.js"),
    resolve: {
      extensions: [".vue"],
    },
    build: {
      emptyOutDir: false,
      outDir: folder,
      minify: false,
      lib: {
        entry: file,
        name: path.basename(file, ".vue"),
        fileName: path.basename(file, ".vue"),
        formats: ["es"],
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ["vue"],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: "Vue",
          },
        },
      },
    },
  };
  return build(config);
};

const run = (folder, files) => {
  return files.reduce(
    (p, f) =>
      p.then(() =>
        vite(folder, f)
          .catch(console.log)
          .then(() =>
            fs.move(
              path.join(folder, path.basename(f, ".vue") + ".mjs"),
              path.join(folder, path.basename(f, ".vue") + ".js"),
              { overwrite: true }
            )
          )
      ),
    Promise.resolve()
  );
  // return Promise.all(files.map((f) => vite(folder, f).catch(console.error)));
};

module.exports = {
  run,
};
