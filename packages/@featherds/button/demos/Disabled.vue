<template>
  <section>
    <feather-button disabled primary type="submit"
      >Submit Primary Button</feather-button
    >
    <feather-button disabled primary>Primary Button</feather-button>
    <feather-button disabled secondary>Secondary Button</feather-button>
    <feather-button disabled text>Text Button</feather-button>
  </section>
</template>
<script lang="ts">
import * as components from "./../src";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    ...components,
  },
});
</script>
<style lang="scss" scoped>
section :deep(button) {
  margin-left: 0.5rem;
}
</style>
