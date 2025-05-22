<template>
  <FeatherSidebar
    id="my-sidebar"
    :items="items"
    location="right"
    :pushedSelector="['.title-container', '.feather-container']"
  />
  <div :style="{ 'font-size': '2em', 'text-align': 'center' }">
    Demo <FeatherIcon :icon="ArrowBack" :style="{ rotate: '180deg' }" />
  </div>
</template>

<script setup lang="ts">
import { markRaw } from "vue";
import { FeatherSidebar } from "@featherds/sidebar";
import { FeatherMenuList } from "@featherds/menu";
import { FeatherIcon } from "@featherds/icon";
import ArrowBack from "@featherds/icon/navigation/ArrowBack";
import Documentation from "@featherds/icon/communication/Documentation";

import AccountCircle from "@featherds/icon/action/AccountCircle";
import { accountMenu, docsMenu } from "./menus";

const items = [
  {
    id: "my-sidebar-docs",
    title: "Widget Docs",
    icon: Documentation as typeof FeatherIcon,
    component: markRaw(FeatherMenuList),
    componentProps: {
      items: docsMenu,
    },
  },
  {
    id: "my-sidebar",
    title: "My Profile",
    content: "Your security officer is Dwight Schrute.",
    icon: AccountCircle as typeof FeatherIcon,
    component: markRaw(FeatherMenuList),
    componentProps: {
      items: accountMenu,
    },
  },
];
</script>

<style scoped></style>
