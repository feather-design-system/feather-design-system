<template>
  <section>
    <FeatherButton disabled primary type="submit"
      >Submit Primary Button</FeatherButton
    >
    <FeatherButton disabled primary>Primary Button</FeatherButton>
    <FeatherButton disabled secondary>Secondary Button</FeatherButton>
    <FeatherButton disabled text>Text Button</FeatherButton>
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
