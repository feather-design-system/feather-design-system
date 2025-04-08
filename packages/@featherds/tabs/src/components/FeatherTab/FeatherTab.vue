<template>
  <li role="presentation">
    <button
      v-bind="attrs"
      class="tab hover focus"
      :class="{ disabled: disabled, selected: selected }"
    >
      <span class="tab-text">
        <slot />
      </span>
      <FeatherRipple />
    </button>
  </li>
</template>
<script lang="ts">
import { useTab, stockProps } from "@featherds/composables/tabs/Tab";
import { FeatherRipple } from "@featherds/ripple";
import { defineComponent } from "vue";

export const props = stockProps;

export default defineComponent({
  props,
  setup(props) {
    return useTab(props);
  },
  components: {
    FeatherRipple,
  },
});
</script>
<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/mixins/typography" as typo;
@use "@featherds/styles/themes/utils" as utils;
$height: 3rem;
li .tab {
  @include typo.button();
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: none;
  display: inline-block;
  padding: 0 1rem;
  height: $height;
  display: inline-flex;
  align-items: center;
  &[aria-disabled="true"] {
    cursor: default;
  }

  background: transparent;
  color: var(vars.$secondary-text-on-surface);

  @include utils.state-on-surface();

  &:hover,
  &:focus,
  &:active,
  &:visited {
    text-decoration: none;
    outline: 0;
  }
  //following rules take out the focus states from the state-on-surface mixin
  &:focus.focus,
  &:focus .focus {
    &,
    &.selected {
      background: inherit;
      box-shadow: inset 0 0 0 2px var(vars.$primary);
    }
    &.selected {
      background: surface-gradient(vars.$state-opacity-selected-on-surface),
        linear-grad(vars.$background);
    }
  }
  &:hover:focus .focus.hover,
  &:hover:focus.focus.hover {
    background: surface-gradient(vars.$state-opacity-hover-on-surface),
      linear-grad(vars.$background);
    &.selected {
      background: surface-gradient(vars.$state-opacity-selected-on-surface),
        surface-gradient(vars.$state-opacity-hover-on-surface),
        linear-grad(vars.$background);
    }
  }

  &:visited {
    color: var(vars.$primary-text-on-surface);
  }
  &.selected {
    color: var(vars.$primary);
  }
  &[aria-disabled="true"] {
    cursor: default;
    color: var(vars.$shade-2);
    border-color: transparent;
    box-shadow: none;
    @include utils.state-disabled();
    &:focus,
    &:hover,
    &:active,
    &:visited {
      cursor: default;
      color: var(vars.$shade-2);
      background-color: transparent;
      border-color: transparent;
      box-shadow: none;
    }
  }
}
</style>
