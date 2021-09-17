const base = require("./wdio.local.conf").config;
const pkg = require("./package.json");

const build = "@featherds - " + pkg.version;
const capabilities = [
  {
    build: build,
    maxInstances: 1,
    platform: "Windows 10",
    browserName: "Chrome",
    version: "latest",
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
    platform: "MacOS Catalina",
    browserName: "Safari",
    version: "13.0",
    resolution: "1280x1024",
  },
  {
    build: build,
    maxInstances: 1,
    platform: "Windows 10",
    browserName: "MicrosoftEdge",
    version: "latest",
    tunnel: true,
  },
];
module.exports.config = Object.assign({}, base, {
  user: process.env.LAMBDA_USER,
  key: process.env.LAMBDA_KEY,
  services: [
    [
      "lambdatest",
      {
        tunnel: true,
      },
    ],
  ],
  capabilities,
  specs: ["./packages/@featherds/**/e2e/**/*.spec.js"],
  baseUrl: `${process.env.VUE_DEV_SERVER_URL}`,
  reporters: process.env.GITHUB_TOKEN ? ["junit"] : ["spec"],
  reporterOptions: {
    outputDir: "e2e/reports/",
  },
  maxInstances: 3,
  specFileRetries: 3,
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 5 * 60 * 1000,
  },
  beforeSession(config, capabilities, specs) {
    capabilities.name = specs[0].split(/(\\|\/)/g).pop() || undefined;
  },
  after(result) {
    driver.execute(
      "lambda-status=".concat(result == 0 ? "passed" : "failed"),
      undefined
    );
  },
  path: "/wd/hub",
  hostname: "hub.lambdatest.com",
  port: 80,
});
