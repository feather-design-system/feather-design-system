<template>
  <div class="fake-header">
    <FeatherBackButton @focus="log('focus')" @click="log('click')"
      >Back to Something</FeatherBackButton
    >
  </div>
</template>
<script lang="ts">
import * as components from "./../src";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    ...components,
  },
  methods: {
    log(str: string) {
      console.log(str);
    },
  },
});
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
