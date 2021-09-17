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
<script>
import TYPES from "../types/Types";
const BADGES = [TYPES.INFO, TYPES.ERROR];
import Badge from "./Badge";
export default {
  props: {
    badges: {
      type: [Array, Object],
      required: true,
    },
    inline: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    orderBadges() {
      const badges = Array.isArray(this.badges) ? this.badges : [this.badges];
      return badges
        .filter((x) => BADGES.indexOf(x.type.toLowerCase()) > -1)
        .sort((a, b) => {
          const aIndex = BADGES.indexOf(a.type.toLowerCase());
          const bIndex = BADGES.indexOf(b.type.toLowerCase());
          return aIndex - bIndex;
        });
    },
  },
  components: {
    Badge,
  },
};
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
      margin-left: 4px;
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
