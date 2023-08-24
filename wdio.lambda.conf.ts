import { config as baseConfig } from "./wdio.local.conf.js";

import { driver } from "@wdio/globals";

// TODO: Fix json import
import pkg from "./package.json" assert { type: "json" };

// const build = "@featherds - " + "0.0.1";
const build = `@featherds - ${pkg.version}`;
const capabilities = [
  {
    build: build,
    maxInstances: 1,
    platform: "Windows 10",
    browserName: "Chrome",
    browserVersion: "latest",
    chromeOptions: {
      args: ["incognito"],
    },
    tunnel: true,
    console: true,
  },
  {
    build: build,
    maxInstances: 1,
    platform: "Windows 10",
    browserName: "Firefox",
    version: "latest",
    tunnel: true,
  },
  {
    build: build,
    maxInstances: 1,
    platform: "MacOS Big sur",
    browserName: "Safari",
    version: "14.0",
    resolution: "1280x1024",
  },
  {
    build: build,
    maxInstances: 1,
    platform: "MacOS Monterey",
    browserName: "Safari",
    version: "15.0",
    resolution: "1280x1024",
  },
  {
    build: build,
    maxInstances: 1,
    platform: "Windows 10",
    browserName: "Edge",
    browserVersion: "latest",
    edgeOptions: { args: ["InPrivate"] },
    tunnel: true,
    console: true,
  },
];
export const config = Object.assign({}, baseConfig, {
  user: process.env.LAMBDA_USER,
  key: process.env.LAMBDA_KEY,

  autoCompileOpts: {
    autoCompile: true,
    // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
    // for all available options
    tsNodeOpts: {
      transpileOnly: true,
      project: "./tsconfig.wdio.json",
    },
  },
  services: [
    [
      "lambdatest",
      {
        tunnel: true,
      },
    ],
  ],
  capabilities,
  specs: [
    "./packages/@featherds/**/e2e/**/*.spec.js",
    "./packages/@featherds/**/wdio/**/*.spec.ts",
  ],
  baseUrl: `${process.env.VUE_DEV_SERVER_URL}`,
  reporters: ["spec"],
  maxInstances: 3,
  specFileRetries: 3,
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 5 * 60 * 1000,
  },
  beforeSession(_config, capabilities, specs) {
    capabilities.name = specs[0].split(/(\\|\/)/g).pop() || undefined;
  },
  after(result: number) {
    driver.execute(
      "lambda-status=".concat(result == 0 ? "passed" : "failed"),
      undefined
    );
  },
  path: "/wd/hub",
  hostname: "hub.lambdatest.com",
  port: 80,
});
