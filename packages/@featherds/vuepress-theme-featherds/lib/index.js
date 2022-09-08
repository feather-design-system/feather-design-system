import { getDirname, path } from "@vuepress/utils";

const __dirname = getDirname(import.meta.url);
import { activeHeaderLinksPlugin } from "@vuepress/plugin-active-header-links";

import { containerPlugin } from "@vuepress/plugin-container";

import { themeDataPlugin } from "@vuepress/plugin-theme-data";

import { prismjsPlugin } from "@vuepress/plugin-prismjs";
import { sitemapPlugin } from "./plugins/sitemap.js";

const featherDSTheme = (data) => ({
  name: "vuepress-theme-featherds",
  clientConfigFile: path.resolve(__dirname, "./clientAppEnhance.js"),
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

export { featherDSTheme };
