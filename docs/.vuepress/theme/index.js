// .vuepress/config.js
const { path } = require("@vuepress/utils");
module.exports = {
  layouts: path.resolve(__dirname, "./layouts"),
  plugins: [
    [
      "@vuepress/prismjs",
      {
        preloadLanguages: ["vue", "js", "html"],
      },
    ],
    [
      "@vuepress/register-components",
      {
        componentsDir: path.resolve(__dirname, "./global-components"),
      },
    ],
    [
      "@vuepress/register-components",
      {
        componentsDir: path.resolve(__dirname, "../examples"),
      },
    ],
    ["@vuepress/active-header-links", { offset: 60 }],
    [
      "@vuepress/plugin-container",
      {
        type: "tip",
        defaultTitle: "TIP",
      },
    ],
    [
      "@vuepress/plugin-container",
      {
        type: "warning",
        defaultTitle: "warning",
      },
    ],
  ],
};
