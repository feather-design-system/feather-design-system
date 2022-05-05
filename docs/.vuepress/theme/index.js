const { path } = require("@vuepress/utils");
const { featherDSTheme } = require("@featherds/vuepress-theme-featherds");
const {
  registerComponentsPlugin,
} = require("@vuepress/plugin-register-components");

const { googleAnalyticsPlugin } = require("@vuepress/plugin-google-analytics");

const theme = (data) => ({
  extends: featherDSTheme(data),
  layouts: path.resolve(__dirname, "./layouts"),

  plugins: [
    googleAnalyticsPlugin({
      id: process.env.GA || "test",
    }),

    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "../global-components"),
    }),

    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "../examples"),
    }),
  ],
});
module.exports = { theme };
