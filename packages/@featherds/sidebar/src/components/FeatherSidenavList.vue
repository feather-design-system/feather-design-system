<template>
  <FeatherList :class="listClasses" :id="props.id">
    <template v-for="item in processedItems" :key="item.id">
      <FeatherPopover
        v-if="canShowPopover(item)"
        :pointerAlignment="PointerAlignment.left"
        :placement="PopoverPlacement.left"
      >
        <template v-slot:trigger="{ attrs, on }">
          <!-- Level 1 menu items (popover triggers) -->
          <FeatherListItem
            v-if="item.type === 'item'"
            :id="item.id"
            :ref="(el) => setTriggerRef(item.id, el as HTMLElement | null)"
            :class="listItemClasses"
            :asLi="true"
            v-bind="attrs"
            v-on="on"
            @focus="forceClosePopovers"
            @mouseenter="onItemMouseEnter(item.id, $event)"
            @mouseleave="onItemMouseLeave()"
            tabindex="0"
          >
            <div class="li-icon">
              <FeatherIcon
                v-if="item.type === 'item' && item.icon"
                :icon="item.icon"
              />
            </div>
            <div class="li-text">{{ item.title }}</div>
            <div class="li-chevron">
              <FeatherIcon v-if="!item.href" :icon="ChevronRight" />
            </div>
          </FeatherListItem>

          <FeatherListHeader
            v-else-if="item.type === 'header'"
            :id="item.id"
            :asLi="true"
            >{{ item.title }}</FeatherListHeader
          >
          <FeatherListSeparator
            v-else-if="item.type === 'separator'"
            class="li-separator"
            :id="item.id"
            :asLi="true"
          />
        </template>

        <template #default>
          <!-- Popover content (Popover default slot) -->
          <FeatherMenuList
            v-if="item.type === 'item' && item.componentProps"
            :id="`${props.id}-${item.id}-menu`"
            :items="item.componentProps?.items || []"
            @focus="forceClosePopovers"
          />
        </template>
      </FeatherPopover>

      <!-- Level 1 links (no popover) -->
      <!-- mouseenter so we can close all popovers when we enter a differnt li -->
      <FeatherListItem
        v-else-if="item.type === 'item'"
        :id="item.id"
        :href="item.href"
        :target="item.target || undefined"
        :class="listItemClasses"
        @mouseenter="onItemMouseEnter(item.id, $event)"
        @mouseleave="onItemMouseLeave()"
        @focus="forceClosePopovers"
      >
        <div class="li-icon">
          <FeatherIcon
            v-if="item.type === 'item' && item.icon"
            :icon="item.icon"
          />
        </div>
        <div class="li-text">{{ item.title }}</div>
        <div class="li-chevron">
          <FeatherIcon v-if="!item.href" :icon="ChevronRight" />
        </div>
      </FeatherListItem>
    </template>
  </FeatherList>
</template>

<script setup lang="ts">
import { computed, toRef } from "vue";
import {
  FeatherList,
  FeatherListItem,
  FeatherListHeader,
  FeatherListSeparator,
} from "@featherds/list";
import {
  FeatherPopover,
  PointerAlignment,
  PopoverPlacement,
} from "@featherds/popover";
import { FeatherMenuList, MenuListEntry } from "@featherds/menu";
import { FeatherIcon } from "@featherds/icon";
import ChevronRight from "@featherds/icon/navigation/ChevronRight";

// ============================================================================
// Props / Types
// ============================================================================
const props = defineProps({
  id: { type: String, required: true },
  items: { type: Array as () => MenuListEntry[], required: true },
  hoverMode: { type: Boolean, default: false }, // enables hover -> popover behavior
});

import { usePopoverHover } from "@featherds/composables/popover/usePopoverHover";

// Hover & Popover Behavior (moved to composable)
const {
  setTriggerRef,
  onItemMouseEnter,
  onItemMouseLeave,
  forceClosePopovers,
} = usePopoverHover(toRef(props, "hoverMode"));

// ============================================================================
// Dock Integration (extracted to composable)
// ============================================================================
import { useDock } from "@featherds/composables/dock/useDock";

const { isDocked, isDockCollapsed } = useDock({
  onDockClosed: () => {
    forceClosePopovers();
  },
  onToggleHoverOpen: () => {
    if (props.hoverMode) forceClosePopovers();
  },
});

// ============================================================================
// List Data & Presentation
// state (none) -> computed -> helpers
// ============================================================================
const listClasses = computed(() => ({
  "feather-sidenav-menu": true,
  docked: isDocked.value,
  "dock-closed": isDocked.value && isDockCollapsed.value,
  "dock-open": isDocked.value && !isDockCollapsed.value,
}));

const listItemClasses = computed(() => ({
  "feather-sidenav-menu-item": true,
}));

// processedItems: when hoverMode is enabled, ensure a header exists
const processedItems = computed(() => {
  const items = props.items || [];
  if (!props.hoverMode) return items;
  if (!items.some((i) => i.type === "header")) {
    const generated = {
      id: `${props.id}-generated-header`,
      type: "header",
      title: "Menu",
    } as unknown as MenuListEntry;
    return [generated, ...items];
  }
  return items;
});

const canShowPopover = (item: MenuListEntry) =>
  (item.type === "item" && !item.href) || item.type !== "item";

// ============================================================================
// Lifecycle Cleanup
// ============================================================================
// composable handles cleanup
</script>

<style lang="scss">
.feather-sidenav {
  --feather-dock-background-color: inherit;
  --feather-dock-color: inherit;
}
</style>

<style lang="scss" scoped>
@use "@featherds/styles/themes/utils" as utils;
@use "@featherds/styles/mixins/elevation" as elev;

.feather-list.feather-sidenav-menu {
  --icon-size-level1: 1.5rem;
  --icon-size-level2: 1.5rem;
  &.docked {
    :deep(a.feather-list-item):focus {
      box-shadow: inset 0 0 0 1px var(--feather-dock-color);
    }
    &.dock-open {
      & > .feather-list-header {
        color: var(--feather-dock-color);
      }
      :deep(.feather-list-item).feather-sidenav-menu-item {
        @include utils.state-on-surface-dark();
        .feather-list-item-text {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 0.5rem;
          cursor: pointer;
          align-content: center;
          align-items: center;
          .li-icon {
            .feather-icon {
              margin-block-start: 0.375rem;
              padding: 0;
              height: var(--icon-size-level1);
              width: var(--icon-size-level1);
            }
          }
          .li-text {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .li-chevron {
          visibility: hidden;
        }
        &:hover,
        &:focus {
          .li-chevron {
            visibility: visible;
            .feather-icon {
              margin-block-start: 0.375rem;
              height: var(--icon-size-level1);
              width: var(--icon-size-level1);
            }
          }
        }
      }
      li {
        &:focus {
          // NOTE:  Works, but not exactly sure why
          // START: Figure out why this works...
          // border: 2px solid transparent;
          outline: 2px solid transparent;
        }
        & > .feather-list-item {
          @include utils.state-on-surface-dark();
          border-radius: 6rem;
          & > .feather-list-item-text {
            display: grid;
            grid-template-columns: auto 1fr auto;
            gap: 0.5rem;
            align-content: center;
            align-items: center;
            cursor: pointer;

            .li-icon {
              .feather-icon {
                padding-block-start: 0.25rem;
                height: var(--icon-size-level1);
                width: var(--icon-size-level1);
              }
            }
          }
        }
      }
      & > :deep(.feather-popover-container).feather-popover-container {
        transform: translateX(0.5rem);
        & > .popover-pointer {
          display: none;
        }
        & > .popover {
          @include elev.elevation(8);
          margin: 0;
          padding-block-start: 0;
          background-color: var(--feather-dock-background-color);
          color: var(--feather-dock-color);

          & > .feather-list {
            & > .feather-list-header {
              color: var(--feather-dock-color);
            }
            > li > .feather-list-item {
              @include utils.state-on-surface-dark();
              align-content: center;
              .feather-icon {
                height: var(--icon-size-level1);
                width: var(--icon-size-level1);
              }
            }
          }
        }
      }
    }
    &.dock-closed {
      display: flex;
      flex-direction: column;
      :deep(.feather-list-item).feather-sidenav-menu-item {
        @include utils.state-on-surface-dark();
        padding: 0.125rem;
        padding-block-start: 0.5rem;
        outline: 1px solid transparent;
        border-radius: 0.25rem;
        .feather-list-item-text {
          display: grid;
          grid-template-columns: 1fr;
          .li-icon {
            text-align: center;
            margin: 0;
            padding: 0;
            .feather-icon {
              height: var(--icon-size-level1);
              width: var(--icon-size-level1);
            }
          }
          .li-text {
            display: none;
          }
          .li-chevron {
            display: none;
          }
        }
      }
      .feather-list-header {
        display: none;
      }
      :deep(.feather-popover-container).feather-popover-container {
        transform: translateX(-0.625rem);
        .popover-pointer {
          display: none;
        }
        .popover {
          margin-block: 0;
          padding-block-start: 0;
          background-color: var(--feather-dock-background-color);
          color: var(--feather-dock-color);
          & > .feather-list {
            & > .feather-list-header {
              color: var(--feather-dock-color);
            }
            > li > .feather-list-item {
              @include utils.state-on-surface-dark();
              align-content: center;
              .feather-icon {
                height: var(--icon-size-level2);
                width: var(--icon-size-level2);
              }
            }
          }
        }
      }
    }
  }
}
</style>
