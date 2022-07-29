<src>
  ./CircularDeterminate.vue
  ./CircularIndeterminate.vue
  ./LinearDeterminate.vue
  ./LinearIndeterminate.vue
  ./Spinner.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import CircularDeterminate from "./CircularDeterminate.vue";
import CircularIndeterminate from "./CircularIndeterminate.vue";
import LinearDeterminate from "./LinearDeterminate.vue";
import LinearIndeterminate from "./LinearIndeterminate.vue";
import Spinner from "./Spinner.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Circular Determinate",
        component: markRaw(CircularDeterminate),
        source: instance.type.srcs["CircularDeterminate"],
      },
      {
        _text: "Circular Indeterminate",
        component: markRaw(CircularIndeterminate),
        source: instance.type.srcs["CircularIndeterminate"],
      },
      {
        _text: "Linear Determinate",
        component: markRaw(LinearDeterminate),
        source: instance.type.srcs["LinearDeterminate"],
      },
      {
        _text: "Linear Indeterminate",
        component: markRaw(LinearIndeterminate),
        source: instance.type.srcs["LinearIndeterminate"],
      },
      {
        _text: "Spinner",
        component: markRaw(Spinner),
        source: instance.type.srcs["Spinner"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
