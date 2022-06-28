<src>
./Popover.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Popover from "./Popover.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Popover",
        component: markRaw(Popover),
        source: instance.type.srcs["Popover"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
