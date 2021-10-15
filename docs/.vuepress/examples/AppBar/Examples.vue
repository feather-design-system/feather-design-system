<src>
  ./AppBar.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import AppBar from "./AppBar.vue";
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
    ]);

    return {
      demos,
    };
  },
};
</script>
