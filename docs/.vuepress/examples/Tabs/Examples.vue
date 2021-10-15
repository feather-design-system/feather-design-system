<src>
  ./Tab.vue
  ./TabsOnly.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Tab from "./Tab.vue";
import TabsOnly from "./TabsOnly.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Tabs with Content",
        component: markRaw(Tab),
        source: instance.type.srcs["Tab"],
      },
      {
        _text: "Only Tabs",
        component: markRaw(TabsOnly),
        source: instance.type.srcs["TabsOnly"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
