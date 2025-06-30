<src>
  ./Alert.vue
  ./Banner.vue
  ./DockedBottom.vue
  ./DockedTop.vue
  ./WithAction.vue
  ./WithClose.vue
  ./WithContent.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Alert from "./Alert.vue";
import Banner from "./Banner.vue";
import DockedTop from "./DockedTop.vue";
import DockedBottom from "./DockedBottom.vue";
import WithAction from "./WithAction.vue";
import WithClose from "./WithClose.vue";
import WithContent from "./WithContent.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Alert",
        component: markRaw(Alert),
        source: instance.type.srcs["Alert"],
      },
      {
        _text: "Banner",
        component: markRaw(Banner),
        source: instance.type.srcs["Banner"],
      },
      {
        _text: "Alert with actions",
        component: markRaw(WithAction),
        source: instance.type.srcs["WithAction"],
      },
      {
        _text: "Alert is closeable",
        component: markRaw(WithClose),
        source: instance.type.srcs["WithClose"],
      },
      {
        _text: "Alert with content",
        component: markRaw(WithContent),
        source: instance.type.srcs["WithContent"],
      },
      {
        _text: "Alert docked at top",
        component: markRaw(DockedTop),
        source: instance.type.srcs["DockedTop"],
      },
      {
        _text: "Alert docked at bottom",
        component: markRaw(DockedBottom),
        source: instance.type.srcs["DockedBottom"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
