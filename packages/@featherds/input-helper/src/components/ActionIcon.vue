<template>
  <a :title="title" class="action-icon hide-when-disabled" href="#">
    <FeatherIcon :icon="icon" />
  </a>
</template>
<script>
import { FeatherIcon } from "@featherds/icon";
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    icon: {
      type: Object,
      required: true,
    },
  },
  components: {
    FeatherIcon,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
.action-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var($secondary-text-on-surface);
  &:visited,
  &:active {
    color: var($secondary-text-on-surface);
  }
  font-size: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  &:hover {
    color: var($primary-text-on-surface);
  }
}
</style>
