<src>
  ./IconButton.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import IconButton from "./IconButton.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "IconButton",
        component: markRaw(IconButton),
        source: instance.type.srcs["IconButton"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
