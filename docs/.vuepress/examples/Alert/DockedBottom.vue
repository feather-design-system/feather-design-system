<template>
  <div>
    <FeatherAlertDock :dock="'bottom'">
      <FeatherAlert
        message="This is a simple alert message."
        type="info"
        :active="alertActive"
        closeable
        v-on:close="alertActive = false"
      />
      <FeatherAlert
        message="Uh oh."
        type="error"
        :active="alertActive2"
        closeable
        v-on:close="alertActive2 = false"
      >
        <template #actions>
          <FeatherButton text @click="alertActive2 = false">Call for Help!</FeatherButton>
        </template>
      </FeatherAlert>
    </FeatherAlertDock>
    <section>
      <div>
        This example should show 2 alerts docked at the bottom of the page.
        Multiple alerts can be docked at the same time and are stacked in order
        of creation.
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FeatherAlert, FeatherAlertDock } from "@featherds/alert";

const alertActive = ref(true);
const alertActive2 = ref(true);
</script>

<style scoped>
</style>
