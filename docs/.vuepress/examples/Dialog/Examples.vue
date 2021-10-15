<src>
  ./Dialog.vue
  ./Relative.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Dialog from "./Dialog.vue";
import Relative from "./Relative.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Dialog",
        component: markRaw(Dialog),
        source: instance.type.srcs["Dialog"],
      },
      {
        _text: "Relative Container",
        component: markRaw(Relative),
        source: instance.type.srcs["Relative"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
