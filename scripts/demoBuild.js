const build = require("./vite/demoBuild");
(async () => {
  await require("./demos");
  await build.run();
})();
