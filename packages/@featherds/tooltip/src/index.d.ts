import { DefineComponent } from "vue";

export const FeatherTooltip: DefineComponent<
  typeof import("./components/FeatherTooltip.vue").props
>;

export { PointerAlignment, PopoverPlacement } from "@featherds/popover";
