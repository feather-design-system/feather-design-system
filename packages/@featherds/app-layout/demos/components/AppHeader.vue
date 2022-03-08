<template>
  <FeatherAppBar
    :labels="labels"
    :content="content"
    :full-width="full"
    :scroll-hide="scrollHide"
  >
    <template v-slot:right>
      <FeatherAppBarLink
        :icon="support"
        title="Support"
        url="/#/AppLayout-DemoFullscreen"
      />
    </template>
  </FeatherAppBar>
</template>
<script lang="ts">
import * as components from "@featherds/app-bar";
import Support from "@featherds/icon/action/Help";
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    full: {
      type: Boolean,
      default: false,
    },
    scrollHide: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      labels: {
        skip: "Skip to main content",
      },
      content: "test",
      support: Support,
    };
  },
  components: {
    ...components,
  },
});
</script>
