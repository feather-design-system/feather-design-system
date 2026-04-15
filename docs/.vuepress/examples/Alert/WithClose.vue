<template>
  <div>
    <FeatherAlert
      type="warning"
      message="Unable to connect to the server."
      :active="alertActive"
      closeable
      v-on:close="alertActive = false"
    >
    </FeatherAlert>
    <section>
      <div>
        The closeable attribute is optional. It provides the ability to close
        the alert
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FeatherAlert } from "@featherds/alert";

const alertActive = ref(true);
</script>

<style scoped></style>
