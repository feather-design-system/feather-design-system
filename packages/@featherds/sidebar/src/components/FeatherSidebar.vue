<template>
  <FeatherDock
    :id="dockProps.id"
    :pushedSelector="dockProps.pushedSelector"
    :modelValue="dockProps.modelValue"
    :location="dockProps.location"
    :expandedWidth="dockProps.expandedWidth"
    :collapsedWidth="dockProps.collapsedWidth"
    :labels="dockProps.labels"
  >
    <template #docked>
      <FeatherPanelBar
        :id="panelBarProps.id"
        :items="panelBarProps.items"
        :mode="panelBarProps.mode"
        :title="panelBarProps.title"
        :icon="panelBarProps.icon"
        :header="panelBarProps.header"
        :footer="panelBarProps.footer"
      ></FeatherPanelBar>
    </template>
  </FeatherDock>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FeatherDock, DockProps } from "@featherds/dock";
import { SidebarProps } from "../types";
import { FeatherPanelBar, PanelBarProps, Panel } from "@featherds/panel-bar";
const props = defineProps<SidebarProps>();

const dockProps = computed(() => {
  const {
    id,
    pushedSelector,
    modelValue,
    location,
    expandedWidth,
    collapsedWidth,
  } = props;
  return {
    id: id,
    pushedSelector: pushedSelector,
    modelValue: modelValue || false,
    location: location || "left",
    expandedWidth: expandedWidth || "20rem",
    collapsedWidth: collapsedWidth || "4rem",
  } as DockProps;
});

const panelBarProps = computed(() => {
  const { id, items, mode, menuTitle, menuIcon, menuHeader, menuFooter } =
    props;
  return {
    id: `${id}-panel-bar`,
    items: items as Panel[],
    mode: mode || "single",
    title: menuTitle || null,
    icon: menuIcon || null,
    header: menuHeader || false,
    footer: menuFooter || false,
  } as PanelBarProps;
});
</script>

<style scoped></style>
