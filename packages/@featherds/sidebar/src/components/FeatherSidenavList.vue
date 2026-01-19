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
            :class="['top-level', listItemClasses]"
            :asLi="true"
            v-bind="attrs"
            v-on="on"
            @focus="forceClosePopovers"
            @mouseenter="restrictedMouseEnter(item.id)"
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
            :items="
              ensureChildMenuHeader(
                (item.componentProps?.items as MenuListEntry[]) || [],
                `${item.title || 'Menu'}`
              )
            "
            @focus="forceClosePopovers"
          />
        </template>
      </FeatherPopover>

      <!-- Level 1 links (no popover) -->
      <FeatherListItem
        v-else-if="item.type === 'item'"
        :id="item.id"
        :href="item.href"
        :target="item.target || undefined"
        :class="['top-level', listItemClasses]"
        @mouseenter="restrictedMouseEnter(item.id)"
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
import { computed, inject, Ref, toRef, watch } from "vue";
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
import type { DockConfig } from "@featherds/dock/src/types";
import { FeatherMenuList, type MenuListEntry } from "@featherds/menu";
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
} = usePopoverHover(toRef(props, "hoverMode"), {});

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

const dockConfig = inject<Ref<DockConfig>>("dockConfig");
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
  "hover-mode": props.hoverMode,
}));

// processedItems: when hoverMode is enabled, ensure a header exists
const processedItems = computed(() => {
  const items = props.items || [];
  return items;
});

// Helper function to ensure child menus have headers
const ensureChildMenuHeader = (
  childItems: MenuListEntry[],
  parentTitle: string
): MenuListEntry[] => {
  if (!props.hoverMode || !childItems?.length) return childItems || [];

  if (!childItems.some((i) => i.type === "header")) {
    const generated = {
      id: `${props.id}-child-header-${Date.now()}`,
      type: "header",
      title: parentTitle,
    } as unknown as MenuListEntry;
    return [generated, ...childItems];
  }
  return childItems;
};

const canShowPopover = (item: MenuListEntry) =>
  (item.type === "item" && !item.href) || item.type !== "item";

// Allow mouse enter events; but close popovers when dock is resizing
const restrictedMouseEnter = (id: string) => {
  if (dockConfig?.value?.isResizing) {
    forceClosePopovers();
  } else {
    onItemMouseEnter(id);
  }
};

// Close popovers when dock starts resizing
watch(
  () => dockConfig?.value?.isResizing,
  (newVal) => {
    if (newVal) forceClosePopovers();
  }
);
</script>

<style lang="scss">
.feather-sidenav {
  --feather-dock-background-color: inherit;
  --feather-dock-color: inherit;
  --feather-popover-list-max-height: 20rem;
}
</style>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/themes/utils" as utils;
@use "@featherds/styles/mixins/elevation" as elev;

.feather-list.feather-sidenav-menu {
  --icon-size-level1: 1.5rem;
  --icon-size-level2: 1.5rem;
  &.docked {
    width: 0;
    > .feather-list-header {
      display: block;
      list-style: none;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: var(--feather-dock-color);
      transition: opacity 0.25s ease-in-out;
    }
    :deep(a.feather-list-item):focus {
      box-shadow: inset 0 0 0 1px var(--feather-dock-color);
    }
    .popover {
      .feather-list {
        max-height: var(--feather-popover-list-max-height, 20rem);
        overflow-y: auto;
        scrollbar-arrow-color: aquamarine !important;
        scrollbar-gutter: stable;
        scrollbar-width: thin;
        -ms-scrollbar-width: thin;
        // Change scrolbar element colors
        scrollbar-color: hsl(from var(vars.$secondary-variant) h s 65% / 0.85)
          var(--feather-lightbox-background);
      }
    }
    &.dock-open {
      & > .feather-list-header {
        opacity: 1;
      }
      :deep(.feather-list-item).feather-sidenav-menu-item {
        @include utils.state-on-surface-dark();
        &.top-level.hover-mode {
          .ripple,
          .ripple.active {
            opacity: 0;
            visibility: hidden;
            transition: none;
          }
        }
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
        opacity: 0;
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
