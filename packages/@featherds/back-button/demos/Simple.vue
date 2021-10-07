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
@import "~@featherds/styles/themes/variables";
.fake-header {
  height: 60px;
  background-color: var($background);
  padding-left: 10px;
  display: flex;
  align-items: center;
}
</style>
