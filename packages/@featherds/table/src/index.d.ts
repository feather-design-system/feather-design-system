import { DefineComponent, Directive } from "vue";
export const FeatherSortHeader: DefineComponent<
  typeof import("./components/FeatherSortHeader.vue").props,
  {},
  {},
  {},
  {},
  {},
  {},
  typeof import("./components/FeatherSortHeader.vue").emits
>;

export const RowAction: Directive;

export { SORT } from "./types/types";
