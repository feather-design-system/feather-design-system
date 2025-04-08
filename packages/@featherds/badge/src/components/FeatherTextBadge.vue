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
  props,
});
</script>
<style scoped lang="scss">
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/themes/utils" as utils;
@use "@featherds/styles/mixins/typography" as typo;
.feather-text-badge {
  height: 1.25rem;
  padding: 0.125rem 0.5rem;
  display: inline-flex;
  align-items: center;
  border-radius: 2px;
  @include typo.caption;
  text-transform: uppercase;
  font-weight: var(vars.$font-bold);
  margin-left: 0.5rem;
  &.error {
    color: var(vars.$error);
    background-color: utils.alpha(vars.$error, 0.12);
  }
  &.info {
    color: var(vars.$primary);
    background-color: utils.alpha(vars.$primary, 0.12);
  }
}
</style>
