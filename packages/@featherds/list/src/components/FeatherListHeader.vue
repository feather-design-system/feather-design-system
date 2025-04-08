<template>
  <li class="feather-list-header">
    <slot />
  </li>
</template>
<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/mixins/typography" as typo;
@use "../../scss/variables" as list-vars;
.feather-list-header {
  list-style: none;
  @include typo.subtitle2();
  color: var(vars.$primary-text-on-surface);
  min-height: list-vars.$feather-list-height;
  padding: 0 1rem;
  margin-top: 0;
  display: flex;
  align-items: center;
}
</style>
