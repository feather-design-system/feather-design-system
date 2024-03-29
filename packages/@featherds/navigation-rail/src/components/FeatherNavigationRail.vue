<template>
  <div class="nav-rail-container">
    <div class="nav-rail" :class="{ collapsed: !expanded }">
      <div class="nav-header">
        <div class="header-content">
          <slot name="header" />
        </div>
        <div
          tabindex="0"
          role="button"
          @click.prevent.stop="toggle"
          @keydown.enter.space="toggle"
          class="expand-link hover focus"
          :aria-pressed="expanded"
          data-ref-id="feather-navigation-rail-expand"
        >
          <FeatherIcon class="chevron" :icon="chevron" :title="expandLabel" />
          <FeatherRipple center />
        </div>
      </div>
      <div class="rail-menu">
        <nav
          class="primary-menu"
          :aria-label="mainLabel"
          data-ref-id="feather-navigation-rail-main"
        >
          <FeatherList>
            <slot name="main" />
          </FeatherList>
        </nav>
        <transition name="fade">
          <div class="secondary-menu" v-if="expanded">
            <slot />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Chevron from "@featherds/icon/navigation/ChevronLeft";
import { FeatherIcon } from "@featherds/icon";
import { defineComponent, PropType, ref, toRef, watch } from "vue";
import { FeatherList } from "@featherds/list";
import { FeatherRipple } from "@featherds/ripple";
import { markRaw } from "vue";

import { useLabelProperty } from "@featherds/composables/LabelProperty";
const LABELS = {
  main: "Main Navigation",
  expand: "Show full menu",
};
export const props = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  labels: {
    type: Object as PropType<Partial<typeof LABELS>>,
    default: () => {
      return LABELS;
    },
    validator: (v: Partial<typeof LABELS>) => {
      return !!v.main && !!v.expand;
    },
  },
} as const;
export default defineComponent({
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  props,
  setup(props, context) {
    const expanded = ref(props.modelValue);
    const modelValue = toRef(props, "modelValue");
    watch(modelValue, (nv) => {
      expanded.value = nv;
    });
    const toggle = (e: Event) => {
      e.preventDefault();
      expanded.value = !expanded.value;
      context.emit("update:modelValue", expanded.value);
    };

    const labels = useLabelProperty<typeof LABELS>(
      toRef(props, "labels"),
      LABELS
    );

    return { toggle, expanded, ...labels };
  },

  computed: {
    chevron() {
      return markRaw(Chevron);
    },
  },
  components: {
    FeatherIcon,
    FeatherList,
    FeatherRipple,
  },
});
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/mixins/flex";
@import "@featherds/styles/themes/utils";
$width: 16.5rem;
$condensed: 3.25rem;
$header-size: 2.5rem;
.nav-header {
  @include flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid var($border-on-surface);
  padding: 0.5rem 0.375rem 0.5rem 0.75rem;
  .expand-link {
    @include flex;
    @include center;
    @include none;
    cursor: pointer;
    font-size: 1.25rem;
    width: $header-size;
    height: $header-size;
    color: var($secondary-text-on-surface);
    .chevron {
      transition: transform 280ms ease-in-out;
    }

    //buton styles
    border-radius: 100%;
    background-color: transparent;
    border: 2px solid transparent;
    @include state-on-surface();
    &:hover {
      border-color: alpha(
        $state-color-on-surface,
        var($state-opacity-hover-on-surface)
      );
    }
    &:focus {
      border-color: var($primary);
    }
  }
  .header-content {
    transition: all 100ms ease-in-out 280ms;
    opacity: 1;
    flex: 1;
    height: $header-size;
    display: flex;
    align-items: center;
  }
}

.rail-menu {
  :deep(.feather-menu-list) {
    border-top: 1px solid var($border-on-surface);
  }

  :deep(.primary-menu .feather-list-item-text) {
    transition: all 100ms ease-in-out 280ms;
    opacity: 1;
  }
}
.nav-rail-container {
  width: $condensed;
  min-height: 1px;
  flex: none;
}
.nav-rail {
  transition: width 280ms ease-in-out;
  position: fixed;
  width: $width;
  left: 0;
  top: var($header-height);
  height: calc(100vh - var($header-height));
  background: var($background);
  color: var($primary-text-on-surface);
  @include elevation(2);
}

.nav-rail.collapsed {
  transition: width 280ms ease-in-out 80ms;

  width: $condensed;

  .header-content {
    transition: all 100ms ease-in-out;
    opacity: 0;
  }
  .expand-link .chevron {
    transition: transform 280ms ease-in-out 80ms;
    transform: rotate(180deg);
  }

  .rail-menu {
    :deep(.primary-menu .feather-list-item-text) {
      transition: all 100ms ease-in-out;
      opacity: 0;
    }
  }
}
.fade-leave-active {
  transition: opacity 100ms ease-in-out;
}
.fade-enter-active {
  transition: opacity 100ms ease-in-out 280ms;
}
.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
  display: none;
}
.fade-leave-from {
  opacity: 1;
}
</style>
