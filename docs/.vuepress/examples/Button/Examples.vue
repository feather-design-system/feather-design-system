<src>
  ./Buttons.vue
  ./AsLinks.vue
  ./Disabled.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Buttons from "./Buttons.vue";
import AsLinks from "./AsLinks.vue";
import Disabled from "./Disabled.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Buttons",
        component: markRaw(Buttons),
        source: instance.type.srcs["Buttons"],
      },
      {
        _text: "Buttons: Links",
        component: markRaw(AsLinks),
        source: instance.type.srcs["AsLinks"],
      },
      {
        _text: "Buttons: Disabled",
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
