<src>
  ./Snackbar.vue
  ./SnackbarGroup.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Snackbar from "./Snackbar.vue";
import SnackbarGroup from "./SnackbarGroup.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Single Snackbar",
        component: markRaw(Snackbar),
        source: instance.type.srcs["Snackbar"],
      },
      {
        _text: "Snackbar Group",
        component: markRaw(SnackbarGroup),
        source: instance.type.srcs["SnackbarGroup"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
