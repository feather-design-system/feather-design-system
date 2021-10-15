<template>
  <section>
    <FeatherButton primary type="submit">Submit Primary Button</FeatherButton>
    <FeatherButton primary>Primary Button</FeatherButton>
    <FeatherButton secondary>Secondary Button</FeatherButton>
    <FeatherButton text>Text Button</FeatherButton>
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
