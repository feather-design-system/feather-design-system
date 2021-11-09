<template>
  <button
    aria-haspopup="menu"
    :aria-expanded="open ? 'true' : 'false'"
    :class="[open ? 'selected' : '', 'btn-menu']"
    @click="toggle"
  >
    <slot></slot>
    <FeatherRipple />
  </button>
</template>
<script>
import { FeatherRipple } from "@featherds/ripple";
export default {
  emits: ["click"],
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggle() {
      this.$emit("click");
    },
  },
  components: {
    FeatherRipple,
  },
};
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/utils";
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";

button.btn-menu {
  @include button();
  height: 100%;
  display: flex;
  align-items: center;
  background-color: var($secondary);
  color: var($primary-text-on-color);
  border: none;
  border-bottom: 1px solid transparent;
  border-radius: 0;
  box-shadow: none;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0 16px;
  position: relative;
  cursor: pointer;
  @include state-on-color($secondary);
  :deep(svg) {
    position: relative;
  }
}
</style>
