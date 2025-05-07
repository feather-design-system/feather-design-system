import { DefineComponent } from "vue";
import { DockProps } from "./types";

export const FeatherDock: DefineComponent<
  DockProps,
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
