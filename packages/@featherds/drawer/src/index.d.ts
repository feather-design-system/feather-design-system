declare module "@featherds/drawer" {
  import { DefineComponent } from "vue";
  const FeatherDrawer: DefineComponent<
    typeof import("./components/FeatherDrawer.vue").props,
    {},
    {},
    {},
    {},
    {},
    {},
    typeof import("./components/FeatherDrawer.vue").emits
  >;
  const DrawerTab: DefineComponent<
    typeof import("./components/DrawerTab/DrawerTab.vue").props
  >;
  const DrawerTabContainer: DefineComponent<
    typeof import("./components/DrawerTabContainer/DrawerTabContainer.vue").props,
    {},
    {},
    {},
    {},
    {},
    {},
    typeof import("./components/DrawerTabContainer/DrawerTabContainer.vue").emits
  >;
  const DrawerTabContent: DefineComponent<
    typeof import("./components/DrawerTabContent/DrawerTabContent.vue").props
  >;
  const DrawerTabSeparator: DefineComponent;
  export {
    FeatherDrawer,
    DrawerTab,
    DrawerTabContainer,
    DrawerTabContent,
    DrawerTabSeparator,
  };
}
