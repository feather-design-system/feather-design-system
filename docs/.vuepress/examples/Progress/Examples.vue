<src>
  ./Spinner.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Spinner from "./Spinner.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Spinner",
        component: markRaw(Spinner),
        source: instance.type.srcs["Spinner"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
