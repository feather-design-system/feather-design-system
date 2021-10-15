<src>
  ./Panel.vue
  ./Loading.vue
  ./Disabled.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Panel from "./Panel.vue";
import Loading from "./Loading.vue";
import Disabled from "./Disabled.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Expansion Panel",
        component: markRaw(Panel),
        source: instance.type.srcs["Panel"],
      },
      {
        _text: "Loading",
        component: markRaw(Loading),
        source: instance.type.srcs["Loading"],
      },
      {
        _text: "Disabled",
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
