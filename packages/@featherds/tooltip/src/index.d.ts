import { DefineComponent } from "vue";
export const FeatherTooltip: DefineComponent<
  typeof import("./components/FeatherTooltip.vue").props
>;
export { TooltipAlignment, TooltipPlacement } from "./types";
