<template>
  <section>
    <FeatherTextBadge :type="error.type">{{ error.title }}</FeatherTextBadge>
    <FeatherTextBadge :type="info.type">{{ info.title }}</FeatherTextBadge>
  </section>
</template>
<script lang="ts">
import { FeatherTextBadge, BadgeTypes } from "@featherds/badge";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    const error = {
      type: BadgeTypes.error,
      title: "errors (99+)",
    };
    const info = {
      type: BadgeTypes.info,
      title: "info (3)",
    };
    return {
      error,
      info,
    };
  },

  components: {
    FeatherTextBadge,
  },
});
</script>
