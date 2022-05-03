<template>
  <div class="fake-bar"></div>

  <SkipContentLink :content="content" :skip-label="skipLabel" />
  <div
    class="feather-app-rail"
    v-bind="listeners"
    :class="{ narrow: !expanded }"
  >
    <div class="feather-app-rail-icon">
      <slot name="icon" :expanded="expanded"></slot>
    </div>
    <nav>
      <FeatherList class="feather-app-rail-list">
        <slot name="nav"></slot>
      </FeatherList>
    </nav>
  </div>
</template>
<script lang="ts">
import { defineComponent, provide, ref, PropType, toRef, computed } from "vue";
import { FeatherList } from "@featherds/list";
import { useLabelProperty } from "@featherds/composables/LabelProperty";
import { SkipContentLink } from "@featherds/app-layout";
import {
  _setTimeout,
  TimeoutResult,
  _clearTimeout,
} from "@featherds/utils/setTimeout";
const LABELS = {
  skip: "REQUIRED",
};

export const props = {
  content: {
    type: String,
    required: true,
  },
  labels: {
    type: Object as PropType<Partial<typeof LABELS>>,
    default: () => {
      return LABELS;
    },
    validator: (v: typeof LABELS) => {
      return !!v.skip;
    },
  },
} as const;
export default defineComponent({
  props,
  setup: (props) => {
    const focused = ref(false);
    const hovered = ref(false);
    const expanded = computed(() => {
      if (focused.value) {
        return true;
      }
      if (hovered.value) {
        return true;
      }
      return false;
    });
    let focusTimeout = 0 as TimeoutResult;
    const focusOut = () => {
      _clearTimeout(focusTimeout);
      focusTimeout = _setTimeout(() => {
        focused.value = false;
      }, 4);
    };
    const focusIn = () => {
      _clearTimeout(focusTimeout);
      focused.value = true;
    };
    const listeners = {
      onFocusin: focusIn,
      onFocusout: focusOut,
      onmouseenter: () => (hovered.value = true),
      onmouseleave: () => (hovered.value = false),
    };
    provide("feather-app-rail-expanded", expanded);

    const labels = useLabelProperty<typeof LABELS>(
      toRef(props, "labels"),
      LABELS
    );

    return { listeners, expanded, ...labels };
  },

  components: {
    FeatherList,
    SkipContentLink,
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/elevation";
$bar-narrow-width: 3.5rem;
$bar-width: 16.5rem;
.fake-bar {
  width: $bar-narrow-width;
  height: 10px;
}
.feather-app-rail {
  width: $bar-width;
  position: fixed;
  overflow-y: auto;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: var($surface-dark);
  border-right: 2px solid var($border-on-surface);
  color: var($primary-text-on-color);
  z-index: var($zindex-fixed);
  --feather-secondary-text-on-surface: var(#{$secondary-text-on-color});
  --feather-primary-text-on-surface: var(#{$primary-text-on-color});
  transition: all 500ms ease-in-out;
  :deep(.feather-list-item),
  :deep(.feather-list-header) {
    margin-left: 1rem;
    margin-right: 1rem;
    overflow-x: hidden;
  }
  &.narrow {
    width: $bar-narrow-width;
  }
  .feather-app-rail-list {
    overflow-x: hidden;
  }
}
</style>
