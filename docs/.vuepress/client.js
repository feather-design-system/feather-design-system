import { defineClientConfig } from "@vuepress/client";
import NotFound from "@featherds/vuepress-theme-featherds/lib/layouts/404.vue";
import FeatherPage from "@featherds/vuepress-theme-featherds/lib/layouts/FeatherPage.vue";
import Layout from "@featherds/vuepress-theme-featherds/lib/layouts/Layout.vue";
import HomeLayout from "./theme/layouts/HomeLayout.vue";
export default defineClientConfig({
  layouts: {
    HomeLayout,
    NotFound,
    FeatherPage,
    Layout,
  },
});
