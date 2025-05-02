<template>
  <span class="chip-icon" role="presentation"><slot /></span>
</template>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
.chip-icon {
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 100%;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  background-color: var(vars.$border-on-surface);
  :deep(.feather-icon) {
    font-size: 1.125rem;
    height: 1.125rem;
    color: var(vars.$secondary-text-on-surface);
  }
}
</style>
