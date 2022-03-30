<template>
  <div class="app-layout">
    <div class="app-header">
      <slot name="header"></slot>
    </div>
    <div class="app-main">
      <div
        class="app-aside app-rail"
        :class="{
          responsive: active,
          show: expanded,
        }"
      >
        <div class="app-rail-modal-backdrop"></div>
        <div class="app-rail-content" ref="railContent">
          <FocusTrap :enable="active && expanded">
            <slot name="rail"></slot>
          </FocusTrap>
        </div>
      </div>
      <div class="app-content">
        <div
          class="app-content-container"
          :class="{ 'full-width': contentLayout === 'full' }"
        >
          <slot></slot>
        </div>
      </div>
    </div>
    <div class="app-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { FocusTrap } from "@featherds/dialog";
import { useCloseOnEsc } from "@featherds/composables/modal/CloseOnEsc";
import { useRestoreFocus } from "@featherds/composables/modal/RestoreFocus";
import { useOutsideClick } from "@featherds/composables/events/OutsideClick";
import { ref, provide, computed, watch, defineComponent, PropType } from "vue";
type LayoutType = "center" | "full";
export const props = {
  contentLayout: {
    type: String as PropType<LayoutType>,
    default: "center",
    validator: (v: string) => {
      return ["full", "center"].indexOf(v) > -1;
    },
  },
};
export default defineComponent({
  props,
  setup(props, context) {
    const full = ref(props.contentLayout === "full");
    const _expand = ref(false);
    const active = ref(false);
    const railContent = ref();
    const expanded = computed(() => {
      return active.value && _expand.value;
    });
    if (context.slots.rail) {
      full.value = true;

      provide("feather-app-layout-expanded", () => {
        active.value = true;
        return expanded;
      });
      provide("feather-app-layout-expander", () => {
        return { active, expand: () => (_expand.value = true) };
      });
    }
    if (full.value) {
      provide("feather-app-layout-full-width", full.value);
    }

    useRestoreFocus(expanded);
    watch(useCloseOnEsc(expanded), () => {
      _expand.value = false;
    });
    const activate = useOutsideClick(railContent, () => {
      _expand.value = false;
    });
    watch(expanded, (v) => {
      activate.value = v;
    });

    return {
      full,
      active,
      expanded,
      railContent,
    };
  },
  components: {
    FocusTrap,
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/mixins/grid";
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/elevation";
.app-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.app-header,
.app-footer {
  flex: none;
}
.app-main {
  flex: 1;
  display: flex;
}
.app-content {
  flex: 1;
  display: flex;
  justify-content: center;
  width: 100%;
  > .app-content-container {
    max-width: var($content-width);
    width: 100%;
    &.full-width {
      max-width: none;
    }
  }
}
.app-aside {
  flex: none;
}

@include media-query-below(xl) {
  .app-rail.responsive {
    .app-rail-content {
      position: fixed;
      left: 0;
      top: 0;
      @include elevation(24);
      z-index: var($zindex-modal);
      transition: transform 280ms ease-in-out;
      transform: translateX(-100%);
    }
    .app-rail-modal-backdrop {
      display: none;
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: var($zindex-modal-backdrop);
      background-color: var($disabled-text-on-surface);
    }

    &.show {
      .app-rail-content {
        transform: translateX(0);
      }
      .app-rail-modal-backdrop {
        display: block;
      }
    }
  }
}
</style>
