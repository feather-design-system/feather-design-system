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
    >
      <template v-slot:panel>
        <ul class="panel">
          <li>Test</li>
          <li>Test</li>
        </ul>
      </template>
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
      title: "Preview PDF DOC",
      viewerTitle: "PDF Viewer - ${docname}",
    },
  }),
  components: {
    ...components,
    FeatherButton,
  },
};
</script>
