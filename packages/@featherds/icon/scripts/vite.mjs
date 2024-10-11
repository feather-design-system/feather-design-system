import { join, basename } from "path";
import { build } from "vite";
import fsExtraPkg from "fs-extra";
const { move } = fsExtraPkg;

export const vite = (folder, file) => {
  const config = {
    logLevel: "silent",
    publicDir: false,
    configFile: join(process.cwd(), "./vite.config.mjs"),
    resolve: {
      extensions: [".vue"],
    },
    build: {
      emptyOutDir: false,
      outDir: folder,
      minify: false,
      lib: {
        entry: file,
        name: basename(file, ".vue"),
        fileName: basename(file, ".vue"),
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

export const run = (folder, files) => {
  return files.reduce(
    (p, f) =>
      p.then(() =>
        vite(folder, f)
          .catch(console.log)
          .then(
            () =>
              console.log("finished", join(folder, basename(f, ".vue") + "."))
            // move(
            //   join(folder, basename(f, ".vue") + ".mjs"),
            //   join(folder, basename(f, ".vue") + ".js"),
            //   { overwrite: true }
            // )
          )
      ),
    Promise.resolve()
  );
  // return Promise.all(files.map((f) => vite(folder, f).catch(console.error)));
};

// export default {
//   run,
// };
