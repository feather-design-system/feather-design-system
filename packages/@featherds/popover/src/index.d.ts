import { DefineComponent } from "vue";
export const FeatherPopover: DefineComponent<
  typeof import("./components/FeatherPopover.vue").props
>;
export const FeatherTooltip: DefineComponent<
  typeof import("./components/FeatherTooltip.vue").props
>;
export { PointerAlignment, PopoverPlacement } from "./types";
export { calculateAlignment } from "./components/Alignment";
export { calculatePlacement } from "./components/Placement";
