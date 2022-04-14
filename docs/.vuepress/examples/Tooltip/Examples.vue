<src>
./Tooltip.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Textarea from "./Tooltip.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Tooltip",
        component: markRaw(Textarea),
        source: instance.type.srcs["Tooltip"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
