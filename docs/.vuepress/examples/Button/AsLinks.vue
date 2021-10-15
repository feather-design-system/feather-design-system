<template>
  <section>
    <FeatherButton as-anchor href="#" primary>Primary Button</FeatherButton>
    <FeatherButton as-anchor href="#" secondary>Secondary Button</FeatherButton>
    <FeatherButton as-anchor href="#" text>Text Button</FeatherButton>
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
