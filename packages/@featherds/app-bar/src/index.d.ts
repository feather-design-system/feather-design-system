declare module "@featherds/app-bar" {
  import { DefineComponent } from "vue";
  const FeatherAppBar: DefineComponent<
    typeof import("./components/FeatherAppBar.vue").props
  >;
  const FeatherAppBarLink: DefineComponent<
    typeof import("./components/FeatherAppBarLink.vue").props
  >;
  export { FeatherAppBar, FeatherAppBarLink };
}
