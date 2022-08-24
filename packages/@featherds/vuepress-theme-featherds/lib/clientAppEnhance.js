import { FeatherButton } from "@featherds/button";
import { defineClientConfig } from "@vuepress/client";
export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("FeatherButton", FeatherButton);
  },
});
