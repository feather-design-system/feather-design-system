<template>
  <div class="feather-styles">
    <slot />
    <theme-changer />
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
body {
  background-color: var($background);
  margin: 0;
}
</style>
