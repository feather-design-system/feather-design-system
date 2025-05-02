<template>
  <section>
    <h1>Ripple in a div</h1>
    <div class="ripple-container">
      Content of the div

      <feather-ripple></feather-ripple>
    </div>
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
<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
.ripple-container {
  height: 12.5rem;
  width: 12.5rem;
  position: relative;
  border: 1px solid var(vars.$border-on-surface);
  background-color: var(vars.$surface);
}
section :deep(.ripple) {
  background-color: var(vars.$state-color-on-surface);
  opacity: var(vars.$state-opacity-pressed-on-surface);
}
</style>
