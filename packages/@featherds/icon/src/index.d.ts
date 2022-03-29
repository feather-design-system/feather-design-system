declare module "@featherds/icon" {
  import { DefineComponent } from "vue";
  const FeatherIcon: DefineComponent<typeof import("./components/FeatherIcon.vue").props>;
  export { FeatherIcon };
}
