<template>
  <div>
    <div>
      <button
        id="button"
        @click="visible = true"
        :aria-expanded="visible ? 'true' : 'false'"
      >
        Open Drawer
      </button>
      <p>Drawer Is Open: {{ visible }}</p>
    </div>

    <FeatherDrawer
      id="drawer"
      v-model="visible"
      :labels="{ close: 'close', title: 'Account settings' }"
    >
      <DrawerTabContainer
        ><template v-slot:tabs>
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
            <FeatherListItem href="#" tab-index="0" title="Mange Profile">
              Manage Profile
            </FeatherListItem>
            <FeatherListItem
              href="#"
              tab-index="0"
              title="Set Notification Preferences"
            >
              Set Notification Preferences
            </FeatherListItem>
            <FeatherListItem
              href="#"
              tab-index="0"
              title="Set Timeout Durations"
            >
              Set Timeout Durations
            </FeatherListItem>
          </FeatherList>
          <FeatherList>
            <FeatherListHeader>My Account</FeatherListHeader>
            <FeatherListItem href="#" tab-index="0" title="Profile">
              <template v-slot:icon
                ><FeatherIcon :icon="account" class="icon" /></template
              >Profile</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Sign Out">
              <template v-slot:icon
                ><FeatherIcon :icon="close" class="icon" /></template
              >Sign Out</FeatherListItem
            >
          </FeatherList>
          <FeatherList>
            <FeatherListHeader>Security</FeatherListHeader>
            <FeatherListItem href="#" tab-index="0" title="Change Password">
              <template v-slot:icon
                ><FeatherIcon :icon="padlock" class="icon" /></template
              >Change Password</FeatherListItem
            >
            <FeatherListItem
              href="#"
              tab-index="0"
              title="Change Security Questions"
            >
              <template v-slot:icon
                ><FeatherIcon :icon="key" class="icon" /></template
              >Change Security Questions</FeatherListItem
            >
          </FeatherList>
        </DrawerTabContent>
        <DrawerTabContent :header="header">
          <FeatherList>
            <FeatherListHeader>Menu Group 2</FeatherListHeader>
            <FeatherListItem href="#" tab-index="0" title="Menu item 9"
              >Menu item 9</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 10"
              >Menu item 10</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 11"
              >Menu item 11</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 12"
              >Menu item 12</FeatherListItem
            >
          </FeatherList>
          <FeatherList>
            <FeatherListHeader>Menu Group 3</FeatherListHeader>
            <FeatherListItem href="#" tab-index="0" title="Menu item 13"
              >Menu item 13</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 14"
              >Menu item 14</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 15"
              >Menu item 15</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 16"
              >Menu item 16</FeatherListItem
            >
          </FeatherList>
        </DrawerTabContent>
        <DrawerTabContent header="Settings">
          <FeatherList>
            <FeatherListHeader>Menu Group 4</FeatherListHeader>
            <FeatherListItem href="#" tab-index="0" title="Menu item 17"
              >Menu item 17</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 18"
              >Menu item 18</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 19"
              >Menu item 19</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 20"
              >Menu item 20</FeatherListItem
            >
          </FeatherList>
          <FeatherList>
            <FeatherListHeader>Menu Group 5</FeatherListHeader>
            <FeatherListItem href="#" tab-index="0" title="Menu item 21"
              >Menu item 21</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 22"
              >Menu item 22</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 23"
              >Menu item 23</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 24"
              >Menu item 24</FeatherListItem
            >
          </FeatherList>
        </DrawerTabContent>
        <DrawerTabContent header="Help">
          <FeatherList>
            <FeatherListHeader>Menu Group 6</FeatherListHeader>
            <FeatherListItem href="#" tab-index="0" title="Menu item 25"
              >Menu item 25</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 26"
              >Menu item 26</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 27"
              >Menu item 27</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 28"
              >Menu item 28</FeatherListItem
            >
          </FeatherList>
          <FeatherList>
            <FeatherListHeader>Menu Group 7</FeatherListHeader>
            <FeatherListItem href="#" tab-index="0" title="Menu item 29"
              >Menu item 29</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 30"
              >Menu item 30</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 31"
              >Menu item 31</FeatherListItem
            >
            <FeatherListItem href="#" tab-index="0" title="Menu item 32"
              >Menu item 32</FeatherListItem
            >
          </FeatherList>
        </DrawerTabContent>
      </DrawerTabContainer>
    </FeatherDrawer>
  </div>
</template>
<script>
import * as components from "@featherds/drawer";
import { FeatherIcon } from "@featherds/icon";
import AccountCircle from "@featherds/icon/action/AccountCircle";
import Notifications from "@featherds/icon/action/Notifications";
import Settings from "@featherds/icon/action/Settings";
import Support from "@featherds/icon/action/Help";
import Lock from "@featherds/icon/action/Lock";
import ExitToApp from "@featherds/icon/action/ExitToApp";
import * as listComponents from "@featherds/list";

export default {
  components: {
    ...components,
    ...listComponents,
    FeatherIcon,
  },
  data: () => ({
    visible: false,
    header: "Notifications",
    message: "On",
    account: AccountCircle,
    alerts: Notifications,
    settings: Settings,
    help: Support,
    support: Support,
    padlock: Lock,
    close: ExitToApp,
  }),
};
</script>
<style>
.fixed-width {
  width: 400px;
}
</style>
