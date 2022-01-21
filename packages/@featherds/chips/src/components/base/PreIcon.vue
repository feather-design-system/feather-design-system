<template>
  <span class="chip-icon" role="presentation"><slot /></span>
</template>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
.chip-icon {
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 100%;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  background-color: var($border-on-surface);
  :deep(.feather-icon) {
    font-size: 1.125rem;
    height: 1.125rem;
    color: var($secondary-text-on-surface);
  }
}
</style>
