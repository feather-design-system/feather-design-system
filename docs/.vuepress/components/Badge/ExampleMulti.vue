<template>
  <section>
    <div>
      <FeatherBadge :badges="badges">
        <FeatherIcon :icon="icon" class="icon"
      /></FeatherBadge>
    </div>
    <div>
      <FeatherBadge :badges="badges">Some Text</FeatherBadge>
    </div>
  </section>
</template>
<script>
import { FeatherBadge, TYPES } from "@featherds/badge";
import { FeatherIcon } from "@featherds/icon";
import Drug from "@featherds/icon/medical/Drug";
import { markRaw } from "vue";

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
      icon: markRaw(Drug),
    };
  },
  components: {
    FeatherBadge,
    FeatherIcon,
  },
};
</script>
<style lang="scss" scoped>
.icon {
  font-size: 24px;
}
</style>
