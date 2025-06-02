<template>
  <FeatherSidenav
    id="my-sidenav-menu"
    :items="mainMenu"
    pushedSelector="main"
  ></FeatherSidenav>
  <!-- expandedWidth="12rem" -->
  <main>
    <div>
      <h1>Sidenav Menu Demo</h1>
      <p>This is a demo of the Feather Sidenav Menu component.</p>
      <p>
        The sidenav menu is designed to be used in conjunction with the Feather
        Dock component, allowing for a responsive and accessible navigation
        experience.
      </p>
      <p>
        The menu items are defined in the script section and can be customized
        as needed.
      </p>
      <p>
        The sidenav menu supports various item types, including links and
        separators, and can include icons for better visual representation.
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { FeatherSidenav } from "../src";
import { FeatherIcon } from "@featherds/icon";
import { FeatherMenuList } from "@featherds/menu";
import AccountCircle from "@featherds/icon/action/AccountCircle";
import Settings from "@featherds/icon/action/Settings";
import Help from "@featherds/icon/action/Help";
import LogOut from "@featherds/icon/action/LogOut";
import { accountMenu, settingsMenu, helpMenu } from "./menus";

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
</script>

<style lang="scss">
#my-sidenav-menu {
  --feather-dock-content-padding-top: 8em;
  --feather-dock-toggle-top: calc(3em);
}
</style>
