const build = require("./vite/demoBuild");
(async () => {
  const prepareDemos = require("./demos");
  await prepareDemos.run();
  await build.run();
})();
