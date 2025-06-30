<template>
  <div>
    <FeatherAlert
      message="This is a simple alert message."
      type="info"
      :active="alertActive"
    />
    <FeatherAlert
      message="This is a simple alert messsage (with banner)."
      type="info"
      :active="alertActive"
      banner
    />
    <section class="alert-demo-content">
      <div>The banner tag sets border-radius to 0.  It is an option on Feather Alert and is exerted on all alerts that are docked.</div>
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
