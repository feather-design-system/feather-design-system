import { defineClientConfig } from "@vuepress/client";
import NotFound from "@featherds/vuepress-theme-featherds/lib/layouts/404.vue";
import FeatherPage from "@featherds/vuepress-theme-featherds/lib/layouts/FeatherPage.vue";
import Layout from "@featherds/vuepress-theme-featherds/lib/layouts/Layout.vue";
import HomeLayout from "./theme/layouts/HomeLayout.vue";
import {
  KEY,
  THEMES,
} from "@featherds/vuepress-theme-featherds/lib/components/themes";
export default defineClientConfig({
  layouts: {
    HomeLayout,
    NotFound,
    FeatherPage,
    Layout,
  },
});

(() => {
  const setTheme = () => {
    if (typeof window !== "undefined") {
      let theme = "";

      console.log("Setting theme");

      try {
        theme = JSON.parse(window.localStorage.getItem(KEY))._text || THEMES[0]._text;
        console.log("Theme is", theme);
      } catch (e) {
        console.error("Error setting theme", e);
        theme = THEMES[0]._text;
      }

      THEMES.map((x) => {
        document.body.classList.remove(x._text);
      });

      document.body.classList.add(`${theme}`);
    }
  };

  setTheme();
})();
