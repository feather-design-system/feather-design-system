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
<script>
import { useTab, stockProps } from "@featherds/composables/tabs/Tab";
import { FeatherRipple } from "@featherds/ripple";

export default {
  props: {
    ...stockProps,
  },
  setup(props) {
    return useTab(props);
  },
  components: {
    FeatherRipple,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/themes/utils";
$height: 3rem;
li .tab {
  @include button();
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
  color: var($secondary-text-on-surface);

  @include state-on-surface();

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
      box-shadow: inset 0 0 0 2px var($primary);
    }
    &.selected {
      background: surface-gradient($state-opacity-selected-on-surface),
        linear-grad($background);
    }
  }
  &:hover:focus .focus.hover,
  &:hover:focus.focus.hover {
    background: surface-gradient($state-opacity-hover-on-surface),
      linear-grad($background);
    &.selected {
      background: surface-gradient($state-opacity-selected-on-surface),
        surface-gradient($state-opacity-hover-on-surface),
        linear-grad($background);
    }
  }

  &:visited {
    color: var($primary-text-on-surface);
  }
  &.selected {
    color: var($primary);
  }
  &[aria-disabled="true"] {
    cursor: default;
    color: var($shade-2);
    border-color: transparent;
    box-shadow: none;
    @include state-disabled();
    &:focus,
    &:hover,
    &:active,
    &:visited {
      cursor: default;
      color: var($shade-2);
      background-color: transparent;
      border-color: transparent;
      box-shadow: none;
    }
  }
}
</style>
