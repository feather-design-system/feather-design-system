<template>
  <section>
    <FeatherButton primary type="submit">Submit Primary Button</FeatherButton>
    <FeatherButton primary>Primary Button</FeatherButton>
    <FeatherButton secondary>Secondary Button</FeatherButton>
    <FeatherButton text>Text Button</FeatherButton>
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
