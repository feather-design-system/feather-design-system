const { path } = require("@vuepress/utils");

module.exports = (data) => ({
  name: "vuepress-theme-featherds",
  clientAppEnhanceFiles: path.resolve(__dirname, "./clientAppEnhance.js"),
  layouts: path.resolve(__dirname, "./layouts"),
  plugins: [
    [
      path.resolve(__dirname, "./plugins/sitemap"),
      {
        hostname: "http://feather.nanthealth.com",
      },
    ],
    [
      "@vuepress/prismjs",
      {
        preloadLanguages: ["vue", "js", "html"],
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
    ["@vuepress/theme-data", { themeData: data }],
  ],
});
