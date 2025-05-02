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
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/mixins/grid" as grid;
body {
  background-color: var(vars.$background);
}

.feather-container {
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  margin: 0 auto;
  @include grid.container();
}
</style>
