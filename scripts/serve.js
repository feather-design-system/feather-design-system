import * as serve from "./vite/serve.js";
import * as prepareDemos from "./demos.js";

(async () => {
  await prepareDemos.run();
  const server = await serve.run();
  await server.listen();
  server.printUrls();
})();
