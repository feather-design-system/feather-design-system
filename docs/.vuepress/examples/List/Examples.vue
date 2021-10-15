<src>
  ./List.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import List from "./List.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "List",
        component: markRaw(List),
        source: instance.type.srcs["List"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
