// .vuepress/config.js
const { path } = require("@vuepress/utils");
module.exports = {
  layouts: path.resolve(__dirname, "./layouts"),
  clientAppSetupFiles: path.resolve(__dirname, "./preloadTheme.js"),
  extendsMarkdown: (md) => {
    // use more markdown-it plugins!
    md.use(require("../plugins/demo.js"));
  },
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
        componentsDir: path.resolve(__dirname, "../components"),
      },
    ],
    [
      "@vuepress/register-components",
      {
        componentsDir: path.resolve(__dirname, "./components"),
      },
    ],
    // ["@vuepress/active-header-links"],
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
    [
      "@vuepress/docsearch",
      {
        apiKey: "3586ad692e4fd2ca21e8ad06f4181eaf",
        indexName: "feather_design",
        locales: {
          "/": {
            placeholder: "Search Feather ...  ",
          },
        },
      },
    ],
  ],
};
