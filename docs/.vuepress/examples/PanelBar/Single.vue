<template>
  <div>
    <FeatherPanelBar
      id="panel-bar-single"
      mode="single"
      header
      title="Single Mode"
      :items="items"
    >
      <template #title>
        <span>Panel Bar</span>
      </template>
    </FeatherPanelBar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FeatherPanelBar, type Panel } from "@featherds/panel-bar";

const items = ref<Panel[]>([
  {
    id: "panel1",
    title: "Panel 1",
    content: "This is the content of panel 1.",
  },
  {
    id: "panel2",
    title: "Panel 2",
    content: "This is the content of panel 2.",
  },
  {
    id: "panel3",
    title: "Panel 3",
    content: "This is the content of panel 3.",
  },
]);

</script>

<style scoped>

</style>
