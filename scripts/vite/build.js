const { build } = require("vite");
const path = require("path");
const { sassImports } = require("./alias");
const run = async ({ entry, dest }) => {
  const pkg = require(path.resolve(dest, "../package.json"));
  const deps = pkg.dependencies ? Object.keys(pkg.dependencies) : [];
  return build({
    configFile: path.join(process.cwd(), "./vite.config.js"),
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
        fileName: "app",
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

module.exports = { run };
