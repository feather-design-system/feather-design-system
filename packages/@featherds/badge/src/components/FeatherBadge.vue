<template>
  <span class="badge-container" :class="{ inline: inline }">
    <slot />
    <div class="badges">
      <Badge
        v-for="item in orderBadges"
        :key="item.type"
        :type="item.type"
        :title="item.title"
        :siblings="orderBadges.length > 1"
      />
    </div>
  </span>
</template>
<script lang="ts">
import { BadgeTypes, IBadge } from "../types/Types";
const BADGES = [BadgeTypes.info, BadgeTypes.error];
import Badge from "./Badge.vue";
import { defineComponent, PropType } from "vue";
export const props = {
  badges: {
    type: [Array, Object] as PropType<IBadge[] | IBadge>,
    required: true,
  },
  inline: {
    type: Boolean,
    default: false,
  },
} as const;
export default defineComponent({
  props,
  computed: {
    orderBadges() {
      const badges = (
        Array.isArray(this.badges) ? this.badges : [this.badges]
      ) as IBadge[];
      return badges
        .filter((x) => BADGES.indexOf(x.type) > -1)
        .sort((a, b) => {
          const aIndex = BADGES.indexOf(a.type);
          const bIndex = BADGES.indexOf(b.type);
          return aIndex - bIndex;
        });
    },
  },
  components: {
    Badge,
  },
});
</script>

<style lang="scss" scoped>
.badge-container {
  display: inline-block;
  position: relative;
  &.inline {
    display: inline-flex;
    align-items: center;

    .badges {
      position: static;
      margin-left: 0.25rem;
    }
  }
  .badges {
    position: absolute;
    left: calc(100% - 5px);
    bottom: calc(100% - 5px);
    display: flex;
  }
}
</style>
