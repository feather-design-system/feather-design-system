import { FeatherButton } from "@featherds/button";
import { defineClientAppEnhance } from "@vuepress/client";
export default defineClientAppEnhance(({ app }) => {
  app.component("FeatherButton", FeatherButton);
});
