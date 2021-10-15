<template>
  <section>
    <FeatherBadge :badges="badges" inline>Some Text</FeatherBadge>
  </section>
</template>
<script>
import { FeatherBadge, TYPES } from "@featherds/badge";

export default {
  data() {
    return {
      badges: [
        {
          type: TYPES.INFO,
          title: "Warning",
        },
        {
          type: TYPES.ERROR,
          title: "Error",
        },
      ],
    };
  },
  components: {
    FeatherBadge,
  },
};
</script>
