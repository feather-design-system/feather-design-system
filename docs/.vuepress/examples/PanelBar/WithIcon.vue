<template>
  <div>
    <FeatherPanelBar
      id="panel-bar-single"
      mode="single"
      header
      :title="showPanelBarTitle ? 'My Account' : ''"
      :items="computedItems"
    >
      <template #title>
        <span>Panel Bar</span>
      </template>
    </FeatherPanelBar>
  </div>
</template>

<script setup lang="ts">
import { computed, markRaw, provide, ref } from "vue";
import { FeatherPanelBar, type Panel } from "@featherds/panel-bar";
import LocalSettings from "./Settings.vue";
import { FeatherIcon } from "@featherds/icon";
import AccountCircle from "@featherds/icon/action/AccountCircle";
import Help from "@featherds/icon/action/Help";
import Settings from "@featherds/icon/action/Settings";

const showPanelBarTitle = ref(true);
const iconOnly = ref(false);
provide("showPanelBarTitle", showPanelBarTitle);
provide("iconOnly", iconOnly);

const items = ref<Panel[]>([
  {
    id: "user-profile",
    title: "User Profile",
    icon: AccountCircle as typeof FeatherIcon,
    content: "This is the content of panel 1.",
  },
  {
    id: "help",
    title: "Help",
    icon: Help as typeof FeatherIcon,
    content: "This is the content of panel 2.",
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings as typeof FeatherIcon,
    content:
      `Use these settings to control behavior.
      This is a contrived example from a Vue component.
      It also shows how to use both content and component
      Panel attributes in the same panel.`,
    component: markRaw(LocalSettings),
  },
]);

const computedItems = computed(() => {
  return items.value.map((item) => {
    return {
      ...item,
      title: iconOnly.value ? "" : item.title,
    };
  });
});
</script>

<style scoped></style>
