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
@use "@featherds/styles/themes/variables" as vars;
html,
body {
  height: 100vh;
}
html,
body,
#app,
.feather-styles {
  min-height: 100%;
}
body {
  background-color: var(vars.$background);
  margin: 0;
}
</style>
