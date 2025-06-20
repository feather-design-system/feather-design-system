<template>
  <FeatherSidenav id="docs-example-sidenav" :items="mainMenu" location="left">
    Test
  </FeatherSidenav>
</template>

<script setup lang="ts">
import { FeatherSidenav } from "@featherds/sidebar";
import { FeatherIcon } from "@featherds/icon";
import { FeatherMenuList } from "@featherds/menu";
import AccountCircle from "@featherds/icon/action/AccountCircle";

import { accountMenu } from "./menus";

const mainMenu = [
  {
    id: "header",
    type: "header",
    title: "Main Menu",
  },
  {
    id: "profile",
    type: "item",
    title: "My Profile",
    icon: AccountCircle as typeof FeatherIcon,
    component: FeatherMenuList,
    componentProps: {
      items: accountMenu,
    },
  },
];
</script>

<style scoped></style>
