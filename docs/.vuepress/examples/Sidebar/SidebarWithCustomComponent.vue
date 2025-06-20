<template>
  <FeatherSidebar id="my-sidebar" :items="panels" />
</template>

<script setup lang="ts">
import { markRaw } from "vue";
import { FeatherSidebar } from "@featherds/sidebar";
import { FeatherIcon } from "@featherds/icon";
import { FeatherMenuList } from "@featherds/menu";
import Person from "@featherds/icon/action/Person";
import { Panel } from "@featherds/panel-bar";
import Error from "@featherds/icon/notification/Error";

import { accountMenu } from "./menus";

import MyCustomComponent from "./MyCustomComponent.vue";

const panels: Panel[] = [
  {
    id: "my-panel",
    title: "High Priority Incident",
    content: "This is content at the panel level",
    icon: Error as typeof FeatherIcon,
    component: markRaw(MyCustomComponent),
    componentProps: {
      cardHeader: "BOSWB012 is down.",
      cardSubheader: "Incident ID: 6066-65995",
      cardContent:
        "Please contact your system administrator. (component level)",
    },
  },
  {
    id: "my-account-menu",
    title: "My Profile",
    content: "Your security officer is Dwight Schrute.",
    icon: Person as typeof FeatherIcon,
    component: markRaw(FeatherMenuList),
    componentProps: {
      items: accountMenu,
    },
  },
];
</script>

<style scoped></style>
