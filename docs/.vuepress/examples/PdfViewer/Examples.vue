<src>
  ./Doc.vue
  ./NoPreview.vue
  ./Panel.vue
  ./Pdf.vue
</src>
<template>
  <FeatherDemo :demos="demos" />
</template>
<script>
import Doc from "./Doc.vue";
import NoPreview from "./NoPreview.vue";
import Panel from "./Panel.vue";
import Pdf from "./Pdf.vue";
import { ref, getCurrentInstance, markRaw } from "vue";
export default {
  setup() {
    const showSource = ref(false);
    const instance = getCurrentInstance();
    const demos = ref([
      {
        _text: "DocX with Preview",
        component: markRaw(Doc),
        source: instance.type.srcs["Doc"],
      },
      {
        _text: "Docx no Preview",
        component: markRaw(NoPreview),
        source: instance.type.srcs["NoPreview"],
      },
      {
        _text: "With Panel",
        component: markRaw(Panel),
        source: instance.type.srcs["Panel"],
      },
      {
        _text: "PDF",
        component: markRaw(Pdf),
        source: instance.type.srcs["Pdf"],
      },
    ]);

    return {
      demos,
    };
  },
};
</script>
