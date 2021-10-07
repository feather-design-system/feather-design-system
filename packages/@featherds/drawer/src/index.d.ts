declare module "@featherds/drawer" {
  import { defineComponent } from "vue";
  const FeatherDrawer: ReturnType<typeof defineComponent>;
  const DrawerTab: ReturnType<typeof defineComponent>;
  const DrawerTabContainer: ReturnType<typeof defineComponent>;
  const DrawerTabContent: ReturnType<typeof defineComponent>;
  const DrawerTabSeparator: ReturnType<typeof defineComponent>;
  export {
    FeatherDrawer,
    DrawerTab,
    DrawerTabContainer,
    DrawerTabContent,
    DrawerTabSeparator
  };
}
