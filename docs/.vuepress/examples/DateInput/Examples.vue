<src>
  ./DateInput.vue
  ./Disabled.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import DateInput from "./DateInput.vue";
import Disabled from "./Disabled.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Date Input",
        component: markRaw(DateInput),
        source: instance.type.srcs["DateInput"],
      },
      {
        _text: "Disabled Dates",
        component: markRaw(Disabled),
        source: instance.type.srcs["Disabled"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
