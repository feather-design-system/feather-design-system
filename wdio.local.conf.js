module.exports.config = {
  specs: ["./packages/@featherds/**/e2e/**/*.spec.js"],
  baseUrl: `${process.env.VUE_DEV_SERVER_URL}`,
  services: ["selenium-standalone"],
  exclude: [],
  sync: true,
  maxInstances: 1,
  logLevel: "error",
  bail: 0,
  waitforTimeout: 20000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  capabilities: [
    {
      maxInstances: 1,
      browserName: "chrome"
    }
  ],

  reporters: ["spec"],
  maxInstances: 1,
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 5 * 60 * 1000
  }
};
