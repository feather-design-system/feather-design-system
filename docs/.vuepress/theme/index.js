import { getDirname, path } from "@vuepress/utils";
import { featherDSTheme } from "@featherds/vuepress-theme-featherds";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";

const __dirname = getDirname(import.meta.url);

import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";

const theme = (data) => ({
  extends: featherDSTheme(data),
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
export { theme };
