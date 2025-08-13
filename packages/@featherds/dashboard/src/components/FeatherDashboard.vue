<template>
  <GridLayout
    class="feather-grid-layout"
    v-model:layout="state.layout"
    :colNum="props.colNum"
    :rowHeight="props.rowHeight"
    :isDraggable="props.isDraggable"
    :isResizable="props.isResizable"
  >
    <GridItem
      :class="gridItemClasses"
      v-for="item in state.layout"
      :key="item.i"
      :i="item.i"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :static="item.static"
      :dragAllowFrom="
        props.isDraggable && props.hasDragHandle
          ? '.feather-draggable-handle'
          : ''
      "
      :dragIgnoreFrom="props.hasDragHandle ? '.no-drag' : ''"
    >
      <div
        v-if="showDragHandle && !item.static"
        class="feather-draggable-handle"
      ></div>
      <component
        v-if="item.component"
        :class="gridItemContentClasses"
        :is="item.component"
        v-bind="item.props"
      />

      <span v-else v-html="item.content" :class="gridItemContentClasses"></span>
    </GridItem>
  </GridLayout>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { GridLayout, GridItem, type GridLayoutItem } from "vue-grid-layout-v3";

const props = defineProps({
  id: String,
  isDraggable: {
    type: Boolean,
    default: true,
  },
  isResizable: {
    type: Boolean,
    default: true,
  },
  colNum: {
    type: Number,
    default: 16,
  },
  rowHeight: {
    type: Number,
    default: 30,
  },
  items: {
    type: Array as () => GridLayoutItem[],
    default: () => [],
  },
  hasDragHandle: {
    type: Boolean,
    default: true,
  },
});

const state = reactive({
  layout: props.items,
  isDraggable: props.isDraggable,
  isResizable: props.isResizable,
  hasDragHandle: props.hasDragHandle,
});

const gridItemClasses = computed(() => {
  return {
    "feather-grid-item": true,
    "feather-draggable": props.isDraggable,
    "feather-sizable": props.isResizable,
  };
});

const gridItemContentClasses = computed(() => {
  return {
    "feather-grid-item-content": true,
    "no-drag": props.isDraggable && props.hasDragHandle,
  };
});

const showDragHandle = computed(() => {
  return props.isDraggable && props.hasDragHandle;
});
</script>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;

.feather-grid-item {
  --interaction-color: var(vars.$primary-variant);
  color: var(--interaction-color);
}

.feather-grid-layout {
  border: 1px solid var(vars.$shade-4);
  border-radius: 4px;
  background-color: color-mix(
    in oklab,
    var(vars.$primary) 2%,
    var(vars.$surface) 50%
  );

  .vue-grid-item.feather-grid-item {
    border: 2px solid var(vars.$shade-4);
    border-radius: 4px;
    overflow: hidden;
    position: relative;

    > .feather-draggable-handle {
      background-image: radial-gradient(
        circle at 2px 2px,
        var(--interaction-color, var(vars.$primary)) 1px,
        transparent 1.5px
      );
      transform: translate(1px, -1px);

      background-color: color-mix(
        in hsl var(vars.$primary) 10%,
        var(vars.$surface) 50%
      );
      background-repeat: repeat;
      background-size: 0.5em 0.5em;
      margin: 0.125rem;

      cursor: drag;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 2rem;
      height: 2rem;
      z-index: -1;
      border-radius: 4px;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
    }

    > :deep(.vue-resizable-handle) {
      background-image: repeating-linear-gradient(
        135deg,
        var(--interaction-color, var(vars.$primary)) 0 1px,
        transparent 1.5px 4px
      );
      background-color: color-mix(
        in oklab,
        var(vars.$primary) 8%,
        var(vars.$surface) 50%
      );

      margin: 0.125rem;
      border-radius: 4px;

      width: 2rem;
      height: 2rem;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.1s ease-in-out;
      clip-path: polygon(100% 0%, 100% 100%, 0% 100%);
    }
    &.resizing,
    &.vue-draggable-dragging {
      background-color: color-mix(
        in oklab,
        var(vars.$primary) 8%,
        var(vars.$surface) 20%
      );

      color: var(vars.$primary-text-on-surface);
    }
    &:hover {
      > :deep(.vue-resizable-handle),
      > .feather-draggable-handle {
        opacity: 0.25;
        z-index: var(vars.$zindex-popover);
        background-color: color-mix(
          in hsl,
          var(vars.$primary) 10%,
          var(vars.$surface) 50%
        );
      }
    }
  }
  :deep(.vue-grid-item.vue-grid-placeholder) {
    background-color: var(vars.$secondary);
    border-radius: 4px;
  }
  &.static {
    background-color: color-mix(
      in oklab,
      var(vars.$primary) 8%,
      var(vars.$surface) 20%
    );
  }
}
</style>
