<template>
  <FeatherSidebar
    id="my-sidebar"
    :items="panels"
    :pushedSelector="pushedSelector"
    menuTitle="My Sidebar"
    mode="single"
  />
  <main class="sidebar-demo-main-content">
    <h2>Main Page Content</h2>
    <h3>Some Notes</h3>
    <ul>
      <li id="projectDetails">
        <s>
          Figure out how to pass props down to children more elegantly than prop
          drilling. (i.e. pushedSelector)
        </s>
      </li>
      <li id="todo">
        <p>
          <i
            >Should we require FeatherPanelBar Panel icons when used inside
            FeatherSidebar?</i
          >
        </p>
        <p>
          Icons are NOT REQUIRED as part of FeatherPanelBar, partly because
          panel summaries are always visible. This is not the case when used
          within FeatherSidebar, where the summaries (a.k.a panel titles) are
          hidden when the sidebar is collapsed. With no icon, there is nothing
          to collapse to...
        </p>
      </li>
    </ul>
    <h3>Config</h3>
    <div class="config">
      <label for="pushedSelector">Pushed Selector: </label>
      <input
        id="pushedSelector"
        type="text"
        placeholder="Enter a selector sidebar push mode"
        v-model="pushedSelector"
        style="width: 25%"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { markRaw, ref } from "vue";
import { FeatherSidebar } from "../src/";
import { Panel } from "@featherds/panel-bar";
import { FeatherMenuList, MenuListEntry } from "@featherds/menu";
import { FeatherIcon } from "@featherds/icon";
import AccountCircle from "@featherds/icon/action/AccountCircle";
import Settings from "@featherds/icon/action/Settings";
import LogOut from "@featherds/icon/action/LogOut";
import Help from "@featherds/icon/action/Help";
import AddNote from "@featherds/icon/action/AddNote";
import Cycle from "@featherds/icon/action/Cycle";
import FolderOpen from "@featherds/icon/file/FolderOpen";
import Add from "@featherds/icon/action/Add";
import Print from "@featherds/icon/action/Print";
import Dashboard from "@featherds/icon/action/Dashboard";
import LineChart from "@featherds/icon/datavis/LineChart";
import Folder from "@featherds/icon/file/Folder";
import Terminal from "@featherds/icon/network/Terminal";

const pushedSelector = ref<string>("main");

// Sample menus for demo
const menu1: MenuListEntry[] = [
  {
    id: "header1",
    type: "header",
    title: "User Actions",
  },
  {
    id: "profile",
    type: "item",
    title: "View Profile",
    icon: AccountCircle as typeof FeatherIcon, // Assuming you have this icon component
    href: "/user/profile",
    target: "_account",
  },
  {
    id: "settings",
    type: "item",
    title: "Settings",
    icon: Settings as typeof FeatherIcon,
    href: "/user/settings",
    target: "_account",
  },
  {
    id: "sep1",
    type: "separator",
  },
  {
    id: "help-link",
    type: "item",
    title: "Help",
    icon: Help as typeof FeatherIcon,
    href: "/help",
    target: "_account",
  },
  {
    id: "help_center",
    type: "item",
    title: "Help Center",
    scrollTarget: "#todo",
  },
  {
    id: "logout",
    type: "item",
    title: "Log Out",
    icon: LogOut as typeof FeatherIcon,
    href: "/auth/logout",
    target: "_account",
  },
];

const menu2: MenuListEntry[] = [
  {
    id: "new",
    type: "item",
    title: "New Document",
    icon: AddNote as typeof FeatherIcon,
    href: "/documents/new",
    target: "_documents",
  },
  {
    id: "open",
    type: "item",
    title: "Open",
    icon: FolderOpen as typeof FeatherIcon,
    href: "/documents/open",
    target: "_documents",
  },
  {
    id: "recent",
    type: "item",
    title: "Recent Documents",
    icon: Cycle as typeof FeatherIcon,
    href: "/documents/recent",
    target: "_documents",
  },
  {
    id: "sep1",
    type: "separator",
  },
  {
    id: "save",
    type: "item",
    title: "Save",
    icon: Add as typeof FeatherIcon,
    disabled: true,
    href: "/documents/save",
    target: "_documents",
  },
  {
    id: "saveAs",
    type: "item",
    title: "Save As...",
    icon: Add as typeof FeatherIcon,
    href: "/documents/save-as",
    target: "_documents",
  },
  {
    id: "sep2",
    type: "separator",
  },
  {
    id: "print",
    type: "item",
    title: "Print",
    icon: Print as typeof FeatherIcon,
    href: "/documents/print",
    target: "_documents",
  },
];

const menu3 = [
  {
    id: "favorites",
    type: "header",
    title: "Favorites",
  },
  {
    id: "item1",
    type: "item",
    title: "Dashboard",
    icon: Dashboard as typeof FeatherIcon,
    selected: true,
    href: "/dashboard",
    target: "_projects",
  },
  {
    id: "item2",
    type: "item",
    title: "Analytics",
    icon: LineChart as typeof FeatherIcon,
    href: "/analytics",
    target: "_projects",
  },
  {
    id: "sep1",
    type: "separator",
  },
  {
    id: "projects",
    type: "header",
    title: "Projects",
  },
  {
    id: "item3",
    type: "item",
    title: "Project Alpha",
    icon: Folder as typeof FeatherIcon,
    href: "/projects/alpha",
    target: "_projects",
  },
  {
    id: "item4",
    type: "item",
    title: "Project Beta",
    icon: Folder as typeof FeatherIcon,
    href: "/projects/beta",
    target: "_projects",
  },
  {
    id: "item5",
    type: "item",
    title: "Project Sidebar",
    scrollTarget: "#projectDetails",
  },
];

const panels: Panel[] = [
  {
    id: "panel-0",
    title: "My Account",
    content: "Contact your system administrator to update your account.",
    icon: AccountCircle as typeof FeatherIcon,
    component: markRaw(FeatherMenuList),
    componentProps: {
      items: menu1,
    },
  },
  {
    id: "panel-1",
    title: "File",
    content: "This is the content of panel 1.",
    icon: Folder as typeof FeatherIcon,
    component: markRaw(FeatherMenuList),
    componentProps: {
      items: menu2,
    },
  },
  {
    id: "panel-2",
    title: "Projects",
    content: "This is the content of panel 2.",
    icon: Dashboard as typeof FeatherIcon,
    component: markRaw(FeatherMenuList),
    componentProps: {
      items: menu3,
    },
  },
  {
    id: "panel-3",
    title: "Panel 3",
    content: "This is the content of panel 3.",
    icon: Terminal as typeof FeatherIcon,
  },
];
</script>

<style scoped>
.sidebar-demo-main-content {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 1rem;
}
</style>
