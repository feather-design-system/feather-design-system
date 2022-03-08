<template>
  <section>
    <FeatherBadge :badges="badge" inline>Some Text</FeatherBadge>
  </section>
</template>
<script lang="ts">
import { FeatherBadge, BadgeTypes } from "@featherds/badge";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      badge: {
        type: BadgeTypes.info,
        title: "Warning",
      },
    };
  },
  components: {
    FeatherBadge,
  },
});
</script>
