<template>
  <div class="badge" :class="[type, siblings ? 'siblings' : '']">
    <div class="badge-icon" :title="title"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { BadgeTypes } from "../types/Types";
export default defineComponent({
  props: {
    type: { type: String as PropType<keyof typeof BadgeTypes>, required: true },
    title: { type: String, required: true },
    siblings: { type: Boolean, default: false },
  },
});
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
.badge {
  width: 10px;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  &.info {
    .badge-icon {
      border-width: 5px;
      border-style: solid;
      border-color: var($primary);
      border-radius: 100%;
      height: 10px;
      width: 10px;
    }
    &.siblings {
      margin-right: -2px;
      .badge-icon {
        border-right-color: transparent;
      }
    }
  }
  &.error .badge-icon {
    background-color: var($error);
    transform: rotate(45deg);
    transform-origin: center center;
    width: 7px;
    height: 7px;
  }
}
</style>
