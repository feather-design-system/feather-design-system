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
      window.localStorage.setItem(KEY, JSON.stringify(v));
      document.body.classList.remove(ov._text);
      document.body.classList.add(v._text);
      update(v);
    },
  },
  mounted() {
    this.selected =
      JSON.parse(window.localStorage.getItem(KEY)) || this.selected;
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
