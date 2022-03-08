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
<script lang="ts">
import { FeatherBadge, BadgeTypes } from "@featherds/badge";
import { FeatherIcon } from "@featherds/icon";
import Drug from "@featherds/icon/medical/Drug";
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
