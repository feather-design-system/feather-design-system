<src>
  ./CheckboxGroup.vue
  ./CheckboxGroupVertical.vue
  ./Checkbox.vue
  ./Indeterminate.vue
  ./Inline.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import CheckboxGroup from "./CheckboxGroup.vue";
import CheckboxGroupVertical from "./CheckboxGroupVertical.vue";
import Checkbox from "./Checkbox.vue";
import Indeterminate from "./Indeterminate.vue";
import Inline from "./Inline.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Checkbox",
        component: markRaw(Checkbox),
        source: instance.type.srcs["Checkbox"],
      },
      {
        _text: "Indeterminate",
        component: markRaw(Indeterminate),
        source: instance.type.srcs["Indeterminate"],
      },
      {
        _text: "Inline",
        component: markRaw(Inline),
        source: instance.type.srcs["Inline"],
      },
      {
        _text: "Group",
        component: markRaw(CheckboxGroup),
        source: instance.type.srcs["CheckboxGroup"],
      },
      {
        _text: "Group Vertical",
        component: markRaw(CheckboxGroupVertical),
        source: instance.type.srcs["CheckboxGroupVertical"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
