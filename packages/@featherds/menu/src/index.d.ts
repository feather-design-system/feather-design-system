import { DefineComponent, Directive } from "vue";
export const FeatherMenu: DefineComponent<
  typeof import("./components/FeatherMenu.vue").props
>;
export const MenuFocusLoop: Directive;
