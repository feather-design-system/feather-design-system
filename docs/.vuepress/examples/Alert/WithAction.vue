<template>
  <div>
    <FeatherAlert
      message="Your payment is past due."
      type="error"
      :active="alertActive"
      class="alert-demo-content"
    >
      <template #actions>
        <FeatherButton text @click="alertActive = false">Pay now</FeatherButton>
        <FeatherButton text @click="alertActive = false">dismiss</FeatherButton>
      </template>
    </FeatherAlert>
    <section>
      <div>The actions slot can be used to provide one or more buttons within the alert. </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FeatherAlert } from "@featherds/alert";
import { FeatherButton } from "@featherds/button";

const alertActive = ref(true);
</script>

<style scoped>
</style>
