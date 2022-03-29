const sass = require("sass");
const path = require("path");
const fs = require("fs-extra");

const importer = {
  findFileUrl(url) {
    if (!url.startsWith("~")) return null;
    return new URL(url.substring(1), pathToFileURL("node_modules"));
  },
};

const render = (input, output) => {
  sass
    .compileAsync(input, { importers: [importer] })
    .then((result) => {
      fs.outputFileSync(output, result.css, { flag: "w" }, (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      });
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

(() =>
  Promise.resolve(
    ["open-light", "open-dark"].map((file) => {
      render(
        path.resolve(__dirname, `../themes/${file}.scss`),
        path.resolve(__dirname, `../themes/${file}.css`)
      );
    })
  ))();
