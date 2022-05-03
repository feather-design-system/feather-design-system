<template>
  <div class="app-layout" :class="navLayout">
    <div class="app-header">
      <slot name="header" v-if="navLayout === 'horizontal'"></slot>
      <slot name="rail" v-if="navLayout === 'vertical'"></slot>
    </div>
    <div class="app-aside">
      <slot name="header" v-if="navLayout === 'vertical'"></slot>
      <slot name="rail" v-if="navLayout === 'horizontal'"></slot>
    </div>
    <div class="app-content">
      <div
        class="app-content-container"
        :class="{ 'full-width': contentLayout === 'full' }"
      >
        <slot></slot>
      </div>
    </div>
    <div class="app-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, provide, computed, defineComponent, PropType } from "vue";
type LayoutType = "center" | "full";
type navLayoutType = "vertical" | "horizontal";
export const props = {
  contentLayout: {
    type: String as PropType<LayoutType>,
    default: "center",
    validator: (v: string) => {
      return ["full", "center"].indexOf(v) > -1;
    },
  },

  navLayout: {
    type: String as PropType<navLayoutType>,
    default: "horizontal",
    validator: (v: string) => {
      return ["vertical", "horizontal"].indexOf(v) > -1;
    },
  },
} as const;
export default defineComponent({
  props,
  setup(props, context) {
    const full = ref(props.contentLayout === "full");
    const navLayout = ref(props.navLayout);
    const _expand = ref(false);
    const active = ref(false);
    const railContent = ref();
    const expanded = computed(() => {
      return active.value && _expand.value;
    });
    if (context.slots.rail) {
      full.value = true;
      const collapse = () => (_expand.value = false);
      provide("feather-app-layout-expanded", () => {
        active.value = true;
        return { expanded, collapse };
      });
      provide("feather-app-layout-expander", () => {
        return { active, expand: () => (_expand.value = true) };
      });
    }
    if (full.value) {
      provide("feather-app-layout-full-width", full.value);
    }

    return {
      full,
      active,
      expanded,
      railContent,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/mixins/grid";
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/elevation";
.app-layout {
  height: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-areas:
    "header header"
    "rail main"
    "rail footer";
  grid-template-rows: auto minmax(0, 1fr) auto;
  grid-template-columns: auto minmax(0, 1fr);
}
.app-layout.vertical {
  grid-template-areas:
    "header rail"
    "header main"
    "header footer";
}
.app-header {
  grid-area: header;
}
.app-footer {
  grid-area: footer;
}
.app-content {
  grid-area: main;
}
.app-aside {
  grid-area: rail;
}

.app-content {
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
</style>
