<template>
  <FeatherList v-if="props.items.length > 0">
    <template v-for="item in props.items" :key="item.id">
      <FeatherListHeader v-if="item.type === 'header'" @click="item.onClick">
        {{ item.title }}
      </FeatherListHeader>
      <FeatherListItem
        v-if="item.type === 'item' && !item.scrollTarget"
        :href="item.href && !item.disabled ? item.href : null"
        :target="item.target ? item.target : null"
        :disabled="item.disabled || false"
        :selected="item.selected || false"
        @click="handleLinkClick(item, $event)"
      >
        <template v-if="item.icon" #icon>
          <FeatherIcon :icon="item.icon" />
        </template>
        {{ item.title }}
      </FeatherListItem>
      <FeatherButton
        v-if="item.type === 'item' && item.scrollTarget"
        text
        @click="handleItemClick(item)"
      >
        {{ item.title }}
      </FeatherButton>
      <template v-if="item.type === 'separator'">
        <FeatherListSeparator />
      </template>
    </template>
  </FeatherList>
</template>

<script setup lang="ts">
import {
  FeatherList,
  FeatherListHeader,
  FeatherListItem,
  FeatherListSeparator,
} from "@featherds/list";
import { FeatherIcon } from "@featherds/icon";
import { FeatherButton } from "@featherds/button";
import type { MenuListEntry, MenuListItem } from "./types";
import { inject, onUnmounted } from "vue";

const props = defineProps({
  items: {
    type: Array as () => MenuListEntry[],
    required: true,
  },
});

// #region item helpers
const timeouts = new Set<ReturnType<typeof setTimeout>>();
// #endregion

const scrollToElement = inject<(selector: string, className: string) => void>(
  "scrollToElement",
  (selector: string, className: string) => {
    // Default implementation when no provider exists
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      element.classList.add(className);
      setTimeout(() => {
        element.classList.remove(className);
      }, 3000); // Match the animation duration
    }
  }
);

const handleLinkClick = (item: MenuListItem, event: Event) => {
  if (item.target === "_blank") {
    // Let browser handle naturally
    // Immediate response for new tabs
    return;
  }

  // Apply delay for all other cases
  event.preventDefault();
  delayForRipple(() => {
    if (item.href && item.target) {
      window.open(item.href, item.target);
    } else if (item.href) {
      window.location.href = item.href;
    }
    item.onClick?.();
  }, 150);
};

const handleItemClick = (item: MenuListItem) => {
  if (item.scrollTarget && scrollToElement) {
    scrollToElement(
      item.scrollTarget,
      item?.scrollTargetClass || "scrollToHighlight"
    );
  }
  if (item.onClick) {
    item.onClick();
  }
  item.selected = true;
};

const delayForRipple = (fn: () => void, delay = 100) => {
  const timeout = setTimeout(() => {
    timeouts.delete(timeout); // Remove from tracking when complete
    fn();
  }, delay);
  timeouts.add(timeout);
  return timeout;
};

onUnmounted(() => {
  // cleanup any pending timeouts
  timeouts.forEach((timeout) => clearTimeout(timeout));
  timeouts.clear();
});
</script>
<style lang="scss">
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/themes/utils" as utils;
.scrollToHighlight {
  animation: scrollToHighlight-fade 3s ease-out;
  scroll-margin-block: 80px;
}

@keyframes scrollToHighlight-fade {
  40%,
  80% {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    background-color: utils.alpha(vars.$warning, 0.6);
  }
}
</style>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
.feather-panel-bar-content {
  .feather-list {
    button.btn {
      color: var(vars.$state-color-on-neutral);
    }
  }
}
</style>
