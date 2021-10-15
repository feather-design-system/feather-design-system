<src>
  ./Select.vue
  ./Pre.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Select from "./Select.vue";
import Pre from "./Pre.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Select",
        component: markRaw(Select),
        source: instance.type.srcs["Select"],
      },
      {
        _text: "Pre Icon",
        component: markRaw(Pre),
        source: instance.type.srcs["Pre"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
