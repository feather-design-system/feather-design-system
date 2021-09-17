declare module "@featherds/app-bar" {
  import { defineComponent } from "vue";
  const FeatherAppBar: ReturnType<typeof defineComponent>;
  const FeatherAppBarLink: ReturnType<typeof defineComponent>;
  const FeatherAppBarButton: ReturnType<typeof defineComponent>;
  export { FeatherAppBar, FeatherAppBarLink, FeatherAppBarButton };
}
