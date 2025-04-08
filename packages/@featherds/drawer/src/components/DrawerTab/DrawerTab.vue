<template>
  <li role="presentation">
    <a
      v-bind="attrs"
      class="tab hover focus"
      href="#"
      :class="{ disabled: disabled, selected: selected }"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
    >
      <span class="tab-icon-ripple-container">
        <slot></slot>
        <FeatherRipple />
      </span>
      <transition name="slide-right">
        <span aria-hidden="true" class="tab-label" v-show="showLabel"
          ><span class="content">{{ label }}</span></span
        >
      </transition>
    </a>
  </li>
</template>
<script lang="ts">
import { useTab, stockProps } from "@featherds/composables/tabs/Tab";
import { FeatherRipple } from "@featherds/ripple";
import {
  _setTimeout,
  TimeoutResult,
  _clearTimeout,
} from "@featherds/utils/setTimeout";
import { defineComponent } from "vue";
export const props = {
  label: {
    type: String,
    required: true,
  },
  ...stockProps,
} as const;
export default defineComponent({
  name: "DrawerTab",
  props,
  data() {
    return {
      showLabel: false,
      showLabelTimeout: 0 as unknown as TimeoutResult,
    };
  },
  watch: {
    selected(nv) {
      if (nv) {
        this.mouseLeave();
      }
    },
  },
  methods: {
    mouseEnter() {
      //if there isnt a timeout and we aren't selected and we aren't currently showing the label
      //then yeah set a second time out to show it
      if (!this.showLabelTimeout && !this.selected && !this.showLabel) {
        this.showLabelTimeout = _setTimeout(() => {
          this.showLabel = true;
        }, 1000);
      }
    },
    mouseLeave() {
      _clearTimeout(this.showLabelTimeout);
      this.showLabelTimeout = 0;
      this.showLabel = false;
    },
  },
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
@use "@featherds/drawer/src/scss/variables" as drawer-vars;

li {
  position: relative;
}
li {
  @include utils.state-on-neutral();
  .tab-icon-ripple-container {
    width: drawer-vars.$tab-width;
    height: drawer-vars.$tab-width;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab {
    position: relative;
    @include typo.headline4();
    color: var(vars.$primary-text-on-color);
    width: drawer-vars.$tab-width;
    height: drawer-vars.$tab-width;
    line-height: drawer-vars.$tab-width;
    display: block;
    text-align: center;
    padding: 1px;
    &[aria-selected="true"] {
      box-shadow: inset -2px 0 0 0 var(vars.$secondary-text-on-color);
    }
    &:focus {
      padding: 0px;
      border: var(vars.$state-color-on-color) solid 1px;
    }
    &:visited {
      color: var(vars.$primary-text-on-color);
      &[aria-selected="true"] {
        color: var(vars.$primary-text-on-color);
      }
    }
  }
}

span.tab-label {
  color: var(vars.$primary-text-on-color);
  //to achieve background color properly, we need to put surface first for a background,
  //then shade-1 to match the bar, then the hover effect on top
  background-image: linear-gradient(
      to right,
      utils.alpha(
        vars.$state-color-on-neutral,
        var(vars.$state-opacity-hover-on-surface)
      ),
      utils.alpha(
        vars.$state-color-on-neutral,
        var(vars.$state-opacity-hover-on-surface)
      )
    ),
    linear-gradient(to right, var(vars.$shade-1), var(vars.$shade-1)),
    linear-gradient(to right, var(vars.$surface), var(vars.$surface));
  height: drawer-vars.$tab-width;
  line-height: drawer-vars.$tab-width;
  font-size: var(vars.$base-font-size);
  position: absolute;
  top: 0;
  left: drawer-vars.$tab-width;
  white-space: nowrap;
  z-index: 1;
  border-radius: 0 4px 4px 0px;

  & > span.content {
    padding: 0 1rem;
    display: inline-block;
    height: drawer-vars.$tab-width;
    line-height: drawer-vars.$tab-width;
  }
}

.slide-right-enter-active {
  transition: transform 250ms;
  transform-origin: 0 0;
  overflow: hidden;
  .content {
    transform-origin: 0 0;
    transition: transform 250ms;
  }
}
.slide-right-enter {
  transform: scaleX(0);
  .content {
    transform: scaleX(2);
  }
}
.slide-right-enter-to {
  transform: scaleX(1);
  .content {
    transform: scaleX(1);
  }
}
</style>
