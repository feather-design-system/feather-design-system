<template>
  <Teleport :to="target" :disabled="!target">
    <div
      class="feather-snackbar-group"
      data-ref-id="feather-snackbar-group"
      :class="{ relative: relative }"
    >
      <slot />
    </div>
  </Teleport>
</template>
<script lang="ts">
import { defineComponent, provide, Ref } from "vue";
export const props = {
  target: {
    type: String,
    default: "body",
  },
  relative: {
    type: Boolean,
    default: false,
  },
};
export default defineComponent({
  props,
  setup() {
    interface ISnackbarQueueItem {
      id: number;
      val: Ref<boolean>;
    }
    let curr: ISnackbarQueueItem | undefined;
    let queue = [] as ISnackbarQueueItem[];

    const showSnackbar = () => {
      if (curr) {
        curr.val.value = true;
      }
    };
    const queueSnackbar = (id: number, internalVal: Ref<boolean>): void => {
      const item = { id: id, val: internalVal };
      if (!curr) {
        curr = item;
        showSnackbar();
      } else {
        queue.push(item);
      }
    };
    const unqueueSnackbar = (id: number) => {
      if (curr?.id === id) {
        curr.val.value = false;
      } else {
        queue = queue.filter((item) => {
          return item.id != id;
        });
      }
    };
    const shiftItem = () => {
      if (queue.length) {
        curr = queue.shift() as ISnackbarQueueItem;
        showSnackbar();
      } else {
        curr = undefined;
      }
    };
    provide("queueSnackbar", queueSnackbar);
    provide("unqueueSnackbar", unqueueSnackbar);
    provide("nextSnackbar", shiftItem);
    return {
      curr,
      queue,
      showSnackbar,
      queueSnackbar,
      shiftItem,
      unqueueSnackbar,
    };
  },
});
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/mixins/flex";
@import "@featherds/styles/themes/utils";
@import "@featherds/styles/mixins/typography";

.feather-snackbar-group {
  position: fixed;
  width: 100%;
  bottom: 0px;
  right: 0px;
  pointer-events: none;
  z-index: var(--feather-current-zindex, var($zindex-popover));

  &.relative {
    position: sticky;
  }
  &.relative :deep(.feather-snackbar-wrapper) {
    position: absolute;
  }
}
</style>
