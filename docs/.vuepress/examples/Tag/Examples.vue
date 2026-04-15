<src>
  ./Tag.vue
  ./Low.vue
  ./High.vue
  ./WithPopover.vue
  ./WithTooltip.vue
  ./MaxWidth.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Tag from "./Tag.vue";
import Low from "./Low.vue";
import High from "./High.vue";
import WithPopover from "./WithPopover.vue";
import WithTooltip from "./WithTooltip.vue";
import MaxWidth from "./MaxWidth.vue";
// import CardAnchor from "./CardAnchor.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Tag",
        component: markRaw(Tag),
        source: instance.type.srcs["Tag"],
      },
      {
        _text: "Low Emphasis",
        component: markRaw(Low),
        source: instance.type.srcs["Low"],
      },
      {
        _text: "High Emphasis",
        component: markRaw(High),
        source: instance.type.srcs["High"],
      },
      {
        _text: "With Popover",
        component: markRaw(WithPopover),
        source: instance.type.srcs["WithPopover"],
      },
      {
        _text: "With Tooltip",
        component: markRaw(WithTooltip),
        source: instance.type.srcs["WithTooltip"],
      },
      {
        _text: "Max width",
        component: markRaw(MaxWidth),
        source: instance.type.srcs["MaxWidth"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
