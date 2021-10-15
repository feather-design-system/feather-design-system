<template>
  <section>
    <FeatherBadge :badges="badge" inline>Some Text</FeatherBadge>
  </section>
</template>
<script>
import { FeatherBadge, TYPES } from "@featherds/badge";

export default {
  data() {
    return {
      badge: {
        type: TYPES.INFO,
        title: "Warning",
      },
    };
  },
  components: {
    FeatherBadge,
  },
};
</script>
