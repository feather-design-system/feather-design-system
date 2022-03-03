<template>
  <Teleport :to="target" :disabled="!target">
    <div
      class="feather-snackbar-group"
      data-ref-id="feather-snackbar-group"
      :class="{ relative: target }"
    >
      <slot />
    </div>
  </Teleport>
</template>
<script>
import { provide } from "vue";
export default {
  props: {
    target: {
      type: String,
    },
  },
  setup() {
    let curr = null;
    let queue = [];

    const showSnackbar = () => {
      curr.val.value = true;
    };
    const queueSnackbar = (id, internalVal) => {
      const item = { id: id, val: internalVal };
      if (curr == null) {
        curr = item;
        showSnackbar();
      } else {
        queue.push(item);
      }
    };
    const unqueueSnackbar = (id) => {
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
        curr = queue.shift();
        showSnackbar();
      } else {
        curr = null;
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
};
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

  &.relative {
    position: sticky;
  }
  &.relative :deep(.feather-snackbar-wrapper) {
    position: absolute;
  }
}
</style>
