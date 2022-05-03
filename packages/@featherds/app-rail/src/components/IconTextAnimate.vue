<template>
  <div class="icon-text-animate" :class="{ expanded: expanded }">
    <span class="icon-animate"><slot name="icon"></slot></span>
    <span class="text-animate"><slot name="text"></slot></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
export default defineComponent({
  setup() {
    const expanded = inject("feather-app-rail-expanded", ref(false));
    return { expanded };
  },
});
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
.icon-text-animate {
  height: 56px;
  display: flex;
  overflow: hidden;
  align-items: center;
  padding-left: 1rem;
  transition-delay: 140ms;
  transition: all 280ms ease-in-out;
  color: var($state-color-on-surface-dark);
  --feather-app-rail-text-color: var(#{$state-color-on-surface-dark});
  &.expanded {
    width: 100%;
    padding-left: 2rem;
    transition-delay: 0ms;
    .text-animate {
      transition-delay: 140ms;
      opacity: 1;
    }
  }
  .text-animate {
    opacity: 0;
    transition: opacity 280ms ease-in-out;

    margin-left: 1rem;
  }
}
</style>
