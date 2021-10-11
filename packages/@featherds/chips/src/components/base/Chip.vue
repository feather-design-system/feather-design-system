<template>
  <div
    class="chip"
    :class="{
      condensed: isCondensed,
      disabled: disabled,
      focused: focused,
    }"
    @focusin="clickable ? handleFocus : null"
    @focusout="clickable ? handleBlur : null"
    :aria-disabled="disabled"
  >
    <slot />
    <FeatherRipple v-if="clickable" />
  </div>
</template>
<script>
import { ref, inject, computed } from "vue";
import { FeatherRipple } from "@featherds/ripple";
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
    clickable: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const groupCondensed = inject("isCondensed", null);
    const isCondensed = computed(() => {
      return groupCondensed || props.condensed;
    });

    const focused = ref(false);
    const handleFocus = () => {
      focused.value = true;
    };

    const handleBlur = () => {
      focused.value = false;
    };

    return {
      focused,
      handleFocus,
      handleBlur,
      isCondensed,
    };
  },
  components: {
    FeatherRipple,
  },
};
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/themes/utils";
@import "@featherds/styles/mixins/typography";
@import "../../../scss/mixins";

.chip {
  margin: 0;
  margin-right: 8px;
  margin-bottom: 8px;
  height: 32px;
  list-style: none;
  display: inline-flex;
  align-items: center;
  background-color: var($border-light-on-surface);
  border-radius: 16px;
  border: 1px solid transparent;
  min-width: 0;
  max-width: 288px;
  padding: 0 4px;
  @include state-on-neutral($border-light-on-surface);
  &:focus {
    outline: none;
  }
  &.hover {
    cursor: pointer;
    :deep(.ripple) {
      display: block;
    }
  }
  :deep(.ripple) {
    display: none;
  }

  & > :deep(span[role="gridcell"]:not(.chip-delete)) {
    display: flex;
    flex: 1;
    min-width: 0;

    & .chip-label-button {
      min-width: 0;
    }
  }

  &.focused:not(.disabled) {
    :deep(.label) {
      color: var($primary-text-on-surface);
    }
    border: 1px solid var($border-on-surface);
    outline: 0;
  }
  &.disabled {
    color: var($disabled-text-on-surface);
    background-color: var($border-light-on-surface);
    @include state-disabled($border-light-on-surface);
    cursor: default;
    :deep(.label) {
      color: var($disabled-text-on-surface);
      cursor: default;
      &:hover {
        color: var($disabled-text-on-surface);
      }
    }
    :deep(.ripple) {
      display: none;
    }
    :deep(.chip-icon > .feather-icon) {
      color: var($disabled-text-on-surface);
    }
  }
  &.condensed {
    @include condensed-chip;
  }
}
</style>
