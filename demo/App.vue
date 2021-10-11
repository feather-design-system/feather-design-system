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
