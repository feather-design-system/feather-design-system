import * as build from "./vite/demoBuild.js";
import * as prepareDemos from "./demos.js";

(async () => {
  await prepareDemos.run();
  await build.run();
})();
