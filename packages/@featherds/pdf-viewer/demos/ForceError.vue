<template>
  <div>
    <div class="center container">
      <FeatherButton
        id="button"
        primary
        @click="visible = true"
        :aria-expanded="visible ? 'true' : 'false'"
        >Preview PDF</FeatherButton
      >
    </div>

    <FeatherPdfViewer
      v-model="visible"
      document-url="/test.pdf"
      document-extension="pdf"
      :labels="labels"
      force-error
    >
      <template v-slot:error> CUSTOM ERROR </template>
    </FeatherPdfViewer>
  </div>
</template>
<script lang="ts">
import * as components from "../src";
import { FeatherButton } from "@featherds/button";

import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    visible: false,
    labels: {
      title: "Preview PDF DOC",
      viewerTitle: "PDF Viewer - ${docname}",
    },
  }),
  components: {
    ...components,
    FeatherButton,
  },
});
</script>
