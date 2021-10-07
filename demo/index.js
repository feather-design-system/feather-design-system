import { createApp } from "vue";
import Layout from "./Layout.vue";
import Fullscreen from "./Fullscreen.vue";
import router from "./router";
import "./validate";

import App from "./App.vue";

import "@featherds/styles";
import "@featherds/styles/themes/open-light.scss";

createApp(App)
  .component("Layout", Layout)
  .component("Fullscreen", Fullscreen)
  .use(router)
  .mount("#app");
