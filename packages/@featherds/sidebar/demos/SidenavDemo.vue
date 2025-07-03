<template>
  <FeatherSidenav
    :id="sideNavId"
    :items="mainMenu"
    expandedWidth="10rem"
    pushedSelector="main"
    :modelValue="sideNavExpanded"
    @update:collapsed="handleCollapsed"
    @update:expanded="handleExpanded"
  ></FeatherSidenav>
  <main>
    <div>
      <h1>Sidenav Demo</h1>
      <p>This is a demo of the Feather Sidenav component.</p>
      <p>
        The sidenav is designed to be used in conjunction with the Feather Dock
        component, allowing for a responsive and accessible navigation
        experience.
      </p>
      <p>
        The menu items are defined in the script section and can be customized
        as needed.
      </p>
      <p>
        The sidenav supports various item types, including links and separators,
        and can include icons for better visual representation.
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { FeatherSidenav } from "../src";
import { FeatherIcon } from "@featherds/icon";
import { FeatherMenuList } from "@featherds/menu";
import AccountCircle from "@featherds/icon/action/AccountCircle";
import Settings from "@featherds/icon/action/Settings";
import Help from "@featherds/icon/action/Help";
import LogOut from "@featherds/icon/action/LogOut";
import { accountMenu, settingsMenu, helpMenu } from "./menus";
import { useLocalStorage } from "@featherds/composables/browser/useLocalStorage";

const sideNavId = "my-sidenav-menu";
const sideNavExpanded = ref(false); // default; will be overridden by local storage value

const sideNavExpandedKey = computed(() => `my-app_${sideNavId}:isExpanded`);

// use the shared composable to keep a storage-backed ref in sync (stores sidenav open state)
useLocalStorage<boolean>(sideNavExpandedKey.value, sideNavExpanded, {
  debounce: 200,
});

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
  {
    id: "sep0",
    type: "separator",
  },
  {
    id: "settings",
    type: "item",
    title: "Settings",
    icon: Settings as typeof FeatherIcon,
    component: FeatherMenuList,
    componentProps: {
      items: settingsMenu,
    },
  },
  {
    id: "help-link",
    type: "item",
    title: "Help",
    icon: Help as typeof FeatherIcon,
    component: FeatherMenuList,
    componentProps: {
      items: helpMenu,
    },
  },
  {
    id: "sep-logout",
    type: "separator",
  },
  {
    id: "logout",
    type: "item",
    title: "Log out",
    href: "http://localhost:3000/logout",
    target: "_blank",
    icon: LogOut as typeof FeatherIcon,
  },
];

const handleCollapsed = (id: string): void => {
  console.log("Sidenav collapsed", id);
  sideNavExpanded.value = false;
};

const handleExpanded = (id: string): void => {
  console.log("Sidenav expanded", id);
  sideNavExpanded.value = true;
};

onMounted(() => {
  console.log("SidenavDemo mounted, sideNavId:", sideNavId);
});
</script>

<style lang="scss">
#my-sidenav-menu {
  --feather-dock-content-padding-top: 8em;
  --feather-dock-toggle-top: calc(3em);
}
</style>
