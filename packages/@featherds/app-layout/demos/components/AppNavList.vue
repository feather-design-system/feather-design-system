<template>
  <div class="nav-list-container">
    <div class="nav-list">
      <div class="fake-header">TEST</div>
      <FeatherList>
        <FeatherListHeader>Group A</FeatherListHeader>
        <FeatherListItem href="#">Item 1</FeatherListItem>
        <FeatherListItem href="#">Item 2</FeatherListItem>
        <FeatherListSeparator />
        <FeatherListHeader>Group B</FeatherListHeader>
        <FeatherListItem href="#">Item 2</FeatherListItem>
      </FeatherList>
    </div>
  </div>
</template>
<script>
import {
  FeatherList,
  FeatherListHeader,
  FeatherListSeparator,
  FeatherListItem,
} from "@featherds/list";
import { inject } from "vue";

export default {
  setup() {
    const register = inject("feather-app-layout-expanded", false);
    if (register) {
      register();
    }
  },
  components: {
    FeatherList,
    FeatherListHeader,
    FeatherListSeparator,
    FeatherListItem,
  },
};
</script>
<style lang="scss" scoped>
@import "~@featherds/styles/themes/variables";
@import "~@featherds/styles/mixins/elevation";
$width: 264px;
.fake-header {
  height: var($header-height);
}
.nav-list-container {
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
}
</style>
