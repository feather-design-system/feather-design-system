import { Preview, setup } from "@storybook/vue3";

import { FeatherButton } from "@featherds/button";
import { FeatherChip } from "@featherds/chips";
import { FeatherIcon } from "@featherds/icon";

import "@featherds/styles";
// import "@featherds/styles/themes/open-dark.css";
import "@featherds/styles/themes/open-light.css";
import "@featherds/styles/dist/style.css";

export const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
};

export const decorators = [
  () => {
    document.querySelector("#storybook-root")?.classList.add("feather-styles");
    return {
      template: "<story/>",
      unmounted() {
        // document.querySelector("#storybook-root")?.classList.remove("feather-styles");
      },
    }
  },
  () => {
    document.body.classList.add("light");
    return {
      template: "<story/>",
      unmounted() {
        document.body.classList.remove("light");
      },
    };
  },
  // () => {
  //   document.body.classList.add("dark");
  //   return {
  //     template: "<story/>",
  //     unmounted() {
  //       document.body.classList.remove("dark");
  //     },
  //   }
  // }
];

setup(async (app) => {
  app.component("FeatherButton", FeatherButton);
  app.component("FeatherChip", FeatherChip);
  app.component("FeatherIcon", FeatherIcon);
});
