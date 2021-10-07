<template>
  <section>
    <feather-button as-anchor href="#" primary>Primary Button</feather-button>
    <feather-button as-anchor href="#" secondary
      >Secondary Button</feather-button
    >
    <feather-button as-anchor href="#" text>Text Button</feather-button>
  </section>
</template>
<script>
import { FeatherButton } from "@featherds/button";
export default {
  components: {
    FeatherButton,
  },
};
</script>
<style lang="scss" scoped>
section :deep(button) {
  margin-left: 8px;
}
</style>
