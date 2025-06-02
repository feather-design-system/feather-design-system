<template>
  <FeatherList :class="listClasses" :id="props.id" ref="listRef">
    <template v-for="item in items" :key="item.id">
      <FeatherPopover
        v-if="canShowPopover(item)"
        :pointerAlignment="PointerAlignment.left"
        :placement="PopoverPlacement.left"
      >
        <template v-slot:trigger="{ attrs, on }">
          <!-- Level 1 menu items -->
          <FeatherListItem
            tabindex="0"
            v-if="item.type === 'item'"
            :id="item.id"
            :class="listItemClasses"
            :asLi="true"
            v-bind="attrs"
            v-on="on"
            @focus="forceClosePopovers"
          >
            <!-- <div class="li-icon" @click="requestDockExpansion"> -->
            <div class="li-icon">
              <FeatherIcon
                v-if="item.type === 'item' && item.icon"
                :icon="item.icon"
              />
            </div>
            <div class="li-text">
              {{ item.title }}
            </div>
            <div class="li-chevron">
              <FeatherIcon v-if="!item.href" :icon="ChevronRight" />
            </div>
          </FeatherListItem>
          <FeatherListHeader
            v-if="item.type === 'header'"
            :id="item.id"
            :asLi="true"
            >{{ item.title }}
          </FeatherListHeader>
          <FeatherListSeparator
            v-if="item.type === 'separator'"
            class="li-separator"
            :id="item.id"
            :asLi="true"
          />
        </template>
        <template #default>
          <!-- Popover content (Popover default slot)-->
          <FeatherMenuList
            v-if="item.type === 'item' && item.componentProps"
            :id="`${props.id}-${item.id}-menu`"
            :items="item.componentProps?.items || []"
            @focus="forceClosePopovers"
          />
          <!-- v-bind="item.componentProps || {}" -->
        </template>
      </FeatherPopover>
      <!-- Level 1 links -->
      <FeatherListItem
        v-else-if="item.type === 'item'"
        :id="item.id"
        :href="item.href"
        :target="item.target || undefined"
        :class="listItemClasses"
        @focus="forceClosePopovers"
      >
        <div class="li-icon">
          <FeatherIcon
            v-if="item.type === 'item' && item.icon"
            :icon="item.icon"
          />
        </div>
        <div class="li-text">
          {{ item.title }}
        </div>
        <div class="li-chevron">
          <FeatherIcon v-if="!item.href" :icon="ChevronRight" />
        </div>
      </FeatherListItem>
    </template>
  </FeatherList>
</template>

<script setup lang="ts">
import { computed, inject, Ref, ref, watch } from "vue";
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
import { DockConfig } from "@featherds/dock";
import { FeatherIcon } from "@featherds/icon";
import ChevronRight from "@featherds/icon/navigation/ChevronRight";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  items: {
    type: Array as () => MenuListEntry[],
    required: true,
  },
});

const listRef = ref<HTMLElement | undefined>(undefined);

// #region DockConfig
const dockConfig = inject<Ref<DockConfig>>(
  "dockConfig",
  ref({
    id: "none",
    location: "none",
    isOpen: false,
  })
);

const dockId = ref(dockConfig.value.id);

if (dockConfig) {
  watch(
    dockConfig,
    (cfg) => {
      if (!cfg.isOpen && isDocked.value && cfg.id === dockId.value) {
        // If the dock is closed, we want to force close any open popovers
        forceClosePopovers();
      }
    },
    { deep: true }
  );
}

// const requestDockExpansion = inject<() => void>("requestDockExpansion");

const isDocked = computed(() => {
  return dockConfig.value.location !== "none";
});

const isDockCollapsed = computed(() => {
  return isDocked.value && !dockConfig.value.isOpen;
});
// #endregion

const listClasses = computed(() => {
  return {
    "feather-sidebar-menu": true,
    docked: isDocked.value,
    "dock-closed": isDocked.value && isDockCollapsed.value,
    "dock-open": isDocked.value && !isDockCollapsed.value,
  };
});

const listItemClasses = computed(() => {
  return {
    "feather-sidebar-menu-item": true,
  };
});

const canShowPopover = (item: MenuListEntry) => {
  return (item.type === "item" && !item.href) || item.type !== "item";
};

const forceClosePopovers = () => {
  const popoverContainers = document.querySelectorAll(
    ".feather-popover-container"
  );
  if (popoverContainers) {
    popoverContainers.forEach((container) => {
      const popoverEl = container.querySelector(".popover");
      if (popoverEl?.id) {
        // Find the trigger element for the popover
        const triggerEl = document.querySelector(
          `[data-feather-popover][aria-controls="${popoverEl.id}"]`
        );
        if (triggerEl) {
          // Dispatch an Escape key event to close the popover
          const event = new KeyboardEvent("keydown", {
            code: "Escape",
            key: "Escape",
            bubbles: false,
            cancelable: true,
          });
          triggerEl.dispatchEvent(event);
        }
      }
    });
  }
};
</script>

<style lang="scss">
.feather-sidebar-menu {
  --feather-sidebar-background-color: inherit;
  --feather-sidebar-color: inherit;
}
</style>

<style lang="scss" scoped>
@use "@featherds/styles/themes/utils" as utils;
@use "@featherds/styles/mixins/elevation" as elev;

.feather-list.feather-sidebar-menu {
  --icon-size-level1: 1.5rem;
  --icon-size-level2: 1.5rem;
  &.docked {
    :deep(a.feather-list-item):focus {
      box-shadow: inset 0 0 0 1px var(--feather-sidebar-color);
    }
    &.dock-open {
      // background-color: var(--feather-sidebar-background-color);
      & > .feather-list-header {
        color: var(--feather-sidebar-color);
      }
      :deep(.feather-list-item).feather-sidebar-menu-item {
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
          .li-chevron {
            visibility: hidden;
          }
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
          background-color: var(--feather-sidebar-background-color);
          color: var(--feather-sidebar-color);

          & > .feather-list {
            & > .feather-list-header {
              color: var(--feather-sidebar-color);
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
      :deep(.feather-list-item).feather-sidebar-menu-item {
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
          background-color: var(--feather-sidebar-background-color);
          color: var(--feather-sidebar-color);
          & > .feather-list {
            & > .feather-list-header {
              color: var(--feather-sidebar-color);
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
