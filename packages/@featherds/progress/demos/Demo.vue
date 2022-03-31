<template>
  <section>
    <FeatherSpinner></FeatherSpinner>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import * as components from "./../src";
export default defineComponent({
  components: {
    ...components,
  },
});
</script>
