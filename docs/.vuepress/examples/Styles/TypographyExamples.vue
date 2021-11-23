<src>
  ./TypographyMixins.vue
  ./TypographyHeaderElements.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import TypographyMixins from "./TypographyMixins.vue";
import TypographyHeaderElements from "./TypographyHeaderElements.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Mixins",
        component: markRaw(TypographyMixins),
        source: instance.type.srcs["TypographyMixins"],
      },
      {
        _text: "Elements",
        component: markRaw(TypographyHeaderElements),
        source: instance.type.srcs["TypographyHeaderElements"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
