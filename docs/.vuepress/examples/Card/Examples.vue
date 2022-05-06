<src>
  ./Card.vue
  ./CardAnchor.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Card from "./Card.vue";
import CardAnchor from "./CardAnchor.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Card",
        component: markRaw(Card),
        source: instance.type.srcs["Card"],
      },
      {
        _text: "As Anchor",
        component: markRaw(CardAnchor),
        source: instance.type.srcs["CardAnchor"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
