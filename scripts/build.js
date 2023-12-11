import * as build from "./vite/build.js";
import globby from "globby";
import path from "path";
import fs from "fs-extra";
import { getFilter } from "./utils.js";

(async () => {

  const filter = getFilter();
  const files = await globby(`packages/@featherds/${filter}/src/index.[jt]s`, {
    cwd: process.cwd(),
  });
  return files
    .reduce(
      (promise, entry) =>
        promise.then(async () => {
          const dest = path.resolve(entry, "../../dist/");
          console.log(`running for ${dest}`);

          await build.run({ entry, dest });

          //add new file for single import
          const newFileName = "app.mjs";
          const cssPath = "./style.css";
          const mjsPath = "./index.mjs";
          const cssExists = fs.existsSync(path.join(dest, cssPath));
          const mjsExists = fs.existsSync(path.join(dest, mjsPath));
          return fs.writeFile(
            path.join(dest, newFileName),
            `${cssExists ? `import "${cssPath}";` : ""}
export * from ${mjsExists ? `"${mjsPath}";` : `"./index.js"`};
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
