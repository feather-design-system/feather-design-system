<src>
  ./Intro.vue
  ./Demo.vue
  ./Right.vue
  ./WithFeatherMenuList.vue
  ./WithCustomComponent.vue
  ./MyCustomComponent.vue
  ./menus.ts
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Intro from "./Intro.vue";
import Demo from "./Demo.vue";
import Right from "./Right.vue";
import WithFeatherMenuList from "./WithFeatherMenuList.vue";
import WithCustomComponent from "./WithCustomComponent.vue";
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
        _text: "Demo",
        component: markRaw(Demo),
        source: instance.type.srcs["Demo"],
      },
      {
        _text: "Right",
        component: markRaw(Right),
        source: instance.type.srcs["Right"],
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
        _text: "With FeatherMenuList",
        component: markRaw(WithFeatherMenuList),
        source: instance.type.srcs["WithFeatherMenuList"],
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
        _text: "With Custom Component",
        component: markRaw(WithCustomComponent),
        source: instance.type.srcs["WithCustomComponent"],
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
