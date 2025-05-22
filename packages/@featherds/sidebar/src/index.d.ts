import { DefineComponent } from "vue";
import { SidebarProps } from "./types";

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

// NOTE:  This may be the key to exporting types instead of individually exporting each type
export * from "./types";

// import { DefineComponent } from "vue";
// export const FeatherDock: DefineComponent<
//   typeof import("./components/FeatherDock.vue").props,
//   {},
//   {},
//   {},
//   {},
//   {},
//   {},
//   typeof import("./components/FeatherDock.vue").emits
// >;
