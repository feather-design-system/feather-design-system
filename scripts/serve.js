const serve = require("./vite/serve");
(async () => {
  await require("./demos");
  const server = await serve.run();
  await server.listen();
})();
