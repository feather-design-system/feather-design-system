<template>
  <FeatherSidenav
    id="my-sidenav-hover-mode-menu"
    :items="mainMenu"
    pushedSelector="main"
    :hoverMode="true"
  ></FeatherSidenav>
  <main>
    <div>
      <h1>Sidenav Hover mode</h1>
      <p>
        This is a demo of the Feather Sidenav component in
        <strong>Hover mode</strong>.
      </p>
      <p>
        This mode allows for a more dynamic interaction, where the sidenav items
        can expand and collapse based on user actions.
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
#my-sidenav-hover-mode-menu {
  --feather-dock-content-padding-top: 5em;
  --feather-dock-toggle-top: calc(2em);
}
</style>
