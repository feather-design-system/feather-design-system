<src>
  ./Protected.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Protected from "./Protected.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Protected",
        component: markRaw(Protected),
        source: instance.type.srcs["Protected"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
