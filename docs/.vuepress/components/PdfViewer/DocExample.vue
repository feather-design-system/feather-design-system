<template>
  <div>
    <div class="center container">
      <FeatherButton
        id="button"
        primary
        @click="visible = true"
        :aria-expanded="visible ? 'true' : 'false'"
        >Preview Document</FeatherButton
      >
    </div>

    <FeatherPdfViewer
      v-model="visible"
      :document-url="$withBase('/assets/docs/test.docx')"
      :preview-url="$withBase('/assets/docs/test.pdf')"
      document-extension="docx"
      :labels="labels"
    >
    </FeatherPdfViewer>
  </div>
</template>
<script>
import { FeatherPdfViewer } from "@featherds/pdf-viewer";
import { FeatherButton } from "@featherds/button";

export default {
  data: () => ({
    visible: false,
    labels: {
      title: "My Test Doc",
      viewerTitle: "PDF Viewer - ${docname}",
    },
  }),
  components: {
    FeatherPdfViewer,
    FeatherButton,
  },
};
</script>
