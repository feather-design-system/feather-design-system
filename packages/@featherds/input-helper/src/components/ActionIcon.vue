<template>
  <a :title="title" class="action-icon hide-when-disabled" href="#">
    <FeatherIcon :icon="icon" />
  </a>
</template>
<script lang="ts">
import { FeatherIcon } from "@featherds/icon";
import { defineComponent, PropType } from "vue";
export const props = {
  title: {
    type: String,
    default: "",
  },
  icon: {
    type: Object as PropType<unknown>,
    required: true,
  },
};
export default defineComponent({
  props,
  components: {
    FeatherIcon,
  },
});
</script>
<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
.action-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(vars.$secondary-text-on-surface);
  &:visited,
  &:active {
    color: var(vars.$secondary-text-on-surface);
  }
  font-size: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  &:hover {
    color: var(vars.$primary-text-on-surface);
  }
}
</style>
