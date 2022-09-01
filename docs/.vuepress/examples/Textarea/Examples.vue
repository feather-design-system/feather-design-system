<src>
  ./Textarea.vue
  ./Auto.vue
  ./Max.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Textarea from "./Textarea.vue";
import Auto from "./Auto.vue";
import Max from "./Max.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Textarea",
        component: markRaw(Textarea),
        source: instance.type.srcs["Textarea"],
      },
      {
        _text: "Auto Grow",
        component: markRaw(Auto),
        source: instance.type.srcs["Auto"],
      },
      {
        _text: "Max Length",
        component: markRaw(Max),
        source: instance.type.srcs["Max"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
