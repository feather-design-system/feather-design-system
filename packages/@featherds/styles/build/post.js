const sass = require("sass");
const path = require("path");
const fs = require("fs-extra");

const importer = (url, prev, done) => {
  if (url[0] === "~") {
    url = path.resolve("node_modules", url.substr(1));
  }

  return done({ file: url });
};

const render = (input, output) =>
  sass.render(
    {
      file: input,
      importer,
      outFile: output,
    },
    function (err, result) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      fs.outputFileSync(output, result.css, { flag: "w" }, (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log("Successful");
      });
    }
  );

module.exports = () =>
  Promise.resolve(
    ["open-light", "open-dark"].map((file) => {
      render(
        path.resolve(__dirname, `../themes/${file}.scss`),
        path.resolve(__dirname, `../themes/${file}.css`)
      );
    })
  );
