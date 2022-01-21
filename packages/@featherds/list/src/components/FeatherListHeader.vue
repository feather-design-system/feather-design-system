<template>
  <li class="feather-list-header">
    <slot />
  </li>
</template>
<style lang="scss" scoped>
@import "../../scss/variables";
@import "@featherds/styles/mixins/typography";
.feather-list-header {
  list-style: none;
  @include subtitle2();
  color: var($primary-text-on-surface);
  min-height: $feather-list-height;
  padding: 0 1rem;
  margin-top: 0;
  display: flex;
  align-items: center;
}
</style>
