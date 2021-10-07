<template>
  <Chip
    role="row"
    :disabled="disabled"
    :condensed="condensed"
    :clickable="false"
  >
    <span role="gridcell" :aria-disabled="disabled">
      <PreIcon v-if="hasIcon"><slot name="icon" /></PreIcon>
      <Label><slot /></Label>
    </span>
  </Chip>
</template>
<script>
import Chip from "../base/Chip";
import Label from "../base/Label";
import PreIcon from "../base/PreIcon";

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    condensed: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    hasIcon() {
      const hasIcon =
        this.$slots.icon &&
        this.$slots
          .icon()
          .findIndex(
            (o) =>
              (o.children && o.children.length !== 0) ||
              typeof o.type === "object"
          ) !== -1;
      return hasIcon;
    },
  },
  components: {
    Chip,
    Label,
    PreIcon,
  },
};
</script>
<style lang="scss" scoped>
[role="gridcell"] {
  height: 100%;
  display: inline-flex;
  align-items: center;
}
</style>
