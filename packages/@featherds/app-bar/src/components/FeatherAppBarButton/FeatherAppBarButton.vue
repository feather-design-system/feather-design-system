<template>
  <button
    :aria-haspopup="popUp"
    :aria-expanded="compSelected ? 'true' : 'false'"
    :class="[compSelected ? 'selected' : '', icon ? 'icon' : '', 'btn-menu']"
    @click="toggle"
  >
    <slot></slot>
    <FeatherRipple />
  </button>
</template>
<script>
import { FeatherRipple } from "@featherds/ripple";
import { inject } from "vue";
export default {
  setup() {
    //register
    const open = inject("menu-open", undefined);
    const toggle = inject("menu-toggle", undefined);
    const popUp = open !== undefined ? "menu" : false;

    return {
      open,
      toggle,
      popUp,
    };
  },
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    compSelected() {
      return this.selected || this.open;
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
$paddingTop: 24px;

button.btn-menu {
  @include button();
  height: 100%;
  background-color: var($secondary);
  color: var($primary-text-on-color);
  border: none;
  border-bottom: 1px solid transparent;
  border-radius: 0;
  box-shadow: none;
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 12px;
  vertical-align: top;
  position: relative;
  cursor: pointer;
  @include state-on-color($secondary);
  :deep(svg) {
    position: relative;
  }
  &.icon {
    font-size: 20px;
    min-width: 0;
    padding-left: 0;
    padding-right: 0;
    margin: 0;
    max-width: 48px;
    width: 48px;
    padding-top: 14px;
    .svg-inline--fa.fa-w-16 {
      font-size: 20px;
      line-height: inherit;
    }
  }

  @media screen and (max-width: 1024px) {
    $paddingTop: 15px;
    padding-top: $paddingTop;
    &.icon {
      padding-top: 8px;
    }
  }
}
.hidden {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
</style>
