const serve = require("./vite/serve");
(async () => {
  const prepareDemos = require("./demos");
  await prepareDemos.run();
  const server = await serve.run();
  await server.listen();
})();
