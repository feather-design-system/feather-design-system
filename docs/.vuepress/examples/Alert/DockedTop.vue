<template>
  <div>
    <FeatherAlertDock :dock="'top'">
      <FeatherAlert
        message="Tip:  Feather Alerts can be docked to draw attention to important events."
        type="success"
        :active="alertActive"
        closeable
        v-on:close="alertActive = false"
      />
    </FeatherAlertDock>
  </div>
  <section>
    <div>
      This example should show a single alert docked at the top of the page.
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FeatherAlert, FeatherAlertDock } from "@featherds/alert";

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
