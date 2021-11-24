<template>
  <FeatherButton
    class="toggle"
    @click.prevent="toggleTheme"
    href="#"
    icon="Toggle theme"
    on-color
  >
    <FeatherIcon :title="selected._text" :icon="icon" />
  </FeatherButton>
</template>
<script>
import { FeatherIcon } from "@featherds/icon";
import { FeatherButton } from "@featherds/button";
import { THEMES, KEY, update } from "./themes";
import actionsVisibility from "@featherds/icon/action/LightDarkMode";
import actionsVisibilityOff from "@featherds/icon/action/LightDarkMode";

export default {
  data() {
    return {
      selected: THEMES[1],
      themes: THEMES,
      light: actionsVisibility,
      dark: actionsVisibilityOff,
    };
  },
  watch: {
    selected(v, ov) {
      this.updateTheme(v, ov);
    },
  },
  mounted() {
    const targetTheme = JSON.parse(window.localStorage.getItem(KEY));
    const currSelected = this.selected;
    this.selected = targetTheme || currSelected;
    //edge case, if there is no localstorage, the watch doesn't fire (the values haven't changed)
    //so we need to manually force the initial theme render
    if (!targetTheme) this.updateTheme(this.selected, this.selected);
  },
  methods: {
    updateTheme(curr, old) {
      window.localStorage.setItem(KEY, JSON.stringify(curr));
      document.body.classList.remove(old._text);
      document.body.classList.add(curr._text);
      update(curr);
    },
    toggleTheme() {
      const currIndex = this.themes
        .map((e) => e._text)
        .indexOf(this.selected._text);
      const newIndex = currIndex === this.themes.length - 1 ? 0 : currIndex + 1;
      this.selected = this.themes[newIndex];
    },
  },
  computed: {
    icon() {
      return this.selected && this.selected._text.includes("dark")
        ? this.dark
        : this.light;
    },
  },
  components: {
    FeatherIcon,
    FeatherButton,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";
.toggle {
  color: var($primary-text-on-color);
}
</style>
