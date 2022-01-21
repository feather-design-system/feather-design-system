<template>
  <ul class="feather-list">
    <slot />
  </ul>
</template>
<style lang="scss" scoped>
.feather-list {
  margin: 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0;
  overflow-y: auto;
  min-width: 100%;
}
</style>
