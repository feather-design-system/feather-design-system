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
        To enable hover mode, set the <code>hoverMode</code> prop to
        <code>true</code> on the <code>&lt;FeatherSidenav&gt;</code> component.
      </p>
      <p>
        The sidenav can also be configured to push content when expanded by
        using the <code>pushedSelector</code> prop. This selector should point
        to the main content area that needs to be adjusted when the sidenav is
        expanded.
      </p>
      <p>
        In this mode, the sidenav will expand when the user hovers over it and
        collapse when the mouse leaves the area. This provides a compact view of
        the navigation while still allowing easy access to menu items.
      </p>
    </div>
    <article>
      <h2>A note about ripple effect</h2>
      <p>
        There is an intentional 150ms delay to allow the menu item click ripple
        effect to animate properly. This ensures that the ripple effect is
        visible and provides a better user experience. See links under "My
        Profile" and "Local Settings" in the demo.
      </p>
      <p>
        However, it is NOT recommended to delay links where href target is set
        to open in a new tab (_blank) because:
      </p>
      <ul>
        <li>
          <strong>Expectation:</strong> Users expect immediate response when
          opening new tabs
        </li>
        <li>
          <strong>Accessibility:</strong> Screen readers and keyboard users
          expect consistent behavior
        </li>
        <li>
          <strong>Popup blockers:</strong> Some browsers might block
          window.open() calls that aren't in direct response to user interaction
        </li>
      </ul>
      <p>
        For <code>target=_blank</code> links, there is no delay. See links under
        "Help Center".
      </p>
      <h5>
        The animation delay is primarily useful for same-page navigation where
        you want the ripple to complete before the page changes. For new tabs,
        the immediate response actually provides better UX.
      </h5>
    </article>
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
    title: "A Main Menu of the Most Ridiculously Verbose Kind",
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
  --feather-dock-content-padding-top: 2em;
  --feather-dock-toggle-top: calc(2em);
}
main {
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 2em;
}
</style>
