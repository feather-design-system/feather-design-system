import { DefineComponent } from "vue";
export const FeatherDialog: DefineComponent<
  typeof import("./components/FeatherDialog.vue").props,
  {},
  {},
  {},
  {},
  {},
  {},
  typeof import("./components/FeatherDialog.vue").emits
>;
export const FocusTrap: DefineComponent<
  typeof import("./components/FocusTrap.vue").props
>;
export const DialogClose: DefineComponent;
