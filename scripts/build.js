const build = require("./vite/build");
const globby = require("globby");
const path = require("path");
const fs = require("fs-extra");
const { getFilter } = require("./utils");
(async () => {
  const filter = getFilter();
  const files = await globby(`packages/@featherds/${filter}/src/index.[jt]s`, {
    cwd: process.cwd(),
  });
  const postFiles = await globby(
    `packages/@featherds/${filter}/build/post.js`,
    {
      cwd: process.cwd(),
    }
  );
  return files
    .reduce(
      (promise, entry) =>
        promise.then(async () => {
          const dest = path.resolve(entry, "../../dist/");
          console.log(`running for ${dest}`);

          await build.run({ entry, dest });

          //add new file for single import
          const newFileName = "app.js";
          const cssPath = "./style.css";
          const cssExists = fs.existsSync(path.join(dest, cssPath));
          return fs.writeFile(
            path.join(dest, newFileName),
            `${cssExists ? `import "${cssPath}";` : ""}
export * from  "./app.es.js";
    `
          );
        }),
      Promise.resolve()
    )
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
})();
