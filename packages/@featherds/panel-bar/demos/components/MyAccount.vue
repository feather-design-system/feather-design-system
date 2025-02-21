<template>
  <div>
    <FeatherInput id="name" label="Name" modelValue="Marie Curie" />
    <FeatherInput
      id="email"
      label="Email Address"
      modelValue="mcurie@gmail.com"
    />
    <FeatherCheckbox id="notifications" v-model="notifications">
      Send notifications?
    </FeatherCheckbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FeatherInput } from "@featherds/input";
import { FeatherCheckbox } from "@featherds/checkbox";

const notifications = ref(false);
</script>

<style scoped></style>
