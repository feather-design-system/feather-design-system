<template>
  <FeatherDock
    :id="dockProps.id"
    :rootTag="dockProps.rootTag"
    :ariaLabel="dockProps.rootTag === 'nav' ? 'Navigation' : ''"
    :pushedSelector="dockProps.pushedSelector"
    :modelValue="dockProps.modelValue"
    :location="dockProps.location"
    :expandedWidth="dockProps.expandedWidth"
    :collapsedWidth="dockProps.collapsedWidth"
    :labels="dockProps.labels"
    class="feather-sidenav"
    @update:dock-expanded="onDockExpanded"
    @update:dock-collapsed="onDockCollapsed"
    @update:dock-resized="onDockResized"
  >
    <template #docked>
      <FeatherSidenavList
        :id="menuProps.id"
        :items="menuProps.items"
        :hoverMode="props.hoverMode ?? false"
      />
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
    labels,
  } = props;
  return {
    id: id,
    pushedSelector: pushedSelector,
    modelValue: modelValue || false,
    location: location || "left",
    expandedWidth: expandedWidth || "20rem",
    collapsedWidth: collapsedWidth || "3rem",
    rootTag: "nav",
    labels: labels,
  } as DockProps;
});

// forward typed events to parent so consumers can listen to `update:expanded` / `update:collapsed`
const emit = defineEmits<{
  (e: "update:expanded", id: string): void;
  (e: "update:collapsed", id: string): void;
  (e: "update:resized", payload: { id: string; width: number }): void;
}>();

const menuProps = computed(() => {
  const { id, items } = props;
  return {
    id: `${id}-menu`,
    items: items as MenuListEntry[],
  };
});

const onDockExpanded = () => {
  emit("update:expanded", dockProps.value.id);
};

const onDockCollapsed = () => {
  emit("update:collapsed", dockProps.value.id);
};
const onDockResized = (width: number) => {
  emit("update:resized", { id: dockProps.value.id, width });
};
</script>

<style lang="scss">
@use "@featherds/styles/themes/utils" as utils;
.feather-sidenav.feather-dock {
  --feather-dock-background-color: var(--feather-surface-dark);
  --feather-dock-color: var(--feather-state-text-color-on-surface-dark);
  --feather-dock-timing: 0.3s;
  --feather-dock-content-padding-top: 4rem;
  --feather-dock-toggle-top: 0.5rem;

  & > .feather-dock-toggle {
    @include utils.state-on-surface-dark();
    background-color: var(--feather-dock-background-color);
    color: var(--feather-dock-color);
    //   outline: 1px solid transparent;
  }
}
</style>

<style lang="scss" scoped>
@use "@featherds/styles/themes/utils" as utils;
.feather-sidenav.feather-dock {
  background-color: var(--feather-dock-background-color);
  color: var(--feather-dock-color);
  .feather-dock-toggle {
    background-color: var(--feather-dock-background-color);
    color: var(--feather-dock-color);
    outline: 1px solid transparent;
  }
  // keep icons from smushing when dock is collapsed
  &.dock-closed {
    overflow-y: scroll;
    overscroll-behavior: contain;
    :deep(.feather-dock-content) {
      height: auto;
      width: auto;
    }
  }
}
</style>
