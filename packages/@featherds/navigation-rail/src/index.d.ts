declare module "@featherds/navigation-rail" {
  import { defineComponent } from "vue";
  const FeatherNavigationRail: ReturnType<typeof defineComponent>;
  const FeatherRailGroup: ReturnType<typeof defineComponent>;
  const FeatherRailItem: ReturnType<typeof defineComponent>;
  export { FeatherNavigationRail, FeatherRailGroup, FeatherRailItem }
}
