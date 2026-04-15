<template>
  <div>
    <FeatherAlert
      message="This is a simple alert info message."
      type="info"
      :active="alertActive"
    />
    <section class="alert-demo-content">
      <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam in eum quibusdam velit deserunt. Sint optio, molestiae aliquid accusantium est quibusdam, ipsum iure ab minus deleniti consequuntur! Temporibus, deserunt corrupti.</div>
      <div>Quisquam, cumque. Quod, voluptatibus. Quisquam, cumque. Quod, voluptatibus. Quisquam, cumque. Quod, voluptatibus.</div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FeatherAlert } from '@featherds/alert';

const alertActive = ref(true);

</script>

<style scoped>
.alert-demo-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: 1rem;
}
</style>
