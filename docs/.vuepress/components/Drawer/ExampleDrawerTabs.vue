<template>
  <div>
    <DrawerTabContainer>
      <template v-slot:tabs>
        <DrawerTab label="My Account">
          <FeatherIcon :icon="account" class="icon" />
        </DrawerTab>
        <DrawerTab label="Notifications">
          <FeatherIcon :icon="alerts" class="icon" />
        </DrawerTab>
        <DrawerTabSeparator></DrawerTabSeparator>
        <DrawerTab label="Settings">
          <FeatherIcon :icon="settings" class="icon" />
        </DrawerTab>
        <DrawerTab label="Help">
          <FeatherIcon :icon="help" class="icon" />
        </DrawerTab>
      </template>
      <DrawerTabContent class="first">
        <template v-slot:header>
          <span>My Account</span>
        </template>
        <FeatherList>
          <FeatherListItem
            href="#"
            tab-index="0"
            title="Mange Profile"
            role="menuitem"
          >
            Manage Profile
          </FeatherListItem>
          <FeatherListItem
            href="#"
            tab-index="0"
            title="Set Notification Preferences"
            role="menuitem"
          >
            Set Notification Preferences
          </FeatherListItem>
          <FeatherListItem
            href="#"
            tab-index="0"
            title="Set Timeout Durations"
            role="menuitem"
          >
            Set Timeout Durations
          </FeatherListItem>
        </FeatherList>
      </DrawerTabContent>
      <DrawerTabContent :header="header">
        Content 2 (Notifications)
      </DrawerTabContent>
      <DrawerTabContent header="Settings">
        Content 3 (Settings)
      </DrawerTabContent>
      <DrawerTabContent header="Help"> Content 4 (Help) </DrawerTabContent>
    </DrawerTabContainer>
  </div>
</template>
<script>
import * as components from "@featherds/drawer";
import { FeatherIcon } from "@featherds/icon";
import AccountCircle from "@featherds/icon/actions/AccountCircle";
import Notifications from "@featherds/icon/notifications/Notifications";
import Settings from "@featherds/icon/actions/Settings";
import Support from "@featherds/icon/actions/Help";
import Lock from "@featherds/icon/actions/Lock";
import * as listComponents from "@featherds/list";
import { markRaw } from "vue";

export default {
  components: {
    ...components,
    ...listComponents,
    FeatherIcon,
  },
  data: () => ({
    header: "Notifications",
    message: "On",
    account: markRaw(AccountCircle),
    alerts: markRaw(Notifications),
    settings: markRaw(Settings),
    help: markRaw(Support),
    support: markRaw(Support),
    timeout: markRaw(Timelapse),
    padlock: markRaw(Lock),
    key: markRaw(VpnKey),
    close: markRaw(ExitToApp),
  }),
};
</script>
<style>
.fixed-width {
  width: 400px;
}
.drawer-tab-container {
  min-height: 200px;
}
</style>
