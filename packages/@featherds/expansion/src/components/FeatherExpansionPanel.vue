<template>
  <div class="feather-expansion">
    <div :aria-level="level" role="heading">
      <a
        href="#"
        class="feather-expansion-header-button"
        role="button"
        :class="{ expanded: expanded, disabled: disabled }"
        :id="headerId"
        :aria-controls="contentId"
        :aria-expanded="expanded ? 'true' : 'false'"
        :aria-disabled="disabled ? 'true' : 'false'"
        :aria-busy="loading ? 'true' : 'false'"
        @click.prevent="handleClick"
        data-ref-id="feather-expansion-header-button"
      >
        <span class="feather-expansion-header-button-text">
          <slot name="title"> {{ title }}</slot></span
        >

        <FeatherIcon
          class="feather-expansion-header-button-icon"
          :icon="downIcon"
          :class="{ rotated: expanded, disabled: disabled }"
        />
      </a>
    </div>

    <transition
      name="expand"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
    >
      <div
        :id="contentId"
        :aria-labelledby="headerId"
        v-if="expanded"
        role="region"
        data-ref-id="feather-expansion-content"
      >
        <div v-if="loading" class="panel-content">
          <FeatherSpinner />
        </div>
        <div v-else class="panel-content">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { FeatherIcon } from "@featherds/icon";
import { FeatherSpinner } from "@featherds/progress";
import DownArrow from "@featherds/icon/navigation/ExpandMore";
import { getSafeId } from "@featherds/utils/id";
import { defineComponent } from "vue";
export const props = {
  modelValue: {
    type: Boolean,
    default: false,
    required: false,
  },
  level: {
    type: Number,
    default: 4,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  loading: {
    type: Boolean,
    default: false,
    required: false,
  },
};
export const emits = {
  "update:modelValue": (v: boolean) => true,
};
export default defineComponent({
  name: "FeatherExpansionPanel",
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  emits,
  props,
  watch: {
    modelValue: {
      immediate: true,
      handler(v: boolean) {
        this.internalState = v;
      },
    },
  },
  data() {
    return {
      internalState: this.modelValue,
    };
  },
  computed: {
    expanded() {
      if (this.disabled) {
        return false;
      }
      return this.internalState;
    },
    downIcon() {
      return DownArrow;
    },
    contentId() {
      return getSafeId("feather-expansion-panel");
    },
    headerId() {
      return getSafeId("feather-expansion-header");
    },
  },
  methods: {
    handleClick() {
      if (this.disabled) {
        return;
      }
      this.internalState = !this.internalState;
      this.$emit("update:modelValue", this.internalState);
    },
    enter(el: Element) {
      const element = el as HTMLElement;
      const width = getComputedStyle(element).width;

      element.style.width = width;
      element.style.position = "absolute";
      element.style.visibility = "hidden";
      element.style.height = "auto";

      const height = getComputedStyle(element).height;

      element.style.width = "";
      element.style.position = "";
      element.style.visibility = "";
      element.style.height = "0";

      // Force repaint to make sure the
      // animation is triggered correctly.
      getComputedStyle(element).height;

      // Trigger the animation.
      // We use `setTimeout` because we need
      // to make sure the browser has finished
      // painting after setting the `height`
      // to `0` in the line above.
      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(el: Element) {
      const element = el as HTMLElement;
      element.style.height = "auto";
    },
    leave(el: Element) {
      const element = el as HTMLElement;
      const height = getComputedStyle(element).height;

      element.style.height = height;

      // Force repaint to make sure the
      // animation is triggered correctly.
      getComputedStyle(element).height;

      setTimeout(() => {
        element.style.height = "0";
      });
    },
  },
  components: {
    FeatherIcon,
    FeatherSpinner,
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/mixins/elevation";

.feather-expansion {
  width: 100%;
  @include elevation(2);
  [role="region"] {
    will-change: height;
    .panel-content {
      padding: 0 1.5rem 2rem 1.5rem;
    }
  }

  .feather-expansion-header-button {
    display: flex;
    align-items: center;
    background: transparent;
    border: 0;
    padding: 0 1.5rem;
    position: relative;
    height: 3rem;
    text-align: left;
    width: 100%;
    transition: height 280ms ease-in-out;
    cursor: pointer;
    @include body-small();
    color: var($primary-text-on-surface);
    &:hover {
      text-decoration: none;
    }
    &.expanded {
      height: 4rem;
    }
    &.disabled {
      color: var($disabled-text-on-surface);
      cursor: default;
    }
  }
  .feather-expansion-header-button-text {
    flex: 1;
    display: block;
  }
  .feather-expansion-header-button-icon {
    flex: none;
    display: flex;
    align-items: center;
    justify-items: center;
    height: 1.125rem;
    width: 1.125rem;
    font-size: 1.125rem;
    color: var($secondary-text-on-surface);
    &.disabled {
      color: var($disabled-text-on-surface);
      cursor: default;
    }
  }
}

.feather-expansion-header-button-icon {
  transition: transform 280ms ease-in-out;
  transform-origin: center center;
  &.rotated {
    transform: rotate(180deg);
  }
}
.expand-enter-active,
.expand-leave-active {
  transition: height 250ms ease-in-out;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  height: 0;
}
</style>
