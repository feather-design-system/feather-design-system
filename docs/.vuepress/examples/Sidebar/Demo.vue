<template>
  <FeatherSidebar id="my-sidebar" :items="items" :pushedSelector="['.app-layout', '.nav-list']" />
  <div :style="{ 'font-size': '2em', 'text-align': 'center' }">
    <FeatherIcon :icon="ArrowBack" /> Demo
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FeatherSidebar } from "@featherds/sidebar";
import { FeatherIcon } from "@featherds/icon";
import ArrowBack from "@featherds/icon/navigation/ArrowBack";
import Menu from "@featherds/icon/navigation/Menu";
import type { Panel } from "@featherds/panel-bar";

const items = computed((): Panel[] => {
  return [
    {
      id: "my-sidebar",
      title: "My Sidebar",
      content: "Some content",
      icon: Menu as typeof FeatherIcon,
    },
  ];
});
</script>

<style scoped></style>
