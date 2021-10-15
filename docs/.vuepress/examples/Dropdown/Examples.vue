<src>
  ./Dropdown.vue
  ./Cover.vue
  ./Disabled.vue
  ./Icons.vue
  ./Right.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Dropdown from "./Dropdown.vue";
import Cover from "./Cover.vue";
import Disabled from "./Disabled.vue";
import Icons from "./Icons.vue";
import Right from "./Right.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Dropdown",
        component: markRaw(Dropdown),
        source: instance.type.srcs["Dropdown"],
      },
      {
        _text: "Cover",
        component: markRaw(Cover),
        source: instance.type.srcs["Cover"],
      },
      {
        _text: "Disabled",
        component: markRaw(Disabled),
        source: instance.type.srcs["Disabled"],
      },
      {
        _text: "Icons",
        component: markRaw(Icons),
        source: instance.type.srcs["Icons"],
      },
      {
        _text: "Right",
        component: markRaw(Right),
        source: instance.type.srcs["Right"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
