<template>
  <li>
    <a v-bind="$attrs" :href="href" data-ref-id="feather-footer-link">
      <slot />
    </a>
  </li>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export const props = {
  href: {
    type: String,
    required: true,
  },
} as const;
export default defineComponent({
  inheritAttrs: false,
  props,
});
</script>

<style lang="scss" scoped>
li {
  list-style: none;
  margin: 0 1rem;
}
</style>
