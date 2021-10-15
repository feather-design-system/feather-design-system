<src>
  ./Text.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Text from "./Text.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Text",
        component: markRaw(Text),
        source: instance.type.srcs["Text"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
