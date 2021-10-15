<src>
  ./Multi.vue
  ./Single.vue
  ./MinChar.vue
  ./Grid.vue
  ./AllowNew.vue
  ./SelectionLimit.vue
  ./PreChip.vue
  ./Highlighting.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Multi from "./Multi.vue";
import Single from "./Single.vue";
import MinChar from "./MinChar.vue";
import Grid from "./Grid.vue";
import AllowNew from "./AllowNew.vue";
import SelectionLimit from "./SelectionLimit.vue";
import PreChip from "./PreChip.vue";
import Highlighting from "./Highlighting.vue";

import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Multi",
        component: markRaw(Multi),
        source: instance.type.srcs["Multi"],
      },
      {
        _text: "Single",
        component: markRaw(Single),
        source: instance.type.srcs["Single"],
      },
      {
        _text: "Min Character",
        component: markRaw(MinChar),
        source: instance.type.srcs["MinChar"],
      },
      {
        _text: "Grid",
        component: markRaw(Grid),
        source: instance.type.srcs["Grid"],
      },
      {
        _text: "Allow New",
        component: markRaw(AllowNew),
        source: instance.type.srcs["AllowNew"],
      },
      {
        _text: "Chip Icon",
        component: markRaw(PreChip),
        source: instance.type.srcs["PreChip"],
      },
      {
        _text: "Highlighting",
        component: markRaw(Highlighting),
        source: instance.type.srcs["Highlighting"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
