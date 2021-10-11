<template>
  <span class="chip-icon" role="presentation"><slot /></span>
</template>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
.chip-icon {
  height: 24px;
  width: 24px;
  border-radius: 100%;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  background-color: var($border-on-surface);
  :deep(.feather-icon) {
    font-size: 18px;
    height: 18px;
    color: var($secondary-text-on-surface);
  }
}
</style>
