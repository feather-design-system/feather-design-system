<src>
  ./MegaMenu.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import MegaMenu from "./MegaMenu.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "MegaMenu",
        component: markRaw(MegaMenu),
        source: instance.type.srcs["MegaMenu"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
