<src>
  ./Radio.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Radio from "./Radio.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Radio",
        component: markRaw(Radio),
        source: instance.type.srcs["Radio"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
