declare module "@featherds/app-layout" {
  import { DefineComponent } from "vue";
  const FeatherAppLayout: DefineComponent<
    typeof import("./components/FeatherAppLayout.vue").props
  >;
  export { FeatherAppLayout };
}
