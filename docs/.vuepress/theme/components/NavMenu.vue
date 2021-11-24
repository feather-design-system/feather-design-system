<template>
  <div class="nav-list-container">
    <div class="nav-list">
      <div class="fake-header"><a href="/">FEATHER DS</a></div>
      <FeatherList class="nav-links">
        <slot />
      </FeatherList>
    </div>
  </div>
</template>
<script>
import { inject } from "vue";
import { FeatherList } from "@featherds/list";
export default {
  setup() {
    const register = inject("feather-app-layout-expanded", false);
    if (register) {
      register();
    }
  },
  components: {
    FeatherList,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/mixins/typography";
$width: 264px;
.fake-header {
  display: flex;
  align-items: center;
  height: var($header-height);
  padding-left: 16px;
  flex: none;
  border-bottom: 1px solid var($border-on-surface);
  a {
    @include headline4;
    color: var($primary-text-on-surface);
    &:hover,
    &:visited,
    &:active {
      color: var($primary-text-on-surface);
    }
  }
}
.nav-list-container {
  display: flex;
  width: $width;
}

.nav-list {
  height: calc(100vh);
  background: var($background);
  color: var($primary-text-on-surface);
  @include elevation(2);
  position: fixed;
  width: $width;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  .nav-links {
    overflow-y: auto;
    flex: 1;
    :deep(.feather-list-item-text) {
      @include body-large;
    }
    :deep(.feather-list-item) {
      height: 48px !important;
    }
  }
}
</style>
