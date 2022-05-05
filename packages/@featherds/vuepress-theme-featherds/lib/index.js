const { path } = require("@vuepress/utils");
const {
  activeHeaderLinksPlugin,
} = require("@vuepress/plugin-active-header-links");

const { containerPlugin } = require("@vuepress/plugin-container");

const { themeDataPlugin } = require("@vuepress/plugin-theme-data");

const { prismjsPlugin } = require("@vuepress/plugin-prismjs");
const { sitemapPlugin } = require("./plugins/sitemap");

const featherDSTheme = (data) => ({
  name: "vuepress-theme-featherds",
  clientAppEnhanceFiles: path.resolve(__dirname, "./clientAppEnhance.js"),
  layouts: path.resolve(__dirname, "./layouts"),
  plugins: [
    sitemapPlugin({ hostname: "http://feather.nanthealth.com" }),
    prismjsPlugin({
      preloadLanguages: ["vue", "js", "html"],
    }),

    activeHeaderLinksPlugin({ offset: 60 }),
    containerPlugin({
      type: "tip",
      defaultTitle: "TIP",
    }),
    containerPlugin({
      type: "warning",
      defaultTitle: "warning",
    }),
    themeDataPlugin({ themeData: data }),
  ],
});

module.exports = { featherDSTheme };
