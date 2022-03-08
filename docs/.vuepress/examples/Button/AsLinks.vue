<template>
  <section>
    <FeatherButton as-anchor href="#" primary>Primary Button</FeatherButton>
    <FeatherButton as-anchor href="#" secondary>Secondary Button</FeatherButton>
    <FeatherButton as-anchor href="#" text>Text Button</FeatherButton>
  </section>
</template>
<script lang="ts">
import { FeatherButton } from "@featherds/button";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    FeatherButton,
  },
});
</script>
