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
      showLabelTimeout: 0,
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
        this.showLabelTimeout = setTimeout(() => {
          this.showLabel = true;
        }, 1000);
      }
    },
    mouseLeave() {
      clearTimeout(this.showLabelTimeout);
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
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/themes/utils";
@import "@featherds/drawer/src/scss/variables";

li {
  position: relative;
}
li {
  @include state-on-neutral();
  .tab-icon-ripple-container {
    width: $tab-width;
    height: $tab-width;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab {
    position: relative;
    @include headline4();
    color: var($primary-text-on-color);
    width: $tab-width;
    height: $tab-width;
    line-height: $tab-width;
    display: block;
    text-align: center;
    padding: 1px;
    &[aria-selected="true"] {
      box-shadow: inset -2px 0 0 0 var($secondary-text-on-color);
    }
    &:focus {
      padding: 0px;
      border: var($state-color-on-color) solid 1px;
    }
    &:visited {
      color: var($primary-text-on-color);
      &[aria-selected="true"] {
        color: var($primary-text-on-color);
      }
    }
  }
}

span.tab-label {
  color: var($primary-text-on-color);
  //to achieve background color properly, we need to put surface first for a background,
  //then shade-1 to match the bar, then the hover effect on top
  background-image: linear-gradient(
      to right,
      alpha($state-color-on-neutral, var($state-opacity-hover-on-surface)),
      alpha($state-color-on-neutral, var($state-opacity-hover-on-surface))
    ),
    linear-gradient(to right, var($shade-1), var($shade-1)),
    linear-gradient(to right, var($surface), var($surface));
  height: $tab-width;
  line-height: $tab-width;
  font-size: var($base-font-size);
  position: absolute;
  top: 0;
  left: $tab-width;
  white-space: nowrap;
  z-index: 1;
  border-radius: 0 3px 3px 0px;

  & > span.content {
    padding: 0 1rem;
    display: inline-block;
    height: $tab-width;
    line-height: $tab-width;
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
