<template>
  <FeatherDock
    :id="dockProps.id"
    :pushedSelector="dockProps.pushedSelector"
    :modelValue="dockProps.modelValue"
    :location="dockProps.location"
    :expandedWidth="dockProps.expandedWidth"
    :collapsedWidth="dockProps.collapsedWidth"
    :labels="dockProps.labels"
    class="feather-sidebar"
  >
    <template #docked>
      <FeatherSidenavList :id="menuProps.id" :items="menuProps.items" />
    </template>
  </FeatherDock>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FeatherDock, DockProps } from "@featherds/dock";
import { SidenavProps } from "../types";
import { MenuListEntry } from "@featherds/menu";
import FeatherSidenavList from "./FeatherSidenavList.vue";

const props = defineProps<SidenavProps>();
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
    collapsedWidth: collapsedWidth || "3rem",
  } as DockProps;
});

const menuProps = computed(() => {
  const { id, items } = props;
  return {
    id: `${id}-menu`,
    items: items as MenuListEntry[],
  };
});
</script>

<style>
.feather-sidebar.feather-dock {
  --feather-sidebar-background-color: var(--feather-surface-dark);
  --feather-sidebar-color: var(--feather-state-text-color-on-surface-dark);
  --feather-dock-timing: 0.3s;
  --feather-dock-content-padding-top: 4rem;
  --feather-dock-toggle-top: 0.5rem;

  .feather-dock-toggle {
    outline: 1px solid transparent;
  }
}
</style>

<style lang="scss" scoped>
@use "@featherds/styles/themes/utils" as utils;
.feather-sidebar.feather-dock {
  background-color: var(--feather-sidebar-background-color);
  color: var(--feather-sidebar-color);
}
</style>
