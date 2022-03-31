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
      document-url="/testxx.pdf"
      document-extension="pdf"
      :labels="labels"
      @check-request="handleError"
    >
      <template v-slot:error v-if="is404"> 404 </template>
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
    is404: false,
    labels: {
      title: "Preview PDF DOC",
      viewerTitle: "PDF Viewer - ${docname}",
    },
  }),
  methods: {
    handleError(http: XMLHttpRequest) {
      if (http.status === 404) {
        this.is404 = true;
      }
    },
  },
  components: {
    ...components,
    FeatherButton,
  },
});
</script>
