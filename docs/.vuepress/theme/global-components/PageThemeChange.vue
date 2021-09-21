<template>
  <FeatherSelect
    background
    label="Theme"
    v-model="selected"
    :options="themes"
    class="theme-select"
  />
</template>
<script>
import { FeatherSelect } from "@featherds/select";
import { THEMES, KEY, update } from "./themes";
export default {
  data() {
    return {
      selected: THEMES[0],
      themes: THEMES,
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
    if(!targetTheme) this.updateTheme(this.selected, this.selected);
  },
  methods: {
    updateTheme(curr, old) {
      window.localStorage.setItem(KEY, JSON.stringify(curr));
      document.body.classList.remove(old._text);
      document.body.classList.add(curr._text);
      update(curr);
    }
  },
  components: {
    FeatherSelect,
  },
};
</script>
<style lang="scss" scoped>
@import "~@featherds/styles/mixins/typography";
.hidden-label {
  @include screen-reader();
}
.theme-select {
  width: 160px;
  display: inline-block;
  :deep(.feather-input-wrapper-container) {
    margin-top: 0;
  }
  :deep(.feather-input-wrapper-container) {
    --feather-primary: var(--feather-surface);
    --feather-primary-text-on-surface: var(--feather-surface);
    --feather-secondary-text-on-surface: var(--feather-secondary-text-on-color);
  }
  :deep(label) {
    display: none;
  }
}
</style>
