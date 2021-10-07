<template>
  <ul class="feather-list">
    <slot />
  </ul>
</template>
<style lang="scss" scoped>
.feather-list {
  margin: 0;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 0;
  overflow-y: auto;
  min-width: 100%;
}
</style>
