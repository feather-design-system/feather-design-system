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
<script lang="ts">
import {
  FeatherList,
  FeatherListHeader,
  FeatherListSeparator,
  FeatherListItem,
} from "@featherds/list";
import { defineComponent, inject } from "vue";

export default defineComponent({
  setup() {
    const register = inject("feather-app-layout-expanded", () => {});
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
});
</script>
<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/mixins/elevation" as elev;

$width: 16.5rem;
.fake-header {
  height: var(vars.$header-height);
}
.nav-list-container {
  width: $width;
}
.nav-list {
  height: calc(100vh);
  background: var(vars.$background);
  color: var(vars.$primary-text-on-surface);
  @include elev.elevation(2);
  position: fixed;
  width: $width;
  top: 0;
  left: 0;
}
</style>
