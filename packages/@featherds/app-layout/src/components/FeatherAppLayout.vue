<template>
  <div class="app-layout">
    <div class="app-header">
      <slot name="header"></slot>
    </div>
    <div class="app-main">
      <div class="app-aside">
        <slot name="rail"></slot>
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
<script>
import { ref, provide } from "vue";
export default {
  props: {
    contentLayout: {
      type: String,
      default: "center",
      validator(v) {
        return ["full", "center"].indexOf(v) > -1;
      },
    },
  },
  setup(props, context) {
    const full = ref(props.contentLayout === "full");
    if (context.slots.rail) {
      full.value = true;
    }
    if (full.value) {
      provide("feather-app-layout-full-width", full.value);
    }

    return {
      full,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@featherds/styles/mixins/grid";
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
  > .app-content-container {
    width: 100%;
    @include container();
    &.full-width {
      @include container(true);
    }
  }
}
.app-aside {
  flex: none;
}
</style>
