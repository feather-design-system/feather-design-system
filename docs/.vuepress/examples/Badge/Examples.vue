<src>
  ./Multi.vue
  ./MultiInline.vue
  ./Single.vue
  ./SingleInline.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Multi from "./Multi.vue";
import MultiInline from "./MultiInline.vue";

import Single from "./Single.vue";
import SingleInline from "./SingleInline.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Single",
        component: markRaw(Single),
        source: instance.type.srcs["Single"],
      },
      {
        _text: "Single Inline",
        component: markRaw(SingleInline),
        source: instance.type.srcs["SingleInline"],
      },
      {
        _text: "Multi",
        component: markRaw(Multi),
        source: instance.type.srcs["Multi"],
      },
      {
        _text: "Multi Inline",
        component: markRaw(MultiInline),
        source: instance.type.srcs["MultiInline"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
