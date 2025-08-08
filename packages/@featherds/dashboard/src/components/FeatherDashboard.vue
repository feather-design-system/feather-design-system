<template>
  <GridLayout
    class="feather-grid-layout"
    v-model:layout="state.layout"
    :colNum="props.colNum"
    :rowHeight="props.rowHeight"
    :isDraggable="state.isDraggable"
    :isResizable="state.isResizable"
  >
    <GridItem
      class="feather-grid-item"
      v-for="item in state.layout"
      :key="item.i"
      :i="item.i"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :static="item.static"
    >
      <component
        v-if="item.component"
        class="feather-grid-item-component"
        :is="item.component"
        v-bind="item.props"
      />

      <span
        v-else
        v-html="item.content"
        class="feather-grid-item-component"
      ></span>
    </GridItem>
  </GridLayout>
</template>

<script setup lang="ts">
import { reactive } from "vue";
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
});

const state = reactive({
  layout: props.items,
  isDraggable: props.isDraggable,
  isResizable: props.isResizable,
});
</script>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;

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

    > :deep(.vue-resizable-handle) {
      background: url(undefined);
      background-color: color-mix(
        in oklab,
        var(vars.$primary) 8%,
        var(vars.$surface) 50%
      );
      border-radius: 16px 2px 2px 2px;
      &::before {
        content: "⌟";
        position: absolute;
        font-size: 1.25rem;
        bottom: 0rem;
        right: 0.25rem;
        color: color-mix(
          in oklab,
          var(vars.$primary) 50%,
          var(vars.$surface) 50%
        );
      }
      // &::after {
      //   content: "̷";
      //   position: absolute;
      //   font-size: 1rem;
      //   bottom: 0rem;
      //   right: 0.35rem;
      //   color: color-mix(
      //     in oklab,
      //     var(vars.$primary) 50%,
      //     var(vars.$surface) 50%
      //   );
      // }
    }

    &.vue-draggable-dragging {
      background-color: color-mix(
        in oklab,
        var(vars.$primary) 8%,
        var(vars.$surface) 20%
      );

      color: var(vars.$primary-text-on-surface);
    }
    &.resizing {
      background: auto;
      background-color: color-mix(
        in oklab,
        var(vars.$primary) 8%,
        var(vars.$surface) 20%
      );
    }
  }
  :deep(.vue-grid-item.vue-grid-placeholder) {
    background-color: var(vars.$primary);
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
