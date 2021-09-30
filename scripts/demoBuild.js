const build = require("./vite/demoBuild");
(async () => {
  const prepareDemos = require("./demos");
  await prepareDemos.run("/demos");
  await build.run();
})();
