<template>
  <section>
    <h1>Selected Buttons</h1>
    <feather-button selected primary type="submit"
      >Submit Primary Button</feather-button
    >
    <feather-button selected primary>Primary Button</feather-button>
    <feather-button selected secondary>Secondary Button</feather-button>
    <feather-button selected text>Text Button</feather-button>
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
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
}
</style>
