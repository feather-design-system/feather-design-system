import { DefineComponent } from "vue";
export const FeatherDropdown: DefineComponent<
  typeof import("./components/FeatherDropdown.vue").props,
  {},
  {},
  {},
  {},
  {},
  {},
  typeof import("./components/FeatherDropdown.vue").emits
>;
export const FeatherDropdownItem: DefineComponent<
  typeof import("./mixins/DropdownItem").props,
  {},
  {},
  {},
  {},
  {},
  {},
  typeof import("./components/FeatherDropdownItem.vue").emits
>;
