<src>
  ./Chips.vue
  ./ChipsRadio.vue
  ./ChipsSingle.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Chips from "./Chips.vue";
import ChipsRadio from "./ChipsRadio.vue";
import ChipsSingle from "./ChipsSingle.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "List",
        component: markRaw(Chips),
        source: instance.type.srcs["Chips"],
      },
      {
        _text: "Radio",
        component: markRaw(ChipsRadio),
        source: instance.type.srcs["ChipsRadio"],
      },
      {
        _text: "Single",
        component: markRaw(ChipsSingle),
        source: instance.type.srcs["ChipsSingle"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
