<template>
  <section>
    <h1>Ripple in a div</h1>
    <div class="ripple-container">
      Content of the div

      <feather-ripple></feather-ripple>
    </div>
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
@import "~@featherds/styles/themes/variables";
.ripple-container {
  height: 200px;
  width: 200px;
  position: relative;
  border: 1px solid var($border-on-surface);
  background-color: var($surface);
}
section :deep(.ripple) {
  background-color: var($state-color-on-surface);
  opacity: var($state-opacity-pressed-on-surface);
}
</style>
