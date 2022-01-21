<template>
  <div class="fake-header">
    <feather-back-button @focus="log('focus')" @click="log('click')"
      >Back to Something</feather-back-button
    >
  </div>
</template>
<script>
import * as components from "./../src";

export default {
  components: {
    ...components,
  },
  methods: {
    log(str) {
      console.log(str);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
.fake-header {
  height: 3.75rem;
  background-color: var($background);
  padding-left: 1rem;
  display: flex;
  align-items: center;
}
</style>
