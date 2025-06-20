<src>
  ./SidenavDemo.vue
  ./menus.ts
</src>
  ./Intro.vue
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Intro from "./Intro.vue";
import SidenavDemo from "./SidenavDemo.vue";
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
        _text: "Sidenav Demo",
        component: markRaw(SidenavDemo),
        source: instance.type.srcs["SidenavDemo"],
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
    ]);
    return {
      demos,
    };
  },
};
</script>
