<src>
  ./Table.vue
  ./RowClick.vue
  ./ButtonActions.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Table from "./Table.vue";
import RowClick from "./RowClick.vue";
import ButtonActions from "./ButtonActions.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "Table",
        component: markRaw(Table),
        source: instance.type.srcs["Table"],
      },
      {
        _text: "Row Click",
        component: markRaw(RowClick),
        source: instance.type.srcs["RowClick"],
      },
      {
        _text: "Button Actions",
        component: markRaw(ButtonActions),
        source: instance.type.srcs["ButtonActions"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
