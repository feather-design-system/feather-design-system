<src>
  ./Icon.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Icon from "./Icon.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Icon",
        component: markRaw(Icon),
        source: instance.type.srcs["Icon"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
