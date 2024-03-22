<template>
  <span class="feather-text-badge" :class="type"><slot /></span>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { BadgeTypes } from "../types/Types";
export const props = {
  type: { type: String as PropType<keyof typeof BadgeTypes>, required: true },
} as const;
export default defineComponent({
  name: "FeatherTextBadge",
  props,
});
</script>
<style scoped lang="scss">
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/themes/utils";
@import "@featherds/styles/mixins/typography";
.feather-text-badge {
  height: 1.25rem;
  padding: 0.125rem 0.5rem;
  display: inline-flex;
  align-items: center;
  border-radius: 2px;
  @include caption;
  text-transform: uppercase;
  font-weight: var($font-bold);
  margin-left: 0.5rem;
  &.error {
    color: var($error);
    background-color: alpha($error, 0.12);
  }
  &.info {
    color: var($primary);
    background-color: alpha($primary, 0.12);
  }
}
</style>
