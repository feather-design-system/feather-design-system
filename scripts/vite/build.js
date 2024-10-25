import { build } from "vite";
import fs from "fs-extra";
import path from "path";
import { sassImports } from "./alias.js";
const run = async ({ entry, dest }) => {
  const pkg = await fs.readJSON(path.resolve(dest, "../package.json"));
  const deps = pkg.dependencies ? Object.keys(pkg.dependencies) : [];
  return build({
    configFile: path.join(process.cwd(), "./vite.config.mjs"),
    root: path.resolve(dest, "../"),
    resolve: {
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
      alias: [...sassImports],
    },
    build: {
      outDir: dest,
      minify: false,
      lib: {
        entry: path.relative(path.resolve(dest, "../"), entry),
        formats: ["es"],
        fileName: "index",
      },
      rollupOptions: {
        external(id) {
          return (
            deps.indexOf(id) >= 0 ||
            id.indexOf("node_modules") >= 0 ||
            !!id.match(/^@featherds\//)
          );
        },
      },
    },
  });
};

export { run };
