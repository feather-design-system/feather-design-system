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
      background-color: color-mix(
        in hsl var(vars.$primary) 10%,
        var(vars.$surface) 50%
      );
      background-repeat: repeat;
      background-image: radial-gradient(
        circle at 2px 2px,
        var(--interaction-color, var(vars.$primary)) 1px,
        transparent 1.5px
      );
      background-size: 0.5em 0.5em;
      margin: 0.25rem;

      cursor: drag;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 1.5rem;
      height: 1.5rem;
      z-index: -1;
      border-radius: 0 16px 0 0;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    > :deep(.vue-resizable-handle) {
      background-color: color-mix(
        in oklab,
        var(vars.$primary) 8%,
        var(vars.$surface) 50%
      );
      border-radius: 100% 0 0 0;
      background-image: repeating-linear-gradient(
        135deg,
        var(--interaction-color, var(vars.$primary)) 0 2px,
        transparent 2px 6px
      );
      background-size: 1.75em 2.5em;

      width: 1.5rem;
      height: 1.5rem;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
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
