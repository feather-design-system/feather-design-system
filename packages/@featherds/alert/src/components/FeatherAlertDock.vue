<template>
  <component
    :is="tag"
    class="feather-alert-dock"
    :class="classes"
    :data-dock="props.dock"
    :role="props.dock === 'top' ? 'region' : 'complementary'"
    :aria-label="`${props.dock} notifications dock`"
  >
    <div
      class="feather-alert-dock__content"
      ref="dockRef"
      aria-live="polite"
      aria-atomic="false"
      aria-relevant="additions text"
    >
      <slot></slot>
    </div>
  </component>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  provide,
  reactive,
  ref,
  watch,
} from "vue";
import { AlertDockProps, DockContext } from "../types";

const props = withDefaults(defineProps<AlertDockProps>(), {
  active: true,
  tag: "aside",
  dock: "top",
  parent: (): HTMLElement => document.body,
});

/**
 * @typedef {Object} DockContext
 * @property {boolean} docked - Indicates the alerts are docked.
 * @property {AlertAnchor} dock - The current dock position (top or bottom).
 */
const dockContext: DockContext = reactive({
  docked: true,
  dock: props.dock,
});
provide("featherAlertDockContext", dockContext);

const alertCount = ref(0);
// Reference to dock content to measure dock height spacing
const dockRef = ref<HTMLElement | null | undefined>(undefined);
const dockHeight = ref(0);
const placeholderRef = ref<HTMLElement | null | undefined>(undefined);

const tag = computed(() => props.tag || "aside");

// const isCustomParent = computed(() => {
//   if (!props.parent) return false;
//   return props.parent !== document.body;
// });

const classes = computed(() => {
  return {
    [`feather-alert-dock__${props.dock}`]: true,
    // "feather-alert-dock--custom-parent": isCustomParent.value,
  };
});

watch(
  () => props.dock,
  (newDock) => {
    dockContext.dock = newDock;
  }
);

let resizeObserver: ResizeObserver | null = null;
let mutationObserver: MutationObserver | null = null;
let updateTimeoutId: number | null = null;

/**
 * Schedules a recalculation of the dock height and visibility of alerts.
 * This is done using a timeout to ensure that the DOM has had time to update
 * before the recalculation is performed.
 */
const scheduleRecalculation = () => {
  if (updateTimeoutId !== null) {
    clearTimeout(updateTimeoutId);
  }

  // Use setTimeout to ensure the DOM has had time to update
  updateTimeoutId = window.setTimeout(() => {
    hasVisibleAlerts();
    updatePlaceholderSpacing();
    updateTimeoutId = null;
  }, 50);
};

/**
 * Checks if there are any visible alerts in the dock.
 * This function counts the number of visible alerts (associated
 * with the dock) and updates the alertCount reactive variable.
 * It returns true if there are visible alerts, otherwise false.
 */
const hasVisibleAlerts = () => {
  // if (!dockRef.value) return false;
  const visibleAlerts = dockRef.value!.querySelectorAll(
    `.feather-alert-wrapper:not([style*='display: none']) .feather-alert.feather-alert__active.${props.dock}`
  );
  const newCount = visibleAlerts.length;

  if (newCount !== alertCount.value) {
    alertCount.value = newCount;
  }
  return alertCount.value > 0;
};

/**
 * Updates the spacing to accommodate the docked alerts.
 * This function sets the height of the placeholder element to match
 * the height of the dock and shows or hides the placeholder based on
 * the number of visible alerts.
 */
const updatePlaceholderSpacing = async () => {
  await nextTick();
  if (dockRef.value && placeholderRef.value) {
    dockHeight.value = dockRef.value.scrollHeight;
    placeholderRef.value.style.height = `${dockHeight.value}px`;

    if (alertCount.value > 0) {
      placeholderRef.value.style.display = "block";
    } else {
      // placeholderRef.value.style.display = "none";
      // Wait for the transition to finish before hiding
      dockRef.value.addEventListener(
        "transitionend",
        () => {
          placeholderRef.value && (placeholderRef.value.style.display = "none");
        },
        { once: true }
      );
    }
  }
};

/**
 * Creates a placeholder element to maintain the layout of the page when alerts are docked.
 * The placeholder is inserted into the DOM and its height is set to match the height of the dock.
 * The placeholder is used to prevent alerts from covering content when they are added or removed
 * from the dock.
 */
const getPlaceholder = () => {
  const existsingPlaceholder = document.querySelector(
    `[data-feather-alert-dock-placeholder="${props.dock}"]`
  );
  if (existsingPlaceholder) {
    placeholderRef.value = existsingPlaceholder as HTMLElement;
    return;
  }

  if (dockRef.value) {
    const placeholder = document.createElement("div");
    placeholder.className = `feather-alert-dock__placeholder feather-alert-dock__placeholder--${props.dock}`;
    placeholder.style.position = "sticky";
    placeholder.style.height = `${dockHeight.value}px`;
    placeholder.style.display = "none";
    placeholder.style.width = "100%";
    placeholder.style.transition = "height 0.5s ease-in-out";
    placeholder.dataset.featherAlertDockPlaceholder = props.dock;
    placeholder.setAttribute("aria-hidden", "true");
    placeholder.setAttribute("role", "presentation");
    placeholder.setAttribute("data-testid", "alert-dock-placeholder");
    placeholder.setAttribute("id", `${props.dock}-dock-placeholder`);
    placeholderRef.value = placeholder;

    const container = document.body as HTMLElement;

    if (props.dock === "top") {
      container.insertAdjacentElement("afterbegin", placeholderRef.value);
    } else if (props.dock === "bottom") {
      container.insertAdjacentElement("beforeend", placeholderRef.value);
    }
  }
};

onMounted(() => {
  nextTick(() => {
    dockContext.docked = true;
    if (hasVisibleAlerts()) {
      updatePlaceholderSpacing();
      getPlaceholder();
    }

    if (dockRef.value && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        updatePlaceholderSpacing();
      });
      resizeObserver.observe(dockRef.value);
    }

    if (dockRef.value && window.MutationObserver) {
      mutationObserver = new MutationObserver(() => {
        scheduleRecalculation();
      });
      mutationObserver.observe(dockRef.value, {
        childList: true,
      });
    }
  });
});
onUpdated(() => {
  if (hasVisibleAlerts()) {
    updatePlaceholderSpacing();
  }
});

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
  if (mutationObserver) {
    mutationObserver.disconnect();
  }
  if (placeholderRef.value) {
    placeholderRef.value.remove();
  }
});
</script>

<style lang="scss" scoped>
.feather-alert-dock {
  position: fixed;
  width: 100%;
  z-index: 1000;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-template-areas: "content";
  height: auto;
  transition: all 0.5s ease-in-out;

  &.feather-alert-dock__top {
    top: 0;
    left: 0;
    right: 0;
    bottom: unset;
  }
  &.feather-alert-dock__bottom {
    bottom: 0;
    left: 0;
    right: 0;
    top: unset;
  }

  &.feather-alert-dock--custom-parent {
    position: absolute;
    left: 0;
    right: 0;
  }
  > .feather-alert-dock__content {
    :deep(.feather-alert-wrapper) {
      position: relative;
      width: 100%;
      z-index: 1000;
      margin: 0;
    }
  }
}
@media (prefers-reduced-motion: reduce) {
  .feather-alert-dock,
  .feather-alert-dock__placeholder {
    transition: none !important;
  }
}
</style>
