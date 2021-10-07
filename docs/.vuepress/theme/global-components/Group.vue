<template>
  <div class="group">
    <div class="left">
      <h3>
        {{ title }}
      </h3>
    </div>
    <div class="right">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    description: String,
  },
};
</script>
<style lang="scss" scoped>
@import "~@featherds/styles/themes/variables";
@import "~@featherds/styles/mixins/typography";
div.group {
  margin-top: 8px;
  h3 {
    margin: 0;
  }
}
</style>
