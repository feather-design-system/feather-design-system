<src>
  ./Intro.vue
  ./SidebarDemo.vue
  ./SidebarRight.vue
  ./SidebarWithFeatherMenuList.vue
  ./SidebarWithCustomComponent.vue
  ./MyCustomComponent.vue
  ./SidenavDemo.vue
  ./menus.ts
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Intro from "./Intro.vue";
import SidebarDemo from "./SidebarDemo.vue";
import SidebarRight from "./SidebarRight.vue";
import SidebarWithFeatherMenuList from "./SidebarWithFeatherMenuList.vue";
import SidebarWithCustomComponent from "./SidebarWithCustomComponent.vue";
import MyCustomComponent from "./MyCustomComponent.vue";
import menus from "./menus.ts?raw";

import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();

    const demos = ref([
      {
        _text: "Intro",
        component: markRaw(Intro),
        // source: instance.type.srcs["Intro"],
      },
      {
        _text: "Sidebar Demo",
        component: markRaw(SidebarDemo),
        source: instance.type.srcs["SidebarDemo"],
      },
      {
        _text: "Sidebar Right",
        component: markRaw(SidebarRight),
        source: instance.type.srcs["SidebarRight"],
        supporting: [
          {
            filename: "menus.ts",
            source: instance.type.srcs["menus.ts"],
            description: "'With FeatherMenuList' supporting code.",
            language: "typescript",
            ext: "ts",
          },
        ],
      },
      {
        _text: "Sidebar With FeatherMenuList",
        component: markRaw(SidebarWithFeatherMenuList),
        source: instance.type.srcs["SidebarWithFeatherMenuList"],
        supporting: [
          {
            filename: "menus.ts",
            source: instance.type.srcs["menus.ts"],
            description: "'With FeatherMenuList' supporting code.",
            language: "typescript",
            ext: "ts",
          },
        ],
      },
      {
        _text: "Sidebar With Custom Component",
        component: markRaw(SidebarWithCustomComponent),
        source: instance.type.srcs["SidebarWithCustomComponent"],
        supporting: [
          {
            filename: "MyCustomComponent.vue",
            source: instance.type.srcs["MyCustomComponent"],
            description: "'With CustomComponent' supporting code.",
          },
          {
            filename: "menus.ts",
            source: instance.type.srcs["menus.ts"],
            description: "'With FeatherMenuList' supporting code.",
            language: "typescript",
            ext: "ts",
          },
        ],
      },
    ]);
    return {
      demos,
    };
  },
};
</script>
