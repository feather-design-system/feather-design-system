<src>
  ./AppBar.vue
  ./Drawer.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import AppBar from "./AppBar.vue";
import Drawer from "./Drawer.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "AppBar",
        component: markRaw(AppBar),
        source: instance.type.srcs["AppBar"],
      },
      {
        _text: "with Drawer",
        component: markRaw(Drawer),
        source: instance.type.srcs["Drawer"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
