<src>
  ./Footer.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Footer from "./Footer.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Footer",
        component: markRaw(Footer),
        source: instance.type.srcs["Footer"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
