import { DefineComponent } from "vue";

export const FeatherFooter: DefineComponent<
  typeof import("./components/FeatherFooter.vue").props
>;
export const FeatherFooterLink: DefineComponent<
  typeof import("./components/FeatherFooterLink/FeatherFooterLink.vue").props
>;
export const FeatherFooterTelephone: DefineComponent<
  typeof import("./components/FeatherFooterTelephone/FeatherFooterTelephone.vue").props
>;
