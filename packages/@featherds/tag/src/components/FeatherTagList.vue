<template>
  <div class="feather-tag-list">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.feather-tag-list {
  margin-bottom: 1rem;
  padding-block: 0.25rem;
  padding-right: 0.25rem;
  transition: all 0.3s ease-out;
}
</style>
