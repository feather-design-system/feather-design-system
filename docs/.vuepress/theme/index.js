const { path } = require("@vuepress/utils");
module.exports = {
  extends: "@featherds/vuepress-theme-featherds",
  layouts: path.resolve(__dirname, "./layouts"),
  plugins: [
    [
      "@vuepress/register-components",
      {
        componentsDir: path.resolve(__dirname, "../global-components"),
      },
    ],
    [
      "@vuepress/register-components",
      {
        componentsDir: path.resolve(__dirname, "../examples"),
      },
    ],
  ],
};
