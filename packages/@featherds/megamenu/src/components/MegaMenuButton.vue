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
<script lang="ts">
import { FeatherRipple } from "@featherds/ripple";
import { defineComponent } from "vue";
export default defineComponent({
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
});
</script>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/themes/utils" as utils;
@use "@featherds/styles/mixins/typography" as typo;

button.btn-menu {
  @include typo.button();
  height: 100%;
  display: flex;
  align-items: center;
  background-color: var(vars.$secondary);
  color: var(vars.$primary-text-on-color);
  border: none;
  border-bottom: 1px solid transparent;
  border-radius: 0;
  box-shadow: none;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0 1rem;
  position: relative;
  cursor: pointer;
  @include utils.state-on-color(vars.$secondary);
  :deep(svg) {
    position: relative;
  }
}
</style>
