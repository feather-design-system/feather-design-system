<src>
  ./BackButton.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import BackButton from "./BackButton.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "BackButton",
        component: markRaw(BackButton),
        source: instance.type.srcs["BackButton"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
