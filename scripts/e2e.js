const args = process.argv.slice(2);
import * as serve from "./vite/serve.js";
import execa from "execa";
import * as demos from "./demos.js";

(async () => {
  await demos.run();
  const server = await serve.run();
  await server.listen();

  process.env.VUE_DEV_SERVER_URL = `http://localhost.lambdatest.com:${server.config.server.port}/demos/#`;

  const runner = execa('wdio', [ 'run', args], { stdio: 'inherit'});

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
