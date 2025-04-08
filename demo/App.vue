<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>
<script>
export default {
  computed: {
    layout() {
      const fullscreen = "Fullscreen";
      if (
        this.$route.path.substring(
          this.$route.path.length - fullscreen.length
        ) === fullscreen
      ) {
        return "Fullscreen";
      } else {
        return "Layout";
      }
    },
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
