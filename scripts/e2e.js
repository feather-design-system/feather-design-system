const args = process.argv.slice(2);
const serve = require("./vite/serve");
(async () => {
  await require("./demos").run();
  const server = await serve.run();
  await server.listen();

  process.env.VUE_DEV_SERVER_URL = `http://localhost.lambdatest.com:${server.config.server.port}`;

  const execa = require("execa");
  const wdioBinPath = require.resolve("@wdio/cli/bin/wdio");

  const runner = execa(wdioBinPath, args, {
    stdio: "inherit",
  });
  const end = (e) => {
    if (server) {
      server.close();
    }
    process.exit(e);
  };
  runner.on("exit", end);
  runner.on("error", end);

  return runner;
})();
