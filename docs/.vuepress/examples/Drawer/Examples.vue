<src>
  ./Drawer.vue
  ./DrawerTabs.vue
  ./DrawerComplete.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Drawer from "./Drawer.vue";
import DrawerTabs from "./DrawerTabs.vue";
import DrawerComplete from "./DrawerComplete.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Drawer",
        component: markRaw(Drawer),
        source: instance.type.srcs["Drawer"],
      },
      {
        _text: "With Tabs",
        component: markRaw(DrawerTabs),
        source: instance.type.srcs["DrawerTabs"],
      },
      {
        _text: "Complex",
        component: markRaw(DrawerComplete),
        source: instance.type.srcs["DrawerComplete"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
