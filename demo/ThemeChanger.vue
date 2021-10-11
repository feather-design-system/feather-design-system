<template>
  <div class="theme-container">
    <select
      name="theme-changer"
      id="theme-changer"
      v-model="selected"
      aria-label="Theme changer"
    >
      <option v-for="theme in themes" :value="theme" :key="theme">
        {{ theme }}
      </option>
    </select>
  </div>
</template>
<script>
const THEMES = ["light", "dark"];
export default {
  data() {
    return { selected: THEMES[0], themes: THEMES };
  },

  watch: {
    selected: {
      immediate: true,
      handler(v) {
        this.themes.forEach((t) => document.body.classList.remove(t));
        document.body.classList.add(v);
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.theme-container {
  text-align: right;
  padding-bottom: 20px;
}
</style>
<style lang="scss">
@import "@featherds/styles/themes/open-mixins";

.light {
  @include open-light();
}
.dark {
  @include open-dark();
}
</style>
