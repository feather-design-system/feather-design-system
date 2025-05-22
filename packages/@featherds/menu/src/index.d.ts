import { DefineComponent, Directive } from "vue";
export const FeatherMenu: DefineComponent<
  typeof import("./components/FeatherMenu.vue").props
>;
export const FeatherMenuList: DefineComponent<
  typeof import("./components/FeatherMenuList.vue").props
>;
export const MenuFocusLoop: Directive;

import { MenuListEntry } from "./components/types";
export type { MenuListEntry };
