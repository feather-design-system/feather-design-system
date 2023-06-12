<src>
  ./LabelsOnly.vue
  ./IconsOnly.vue
  ./Disabled.vue
  ./MutedColor.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import IconsOnly from "./IconsOnly.vue";
import LabelsOnly from "./LabelsOnly.vue";
import Disabled from "./Disabled.vue";
import MutedColor from "./MutedColor.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Labels Only",
        component: markRaw(LabelsOnly),
        source: instance.type.srcs["LabelsOnly"],
      },
      {
        _text: "Icons Only",
        component: markRaw(IconsOnly),
        source: instance.type.srcs["IconsOnly"],
      },
      {
        _text: "Disabled",
        component: markRaw(Disabled),
        source: instance.type.srcs["Disabled"],
      },
      {
        _text: "Muted Color",
        component: markRaw(MutedColor),
        source: instance.type.srcs["Muted"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
