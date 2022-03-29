import { DefineComponent } from "vue";
export const FeatherList: DefineComponent;
export const FeatherListHeader: DefineComponent;
export const FeatherListSeparator: DefineComponent;

export const FeatherListItem: DefineComponent<
  typeof import("./components/FeatherListItem.vue").props
>;
export const FeatherListSwitch: DefineComponent<
  typeof import("./components/FeatherListSwitch.vue").props,
  {},
  {},
  {},
  {},
  {},
  {},
  typeof import("./components/FeatherListSwitch.vue").emits
>;
