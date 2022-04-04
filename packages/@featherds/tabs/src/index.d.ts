import { DefineComponent } from "vue";
export const FeatherTabPanel: DefineComponent<
  typeof import("./components/FeatherTabPanel.vue").props
>;
export const FeatherTab: DefineComponent<
  typeof import("./components/FeatherTab/FeatherTab.vue").props
>;
export const FeatherTabContainer: DefineComponent<
  typeof import("./components/FeatherTabContainer/FeatherTabContainer.vue").props,
  {},
  {},
  {},
  {},
  {},
  {},
  typeof import("./components/FeatherTabContainer/FeatherTabContainer.vue").emits
>;
