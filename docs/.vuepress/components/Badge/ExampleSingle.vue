<template>
  <section>
    <div>
      <FeatherBadge :badges="badge">
        <FeatherIcon :icon="icon" class="icon"
      /></FeatherBadge>
    </div>
    <div>
      <FeatherBadge :badges="badge">Some Text</FeatherBadge>
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
      badge: {
        type: TYPES.INFO,
        title: "Warning",
      },
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
