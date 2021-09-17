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
<script>
import * as components from "./../src";
export default {
  components: {
    ...components,
  },
};
</script>
<style lang="scss" scoped>
section :deep(button) {
  margin-left: 8px;
}
</style>
