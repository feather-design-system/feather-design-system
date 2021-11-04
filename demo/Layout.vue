<template>
  <div class="feather-styles">
    <div class="feather-container">
      <theme-changer />
      <slot />
    </div>
  </div>
</template>
<script>
import ThemeChanger from "./ThemeChanger.vue";
export default {
  components: {
    ThemeChanger,
  },
};
</script>
<style lang="scss">
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/grid";
body {
  background-color: var($background);
}

.feather-container {
  @include container();
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  margin: 0 auto;
}
</style>
