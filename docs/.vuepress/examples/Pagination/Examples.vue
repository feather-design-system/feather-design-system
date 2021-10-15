<src>
  ./Pagination.vue
  ./Labels.vue
  ./PageSize.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Pagination from "./Pagination.vue";
import Labels from "./Labels.vue";
import PageSize from "./PageSize.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Pagination",
        component: markRaw(Pagination),
        source: instance.type.srcs["Pagination"],
      },
      {
        _text: "Labels",
        component: markRaw(Labels),
        source: instance.type.srcs["Labels"],
      },
      {
        _text: "Page Size",
        component: markRaw(PageSize),
        source: instance.type.srcs["PageSize"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
