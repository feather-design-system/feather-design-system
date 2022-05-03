<src>
  ./AppRail.vue
  ./AppRailWithHeader.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import AppRail from "./AppRail.vue";
import AppRailWithHeader from "./AppRailWithHeader.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "App Rail",
        component: markRaw(AppRail),
        source: instance.type.srcs["AppRail"],
      },
      {
        _text: "App Rail with Header",
        component: markRaw(AppRailWithHeader),
        source: instance.type.srcs["AppRailWithHeader"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
