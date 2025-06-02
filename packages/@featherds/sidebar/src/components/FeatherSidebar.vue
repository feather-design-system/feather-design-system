<template>
  <FeatherDock
    :id="dockProps.id"
    class="feather-sidebar"
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

<style lang="scss">
@use "@featherds/styles/themes/utils" as utils;
.feather-sidebar.feather-dock {
  --feather-sidebar-background-color: var(--feather-surface-dark);
  --feather-sidebar-color: var(--feather-state-text-color-on-surface-dark);
  & > .feather-dock-toggle {
    background-color: var(--feather-sidebar-background-color);
    color: var(--feather-sidebar-color);
  }
  & > .feather-dock-content {
    & > .feather-panel-bar.docked {
      & > .feather-panel-bar-header {
        color: var(--feather-sidebar-color);
      }
      & > .feather-panel-bar-details {
        @include utils.state-on-surface-dark();
        & > .feather-panel-bar-summary {
          @include utils.state-on-surface-dark();
          color: var(--feather-sidebar-color);
          &:focus-visible {
            outline: 2px solid transparent;
            border: 2px solid var(--feather-sidebar-color);
            border-radius: 0.25rem;
          }
        }
        & > .feather-panel-bar-content {
          & > .feather-list {
            & > .feather-list-header {
              color: var(--feather-sidebar-color);
            }
            > li > .feather-list-item {
              @include utils.state-on-surface-dark();
              border-radius: 0.25rem;
              &:focus,
              &:focus-visible {
                box-shadow: inset 0 0 0 1px var(--feather-sidebar-color);
              }
            }
            > .feather-list-item {
              > .feather-list-item-text {
                hr {
                  color: var(--feather-disabled-text-on-surface);
                  height: 2px;
                  border: transparent;
                }
              }
            }
            > button {
              @include utils.state-on-surface-dark();
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.feather-dock {
  background-color: var(--feather-sidebar-background-color);
  color: var(--feather-sidebar-color);
}
</style>
