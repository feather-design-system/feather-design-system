<src>
  ./Input.vue
  ./Error.vue
  ./Clear.vue
  ./Max.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Input from "./Input.vue";
import Error from "./Error.vue";
import Clear from "./Clear.vue";
import Max from "./Max.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Input",
        component: markRaw(Input),
        source: instance.type.srcs["Input"],
      },
      {
        _text: "Error",
        component: markRaw(Error),
        source: instance.type.srcs["Error"],
      },
      {
        _text: "Clear",
        component: markRaw(Clear),
        source: instance.type.srcs["Clear"],
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
