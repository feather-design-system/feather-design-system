<template>
  <section>
    <FeatherBadge :badges="badges" inline>Some Text</FeatherBadge>
  </section>
</template>
<script lang="ts">
import { FeatherBadge, BadgeTypes } from "@featherds/badge";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      badges: [
        {
          type: BadgeTypes.info,
          title: "Warning",
        },
        {
          type: BadgeTypes.error,
          title: "Error",
        },
      ],
    };
  },
  components: {
    FeatherBadge,
  },
});
</script>
