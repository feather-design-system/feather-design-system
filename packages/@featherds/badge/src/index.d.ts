import { DefineComponent } from "vue";
export const FeatherBadge: DefineComponent<
  typeof import("./components/FeatherBadge.vue").props
>;
export const FeatherTextBadge: DefineComponent<
  typeof import("./components/FeatherTextBadge.vue").props
>;
export { BadgeTypes, IBadge } from "./types/Types";
