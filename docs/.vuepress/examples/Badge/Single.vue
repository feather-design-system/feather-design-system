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
<script lang="ts">
import { FeatherBadge, BadgeTypes } from "@featherds/badge";
import { FeatherIcon } from "@featherds/icon";
import Drug from "@featherds/icon/medical/Drug";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      badge: {
        type: BadgeTypes.info,
        title: "Warning",
      },
      icon: Drug,
    };
  },
  components: {
    FeatherBadge,
    FeatherIcon,
  },
});
</script>
<style lang="scss" scoped>
.icon {
  font-size: 1.5rem;
}
</style>
