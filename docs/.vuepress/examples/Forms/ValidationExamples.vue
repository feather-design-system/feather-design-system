<src>
  ./YupSimple.vue
  ./YupAll.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import YupSimple from "./YupSimple.vue";
import YupAll from "./YupAll.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Validation Setup",
        component: markRaw(YupSimple),
        source: instance.type.srcs["YupSimple"],
      },
      {
        _text: "All Elements",
        component: markRaw(YupAll),
        source: instance.type.srcs["YupAll"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
