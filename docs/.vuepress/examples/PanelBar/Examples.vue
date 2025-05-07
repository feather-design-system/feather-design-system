<src>
  ./Single.vue
  ./Multi.vue
  ./WithIcon.vue
  ./Settings.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Single from "./Single.vue";
import Multi from "./Multi.vue";
import WithIcon from "./WithIcon.vue";

import Settings from "./Settings.vue";

import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Single mode",
        component: markRaw(Single),
        source: instance.type.srcs["Single"],
      },
      {
        _text: "Multi mode",
        component: markRaw(Multi),
        source: instance.type.srcs["Multi"],
      },
      {
        _text: "With Icon",
        component: markRaw(WithIcon),
        source: instance.type.srcs["WithIcon"],
        supporting: [
          {
            filename: "Settings.vue",
            source: instance.type.srcs["Settings"],
            description: "'With Icon' supporting code.",
          }
        ]
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
