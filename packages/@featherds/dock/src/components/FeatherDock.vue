<template>
  <component :is="rootTag" :class="dockClasses" :id="id">
    <!-- @keydown.esc.stop.prevent="handleSidebarEscape" -->
    <FeatherButton
      class="feather-dock-toggle hover focus"
      data-ref-id="feather-dock-toggle"
      :icon="dockConfig.isOpen ? 'Menu Close' : 'Menu Open'"
      :onColor="true"
      @click="toggleDock"
      @mouseenter="toggleHovering = true"
      @mouseleave="toggleHovering = false"
      :aria-expanded="dockConfig.isOpen"
      :aria-label="dockConfig.isOpen ? labels.collapse : labels.expand"
      :aria-controls="`${id}-content`"
      role="navigation"
    >
      <FeatherIcon :icon="dockConfig.isOpen ? MenuClose : MenuOpen" />
    </FeatherButton>
    <div
      ref="dockContentRef"
      :id="`${id}-content`"
      class="feather-dock-content"
      role="region"
      :aria-label="
        dockConfig.isOpen ? 'Dock content expanded' : 'Dock content collapsed'
      "
    >
      <slot name="docked">
        <div class="custom-content">
          <h2>Custom Dock Content</h2>
          <p>Add your content here using the "docked" slot.</p>
          <p>
            See
            <a href="https://feather.nanthealth.com/Components/" target="_docs">
              Components
            </a>
            for more details
          </p>
        </div>
      </slot>
    </div>
    <div class="feather-dock-resizer">
      <div
        class="feather-dock-resizer-handle"
        @pointerdown="onResizerDown"
      ></div>
    </div>
  </component>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  provide,
  readonly,
  ref,
  watch,
} from "vue";
import { FeatherButton } from "@featherds/button";
import { FeatherIcon } from "@featherds/icon";
import MenuOpen from "@featherds/icon/navigation/MenuOpen";
import MenuClose from "@featherds/icon/navigation/MenuClose";
import { type DockConfig, DockProps } from "../types";

const props = withDefaults(defineProps<DockProps>(), {
  modelValue: false,
  location: "left",
  expandedWidth: "20rem",
  collapsedWidth: "3rem",
  pushedSelector: undefined,
  labels: () => ({
    expand: "Expand dock",
    collapse: "Collapse dock",
  }),
  rootTag: "div",
});

const emit = defineEmits([
  "update:modelValue",
  "update:dock-expanded",
  "update:dock-collapsed",
  "update:dock-resized",
]);

const dockContentRef = ref<HTMLElement | undefined>(undefined);

const toggleHovering = ref(false);

// use composable's ref as source of truth; its .value is a Ref<boolean>
const isDockOpen = ref<boolean>(props.modelValue);

const pushedSelectorPadding = ref("");

const dockClasses = computed(() => {
  return {
    "feather-dock": true,
    "dock-open": isDockOpen.value,
    "dock-closed": !isDockOpen.value,
    "is-resizing": isResizing.value,
    [props.location]: true,
  };
});

const dockConfig = computed<DockConfig>(() => ({
  id: props.id,
  location: props.location,
  isOpen: isDockOpen.value,
  isResizing: isResizing.value,
}));

const convertToPixels = (value: string): string => {
  if (!value) return "0";
  if (typeof value === "number") return value;
  if (value.endsWith("px")) return parseInt(value, 10).toString();

  const el = document.createElement("div");
  el.style.position = "absolute";
  el.style.visibility = "hidden";
  el.style.width = value;
  document.body.appendChild(el);

  const pixels = el.getBoundingClientRect().width;
  document.body.removeChild(el);

  return pixels.toString();
};

const expandedWidthPx = computed(() => {
  return `${convertToPixels(props.expandedWidth)}px`;
});

const collapsedWidthPx = computed(() => {
  return `${convertToPixels(props.collapsedWidth)}px`;
});

// computed px values of provided widths
// (expandedWidthPx and collapsedWidthPx are declared above)

// currentExpandedWidth stores the current expanded width (in CSS units, usually px)
// and is updated when the user drags the resizer. Initialized from the prop.
const currentExpandedWidth = ref<string>(expandedWidthPx.value);

// Expose dockWidth as a CSS-ready string. When closed, use collapsed prop; when open, use currentExpandedWidth.
const dockWidth = computed(() => {
  return dockConfig.value.isOpen
    ? currentExpandedWidth.value
    : props.collapsedWidth;
});

// Resizing state
const isResizing = ref(false);
const startX = ref(0);
const startWidthPx = ref(0);

// Keep local width in sync if prop changes externally
watch(
  () => props.expandedWidth,
  () => {
    currentExpandedWidth.value = expandedWidthPx.value;
  }
);

// --- Resizer handlers -------------------------------------------------
const onResizerDown = (event: PointerEvent) => {
  // Only respond to primary pointer
  if ((event as PointerEvent).isPrimary === false) return;
  event.preventDefault();

  isResizing.value = true;
  startX.value = (event as PointerEvent).clientX;
  // parse start width from currentExpandedWidth (assume px or numeric)
  startWidthPx.value = parseInt(currentExpandedWidth.value as string, 10) || 0;

  // Add global listeners
  window.addEventListener("pointermove", onResizerMove);
  window.addEventListener("pointerup", onResizerUp);
};

const onResizerMove = (event: PointerEvent) => {
  if (!isResizing.value) return;
  const clientX = (event as PointerEvent).clientX;
  const delta = clientX - startX.value;

  let newWidth = startWidthPx.value;
  if (props.location === "left") {
    newWidth = startWidthPx.value + delta;
  } else {
    newWidth = startWidthPx.value - delta;
  }

  // enforce minimum width = collapsedWidthPx
  const minWidth = parseInt(convertToPixels(props.collapsedWidth), 10) || 48;
  const maxWidth = Math.max(200, window.innerWidth - 64);
  newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));

  currentExpandedWidth.value = `${Math.round(newWidth)}px`;

  // Update pushed elements live
  updatePushedElement();
};

const onResizerUp = () => {
  if (!isResizing.value) return;
  isResizing.value = false;
  window.removeEventListener("pointermove", onResizerMove);
  window.removeEventListener("pointerup", onResizerUp);
  emit("update:dock-resized", currentExpandedWidth.value);
};

const toggleDock = () => {
  isDockOpen.value = !isDockOpen.value;
  emit("update:modelValue", isDockOpen.value);

  isDockOpen.value
    ? emit("update:dock-expanded")
    : emit("update:dock-collapsed");

  updatePushedElement();
};

const handleSidebarEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape" && isDockOpen.value) {
    isDockOpen.value = false;
    emit("update:modelValue", false);
    emit("update:dock-collapsed");
    updatePushedElement();

    // Focus the toggle button when dock is closed
    const toggleBtnEl = document.querySelector(
      `#${props.id} .feather-dock-toggle`
    ) as HTMLElement | null;
    if (toggleBtnEl) {
      toggleBtnEl.focus();
    }
  }
};

const updatePushedElement = () => {
  if (!props.pushedSelector) return;

  // If string, convert to array for unified processing
  const selectors = Array.isArray(props.pushedSelector)
    ? props.pushedSelector
    : [props.pushedSelector];
  selectors.forEach((selector) => {
    try {
      const targets = document.querySelectorAll(selector);
      if (targets.length === 0) {
        console.warn(`FeatherDock: pushedSelector="${selector}" not found`);
        return;
      }

      targets.forEach((target) => {
        const element = target as HTMLElement;
        element.classList.add("dock-push-target");

        const position = window.getComputedStyle(element).position;
        const isInFlow = position === "static" || position === "relative";

        // Use the live currentExpandedWidth when the dock is open so pushed elements follow resizes
        const widthFromProps = dockConfig.value.isOpen
          ? `${
              parseInt(convertToPixels(currentExpandedWidth.value)) +
              parseInt(convertToPixels(pushedSelectorPadding.value))
            }px`
          : `${
              parseInt(convertToPixels(props.collapsedWidth)) +
              parseInt(convertToPixels(pushedSelectorPadding.value))
            }px`;

        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const widthInPx = dockConfig.value.isOpen
          ? expandedWidthPx.value
          : collapsedWidthPx.value;

        // If the element is in the normal flow, we need to adjust the margin
        if (isInFlow) {
          // console.log(
          //   "Inflow element found:",
          //   selector,
          //   position,
          //   widthFromProps
          // );
          const paddingProperty =
            dockConfig.value.location === "left"
              ? "padding-left"
              : "padding-right";

          element.style.setProperty(paddingProperty, widthFromProps);
        } else {
          // console.warn("Outflow element found:", selector, position, widthInPx);
          // console.warn("Outflow not supported yet");
          // // elements outside normal flow (fixed or absolute) need to be adjusted differently
          // const side = dockConfig.value.location === "left" ? "left" : "right";
          // // add to their existing position
          // const originalPos = parseInt(
          //   window.getComputedStyle(element)[side] || "0",
          //   10
          // );
          // const newVal = `${originalPos + parseInt(widthInPx, 10)}px`;
          // element.style.setProperty(side, newVal);
          // // store original value for later restoration
          // if (!element.dataset.originalPosition) {
          //   element.dataset.originalPosition = originalPos.toString();
          // }
        }
      });
    } catch (error) {
      console.error(`Error updating pushed element: "${selector}": ${error}`);
    }
  });
};

// Watch external prop changes and sync to internal state, now that updatePushedElement is defined
watch(
  () => props.modelValue,
  (newVal: boolean) => {
    if (newVal !== isDockOpen.value) {
      isDockOpen.value = newVal;
      updatePushedElement();
    }
  }
);

provide(
  "scrollToElement",
  inject<(selector: string, className: string) => void>(
    "scrollToElement",
    // Allow consumer to provide their own...
    // Default implementation as fallback
    (selector: string, className: string) => {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        element.classList.add(className);
        setTimeout(() => {
          element.classList.remove(className);
        }, 3000);
      }
    }
  )
);

provide(
  "requestDockExpansion",
  inject<() => void>(
    "requestDockExpansion",
    // Allow consumer to provide their own...
    // Default implementation as fallback;
    () => {
      if (!isDockOpen.value && props.location !== "none") {
        isDockOpen.value = true;
        updatePushedElement();
        emit("update:dock-expanded");
      }
    }
  )
);

// Provide the dock configuration and expansion method to all children
provide("dockConfig", readonly(dockConfig)); //readonly
provide("toggleHovering", readonly(toggleHovering));

onMounted(() => {
  if (props.pushedSelector) {
    const selector = Array.isArray(props.pushedSelector)
      ? props.pushedSelector[0]
      : props.pushedSelector;

    if (!selector) return;
    const element = document.querySelector(selector) as HTMLElement;

    if (!element) return;
    pushedSelectorPadding.value =
      dockConfig.value.location === "left"
        ? window.getComputedStyle(element).paddingLeft
        : window.getComputedStyle(element).paddingRight;
  }

  // Update the pushed element padding
  updatePushedElement();
  document.addEventListener("keydown", handleSidebarEscape);
});

onUnmounted(() => {
  // Cleanup any global pointer listeners used during resizing
  if (isResizing.value) {
    window.removeEventListener("pointermove", onResizerMove);
    window.removeEventListener("pointerup", onResizerUp);
    isResizing.value = false;
  }
  document.removeEventListener("keydown", handleSidebarEscape);
  if (props.pushedSelector) {
    // If the dock is closed, remove the margin from the pushed elements
    // This is important to avoid layout shifts when the dock is closed
    const selectors = Array.isArray(props.pushedSelector)
      ? props.pushedSelector
      : [props.pushedSelector];

    selectors.forEach((selector) => {
      try {
        const targets = document.querySelectorAll(selector);
        targets.forEach((target) => {
          const element = target as HTMLElement;
          element.classList.remove("dock-push-target");

          const position = window.getComputedStyle(element).position;
          const isInFlow = position === "static" || position === "relative";

          if (isInFlow) {
            // console.log("Inflow element found:", selector, position);
            element.style.removeProperty(
              dockConfig.value.location === "left"
                ? "padding-left"
                : "padding-right"
            );
          } else {
            console.warn("Outflow element found:", selector, position);
            console.warn("Outflow not supported yet");

            // // push from the opposite side
            // const side =
            //   dockConfig.value.location === "left" ? "right" : "left";
            // // remove the margin from the pushed element
            // if (element.dataset.originalPosition) {
            //   // restore the original position
            //   if (element.dataset.originalPosition) {
            //     element.style.setProperty(
            //       side,
            //       `${element.dataset.originalPosition}px`
            //     );
            //     delete element.dataset.originalPosition;
            //   } else {
            //     // remove the margin if it was never set
            //     element.style.removeProperty(side);
            //   }
            // }
          }
        });
      } catch (error) {
        console.error(
          `Unmounted: Error removing pushed element: "${selector}": ${error}`
        );
      }
    });
  }
});
</script>

<style>
.dock-push-target {
  transition: all 0.3s ease-in-out;

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.01s; /* nearly instant */
    transition-timing-function: linear;
  }
}
.feather-dock {
  /* PROPERTIES CAN BE OVERRIDEN */
  --feather-dock-background-color: var(--feather-surface);
  --feather-dock-color: var(--feather-primary-text-on-surface);

  --feather-dock-content-padding-top: 3rem;
  --feather-dock-toggle-top: 0.25rem;
  --feather-dock-timing: 0.3s;
  --feather-dock-header-offset: 0px;
  --feather-dock-resizer-width: 0.5rem;

  @media (prefers-reduced-motion: reduce) {
    --feather-dock-timing: 0.1s; /* nearly instant */
    --feather-dock-toggle-timing-fn: linear;
    --feather-dock-toggle-timing-fn: linear !important;
    transition: left 0.01s linear, width 0.1s linear !important;
  }
  .feather-dock-toggle {
    @media (prefers-reduced-motion: reduce) {
      transition: left 0.01s linear !important;
      transition-timing-function: linear !important;
    }
  }
}
</style>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/themes/utils" as utils;
@use "@featherds/styles/mixins/elevation" as elev;

.feather-dock {
  --feather-dock-width: v-bind("dockWidth");
  --feather-dock-toggle-timing-fn: v-bind(
    "dockConfig.isOpen ? 'cubic-bezier(0, 0.8, 0.4, 1)' : 'cubic-beziercubic-bezier(0, 0.8, 0.4, 1)'"
  );

  position: fixed;
  inset: var(--feather-dock-header-offset) 0 0 0;
  border-radius: 0;

  width: var(--feather-dock-width);

  overflow-y: visible;
  scroll-behavior: smooth;
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  scrollbar-color: var(--feather-dock-color) transparent;
  z-index: var(vars.$zindex-fixed);

  @include elev.elevation(16);
  transition: all var(--feather-dock-timing, 0.3s);
  transition-timing-function: var(--feather-dock-toggle-timing-fn);
  background-color: var(--feather-dock-background-color);
  color: var(--feather-dock-color);

  &.right {
    inset: 0 0 0 auto;
    .feather-dock-toggle {
      transform: rotate(180deg);
      right: calc(var(--feather-dock-width) - 1rem);
      left: auto;
      transition: right var(--feather-dock-timing, 0.3s);
      transition-timing-function: var(--feather-dock-toggle-timing-fn);
    }
  }
  &.dock-closed {
    scrollbar-width: none;
    scrollbar-color: transparent transparent;
    & > .feather-dock-toggle {
      position: absolute;
      left: calc(var(--feather-dock-width) / 2 - 1.5rem);
      margin: auto 0.5rem;
    }
    > .feather-dock-toggle {
      top: var(--feather-dock-toggle-top);
    }
  }
  & > .feather-dock-toggle {
    @include utils.state-on-neutral();
    position: fixed;

    top: calc(
      var(--feather-dock-toggle-top) + var(--feather-dock-header-offset)
    );
    left: calc(var(--feather-dock-width) - 1rem);
    background-color: var(--feather-dock-background-color);
    color: var(--feather-dock-color);
    backdrop-filter: blur(32px);
    -webkit-backdrop-filter: blur(32px);
    z-index: var(vars.$zindex-popover);
    transition: left var(--feather-dock-timing, 0.3s);
    transition-timing-function: var(--feather-dock-toggle-timing-fn);
    font-size: 1rem;
    z-index: calc(var(--feather-zindex-modal) + 1);
  }
  & > .feather-dock-content {
    position: relative;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    padding: 0.25rem;
    padding-top: var(--feather-dock-content-padding-top, 3rem);
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .custom-content {
      text-align: center;
      padding: 1rem;
    }
  }
  &.dock-open > .feather-dock-resizer {
    position: absolute;
    top: 0;
    bottom: 0;
    /* Make the resizer easier to grab */
    width: var(--feather-dock-resizer-width);
    cursor: ew-resize;
    z-index: var(vars.$zindex-fixed);
    left: calc(var(--feather-dock-width));
    right: auto;
    border-width: 2px;
    background-color: transparent;

    .feather-dock-resizer-handle {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: var(--feather-dock-resizer-width);
      border-radius: 0.125rem;
      background-color: transparent;
      border-left: 2px solid transparent;
      transition: background-color 0.25s ease-in-out 0.25s,
        border-left-color 0.25s ease-in-out 0.25s;

      &:hover {
        background-color: var(--feather-dock-background-color);
        border-left: 2px solid var(--feather-dock-color);
        border-right: none;
      }
    }
  }
  &.dock-open.right > .feather-dock-resizer {
    position: absolute;
    top: 0;
    bottom: 0;
    /* Make the resizer easier to grab */
    width: var(--feather-dock-resizer-width);
    cursor: ew-resize;
    z-index: var(vars.$zindex-fixed);
    left: auto;
    right: calc(var(--feather-dock-width));
    background-color: transparent;
    border-width: 2px;
    background-color: transparent;

    .feather-dock-resizer-handle {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 50%;
      width: var(--feather-dock-resizer-width);
      border-radius: 0.125rem;
      background-color: transparent;
      border-right: 2px solid transparent;
      transition: background-color 0.25s ease-in-out 0.25s,
        border-right-color 0.25s ease-in-out 0.25s;

      &:hover {
        background-color: var(--feather-dock-background-color);
        border-right: 2px solid var(--feather-dock-color);
        border-left: none;
      }
    }
  }
  &.is-resizing {
    transition-duration: 0s;
    > .feather-dock-toggle {
      transition-duration: 0s;
    }
  }
}
</style>
