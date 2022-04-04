import { DefineComponent } from "vue";
export const FeatherSelect: DefineComponent<
  typeof import("./components/FeatherSelect.vue").props,
  {},
  {},
  {},
  {},
  {},
  {},
  typeof import("./components/FeatherSelect.vue").emits
>;

export { ISelectItemType } from "./components/types";
