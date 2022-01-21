<src>
  ./SpacingClasses.vue
  ./SpacingMixin.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import SpacingClasses from "./SpacingClasses.vue";
import SpacingMixin from "./SpacingMixin.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Spacing Classes",
        component: markRaw(SpacingClasses),
        source: instance.type.srcs["SpacingClasses"],
      },
      {
        _text: "Spacing Mixins",
        component: markRaw(SpacingMixin),
        source: instance.type.srcs["SpacingMixin"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
