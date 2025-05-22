<template>
  <h2>FeatherMenuList demo</h2>
  <div class="menu-demo">
    <div class="menu">
      <FeatherMenu
        :open="menu1Open"
        :cover="false"
        :right="true"
        @trigger-click="menu1Open = !menu1Open"
        @outside-click="menu1Open = false"
      >
        <template v-slot:trigger="{ attrs, on }">
          <FeatherButton icon="Menu" primary v-bind="attrs" v-on="on">
            <FeatherIcon :icon="Menu" />
          </FeatherButton>
        </template>
        <FeatherMenuList id="menu-list1" :items="items" />
      </FeatherMenu>
    </div>
    <div class="menu">
      <FeatherMenu
        :open="menu2Open"
        :cover="true"
        @trigger-click="menu2Open = !menu2Open"
        @outside-click="menu2Open = false"
      >
        <template v-slot:trigger="{ attrs, on }">
          <FeatherButton icon="Menu" primary v-bind="attrs" v-on="on">
            <FeatherIcon :icon="Menu" />
          </FeatherButton>
        </template>
        <FeatherMenuList id="menu-list2" :items="menuList2" />
      </FeatherMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FeatherMenu, FeatherMenuList } from "../src/";
import { MenuListEntry } from "../src/components/types";
import { FeatherIcon } from "@featherds/icon";
import { FeatherButton } from "@featherds/button";
import Home from "@featherds/icon/action/Home";
import Settings from "@featherds/icon/action/Settings";
import Info from "@featherds/icon/action/Info";
import Menu from "@featherds/icon/navigation/Menu";

const items: MenuListEntry[] = [
  {
    id: "0",
    type: "header",
    title: "Menu right-aligned",
  },
  {
    id: "1",
    type: "item",
    title: "Home Depot",
    icon: Home as typeof FeatherIcon,
    href: "https://www.homedepot.com/",
    target: "_tab1",
    onClick: () => {
      console.log("Going to Home Depot.");
    },
  },
  {
    id: "4",
    type: "item",
    title: "Feather Information",
    icon: Info as typeof FeatherIcon,
    href: "https://feather.nanthealth.com/Components/",
    target: "_tab1",
    onClick: () => {
      console.log("Looking up Feather Information");
    },
  },
  {
    id: "5",
    type: "item",
    title: "Scroll to page element",
    icon: Info as typeof FeatherIcon,
    scrollTarget: "body",
    onClick: () => {
      console.log("Searching...");
    },
  },
  {
    id: "sep1",
    type: "separator",
  },
  {
    id: "3",
    type: "header",
    title: "Wikipedia",
  },

  {
    id: "2",
    type: "item",
    title: "Configuration",
    icon: Settings as typeof FeatherIcon,
    href: "https://en.wikipedia.org/wiki/Configuration",
    target: "_tab1",
    onClick: () => {
      console.log("Item 2 clicked");
    },
  },
];

const menuList2: MenuListEntry[] = [
  {
    id: "0",
    type: "header",
    title: "Menu in cover mode",
  },
  {
    id: "1",
    type: "item",
    title: "Home Depot",
    icon: Home as typeof FeatherIcon,
    href: "https://www.homedepot.com/",
    target: "_tab1",
    onClick: () => {
      console.log("Item 1 clicked");
    },
  },
  {
    id: "4",
    type: "item",
    title: "Feather Information",
    icon: Info as typeof FeatherIcon,
    href: "https://feather.nanthealth.com/Components/",
    target: "_tab1",
    onClick: () => {
      console.log("Item 3 clicked");
    },
  },
  {
    id: "16",
    type: "item",
    title: "Click me",
    scrollTarget: "body",
    onClick: () => {
      alert("Item 3 clicked");
    },
  },
];

const menu1Open = ref(false);
const menu2Open = ref(false);
</script>

<style scoped>
.menu-demo {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  .menu {
    display: block;
    width: max-content;
    height: auto;
  }
}
</style>
