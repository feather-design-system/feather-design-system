<template>
  <button
    v-bind="attrs"
    :class="{ hover: forceHoverClass }"
    :aria-labelledby="labelId"
    ref="button"
  >
    <div class="circle" role="presentation">
      <FeatherIcon :icon="icon" />
    </div>
    <transition
      name="slide"
      @before-enter="setupWidth"
      @before-leave="addHoverClass"
      @after-leave="removeHoverClass"
      @leave-cancelled="removeHoverClass"
    >
      <div class="text" ref="text" v-show="showText" :id="labelId">
        <slot></slot>
      </div>
    </transition>
    <FeatherRipple />
  </button>
</template>
<script lang="ts">
import { FeatherRipple } from "@featherds/ripple";
import { FeatherIcon } from "@featherds/icon";
import icon from "@featherds/icon/navigation/ChevronLeft";
import { getSafeId } from "@featherds/utils/id";
import { defineComponent } from "vue";
export const props = {
  longHover: {
    type: Number,
    default: 500,
  },
} as const;
export default defineComponent({
  emits: ["focus", "blur", "mouseenter", "mouseleave"],
  props,
  data: () => ({
    longHoverTimeout: -1,
    showText: false,
    widthSet: false,
    forceHoverClass: false,
  }),
  computed: {
    icon() {
      return icon;
    },
    labelId() {
      return getSafeId("back-button-label");
    },
    attrs() {
      const attrs = {
        ...this.$attrs,
      };
      attrs.onMouseenter = (e: MouseEvent) => {
        this.mouseEnter();
        this.$emit("mouseenter", e);
      };
      attrs.onMouseleave = (e: MouseEvent) => {
        this.mouseLeave();
        this.$emit("mouseleave", e);
      };
      attrs.onFocus = (e: FocusEvent) => {
        this.mouseEnter();
        this.$emit("focus", e);
      };
      attrs.onBlur = (e: FocusEvent) => {
        this.mouseLeave();
        this.$emit("blur", e);
      };
      return attrs;
    },
  },
  methods: {
    mouseEnter() {
      this.longHoverTimeout = setTimeout(() => {
        this.showText = true;
      }, this.longHover);
    },
    mouseLeave() {
      clearTimeout(this.longHoverTimeout);
      this.showText = false;
    },
    addHoverClass() {
      this.forceHoverClass = true;
    },
    removeHoverClass() {
      this.forceHoverClass = false;
    },
    setupWidth() {
      if (this.widthSet) {
        return;
      }
      this.widthSet = true;
      const text = this.$refs.text as HTMLDivElement;
      const original = text.style.display;
      text.style.display = "block";
      text.style.width = `${text.getBoundingClientRect().width}px`;
      text.style.display = original;
    },
  },
  components: {
    FeatherIcon,
    FeatherRipple,
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/utils";
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/mixins/typography";
button {
  position: relative;
  background-color: transparent;
  border-radius: 36px;
  border: 1px solid var($primary);
  color: var($primary);

  height: 2.25rem;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
  &:hover,
  &:focus,
  &.hover {
    @include elevation(6);
  }
  @include state-on-surface();
  // @include state-on-surface(".hover", false);
  &:hover:after,
  &.hover:after,
  &:focus:before {
    border-radius: 36px;
  }
}
.hide {
  width: 0;
}
.text {
  padding-right: 1rem;
  padding-left: 0.5rem;
  @include button();
  color: var($primary);
  height: 2.25rem;
  line-height: 2.25rem;
  white-space: nowrap;
  overflow: hidden;
}
.circle {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  height: 1.25rem;
  width: 1.25rem;
  font-size: 1.25rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.slide-enter-from,
.slide-leave-to {
  width: 0 !important;
  padding: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 250ms linear;
}
</style>
