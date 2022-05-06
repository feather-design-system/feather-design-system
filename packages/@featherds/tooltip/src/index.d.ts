import { DefineComponent } from "vue";
export const FeatherTooltip: DefineComponent<
  typeof import("./components/FeatherTooltip.vue").props
>;
export { PointerAlignment, TooltipPlacement } from "./types";
