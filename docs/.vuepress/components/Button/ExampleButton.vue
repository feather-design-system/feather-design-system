<template>
  <section>
    <feather-button primary type="submit">Submit Primary Button</feather-button>
    <feather-button primary>Primary Button</feather-button>
    <feather-button secondary>Secondary Button</feather-button>
    <feather-button text>Text Button</feather-button>
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
