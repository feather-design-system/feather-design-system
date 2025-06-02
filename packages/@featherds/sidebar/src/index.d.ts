import { DefineComponent } from "vue";
import { SidebarProps, SidenavProps } from "./types";

export const FeatherSidebar: DefineComponent<
  SidebarProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {
    "update:expanded": (expanded: boolean) => void;
  }
>;
export const FeatherSidenav: DefineComponent<
  SidenavProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {
    "update:expanded": (expanded: boolean) => void;
  }
>;

// NOTE:  This may be the key to exporting types instead of individually exporting each type
export * from "./types";
