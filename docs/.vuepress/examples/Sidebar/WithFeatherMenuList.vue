<template>
  <FeatherSidebar
    id="my-sidebar"
    :items="panels"
    pushedSelector=".app-layout"
    menuTitle="My Sidebar"
    menuHeader
    menuFooter
    />
</template>

<script setup lang="ts">
import { markRaw } from "vue";
import { FeatherSidebar } from "@featherds/sidebar";
import { FeatherMenuList } from "@featherds/menu";
import { FeatherIcon } from "@featherds/icon";
import type { Panel } from "@featherds/panel-bar";
import Person from "@featherds/icon/action/Person";
import Documentation from "@featherds/icon/communication/Documentation";

import { accountMenu, featherdocsMenu } from "./menus";

const panels: Panel[] = [
  {
    id: "my-panels",
    title: "My Account",
    content: "Your security officer is John Wick.",
    icon: Person as typeof FeatherIcon,
    component: markRaw(FeatherMenuList),
    componentProps: {
      items: accountMenu

    },
  },
  {
    id: "docs-panels",
    title: "Docs",
    content: "Documentation for ACME Widget.",
    icon: Documentation as typeof FeatherIcon,
    component: markRaw(FeatherMenuList),
    componentProps: {
      items: featherdocsMenu.value,
    },
  },
];

</script>

<style scoped>

</style>
