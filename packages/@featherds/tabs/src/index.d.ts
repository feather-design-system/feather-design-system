declare module "@featherds/tabs" {
  import { defineComponent } from "vue";
  const FeatherTab: ReturnType<typeof defineComponent>;
  const FeatherTabPanel: ReturnType<typeof defineComponent>;
  const FeatherTabContainer: ReturnType<typeof defineComponent>;
  export { FeatherTab, FeatherTabPanel, FeatherTabContainer };
}
