import { Options } from "@wdio/types";

export const config: Options.Testrunner = {
  specs: [
    "./packages/@featherds/**/e2e/**/*.spec.js",
    "./packages/@featherds/**/wdio/**/*.spec.ts",
  ],
  baseUrl: `${process.env.VUE_DEV_SERVER_URL}`,
  runner: "local",
  services: [],
  exclude: [],

  maxInstances: 1,
  logLevel: "error",
  bail: 0,
  waitforTimeout: 20000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": { args: ["--incognito"] },
      // "goog:chromeOptions": { args: [ "--guest" ]}
    },
    // {
    //   browserName: "edge",
    //   "ms:edgeOptions": { args: [ "--InPrivate" ] }
    //   // "ms:edgeOptions": { args: [ "--guest" ] }
    // },
  ],
  autoCompileOpts: {
    autoCompile: true,
    // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
    // for all available options
    tsNodeOpts: {
      transpileOnly: true,
      project: "./tsconfig.wdio.json",
    },
  },

  reporters: ["spec"],
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 5 * 60 * 1000,
  },
};
