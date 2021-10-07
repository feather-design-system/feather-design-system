<template>
  <div>
    <div class="center container">
      <FeatherButton
        id="button"
        primary
        @click="visible = true"
        :aria-expanded="visible ? 'true' : 'false'"
        >Preview DOCX no preview</FeatherButton
      >
    </div>

    <FeatherPdfViewer
      v-model="visible"
      document-url="/test.docx"
      document-extension="docx"
      :labels="labels"
    >
    </FeatherPdfViewer>
  </div>
</template>
<script>
import * as components from "../src";
import { FeatherButton } from "@featherds/button";

export default {
  data: () => ({
    visible: false,
    labels: {
      title: "My Test Document",
      viewerTitle: "PDF Viewer - ${docname}",
    },
  }),
  components: {
    ...components,
    FeatherButton,
  },
};
</script>
