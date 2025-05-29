<template>
  <div :class="dockClasses" :id="id">
    <div class="feather-dock-toggle-container">
      <FeatherButton
        class="feather-dock-toggle"
        @click="toggleDock"
        :aria-expanded="dockConfig.isOpen"
        :aria-label="dockConfig.isOpen ? labels.collapse : labels.expand"
        data-ref-id="feather-dock-toggle"
        :icon="dockConfig.isOpen ? 'Menu Close' : 'Menu Open'"
      >
        <FeatherIcon :icon="dockConfig.isOpen ? MenuClose : MenuOpen" />
      </FeatherButton>
    </div>
    <div class="feather-dock-content">
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
  </div>
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
  collapsedWidth: "4rem",
  pushedSelector: undefined,
  labels: () => ({
    expand: "Expand dock",
    collapse: "Collapse dock",
  }),
});

const emit = defineEmits([
  "update:modelValue",
  "update:dock-expanded",
  "update:dock-collapsed",
]);

const isDockOpen = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal: boolean) => {
    if (newVal !== isDockOpen.value) {
      isDockOpen.value = newVal;
      updatePushedElement();
      console.log(
        `Dock state changed to ${isDockOpen.value ? "open" : "closed"}`
      );
    }
  },
  { immediate: true }
);

const dockClasses = computed(() => {
  return {
    "feather-dock": true,
    "dock-open": isDockOpen.value,
    "dock-closed": !isDockOpen.value,
    [props.location]: true,
  };
});

const dockConfig = computed<DockConfig>(() => ({
  id: props.id,
  location: props.location,
  isOpen: isDockOpen.value,
}));

const width = computed(() => {
  return dockConfig.value.isOpen ? props.expandedWidth : props.collapsedWidth;
});

const toggleDock = () => {
  isDockOpen.value = !isDockOpen.value;
  emit("update:modelValue", isDockOpen.value);

  isDockOpen.value
    ? emit("update:dock-expanded")
    : emit("update:dock-collapsed");

  updatePushedElement();
};

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

const updatePushedElement = () => {
  if (!props.pushedSelector) return;

  // If string, convert to array for unified processing
  const selectors = Array.isArray(props.pushedSelector)
    ? props.pushedSelector
    : [props.pushedSelector];
  selectors.forEach((selector) => {
    console.log("Updating pushed element:", selector);
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

        const widthFromProps = dockConfig.value.isOpen
          ? props.expandedWidth
          : props.collapsedWidth;
        const widthInPx = dockConfig.value.isOpen
          ? expandedWidthPx.value
          : collapsedWidthPx.value;

        // If the element is in the normal flow, we need to adjust the margin
        if (isInFlow) {
          console.log(
            "Inflow element found:",
            selector,
            position,
            widthFromProps
          );
          const marginProperty =
            dockConfig.value.location === "left"
              ? "margin-left"
              : "margin-right";

          element.style.setProperty(marginProperty, widthFromProps);
        } else {
          console.warn("Outflow element found:", selector, position, widthInPx);
          console.warn("Outflow not supported yet");
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

onMounted(() => {
  updatePushedElement();
});

onUnmounted(() => {
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
            console.log("Inflow element found:", selector, position);
            element.style.removeProperty(
              dockConfig.value.location === "left"
                ? "margin-left"
                : "margin-right"
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
}
</style>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/mixins/elevation" as elev;

.feather-dock {
  --feather-dock-background-color: var(#{vars.$hero-gradient-1-1}),
    var(#{vars.$hero-gradient-2-3}), var(#{vars.$hero-gradient-2-3});
  --feather-dock-width: v-bind("width");
  position: fixed;
  inset: 0 0 0 0;
  border-radius: 0.25rem;
  padding-top: 3rem;
  padding-inline: 0.625rem;

  width: var(--feather-dock-width);

  overflow-y: scroll;
  scroll-behavior: smooth;
  scrollbar-gutter: stable;
  scrollbar-width: thin;

  @include elev.elevation(16);
  transition: width 0.3s ease-in-out;
  background: var(--feather-dock-background-color);
  &.right {
    inset: 0 0 0 auto;
    .feather-dock-toggle-container {
      justify-content: flex-start;
      .feather-dock-toggle {
        transform: rotate(180deg);
      }
    }
  }
  .feather-dock-toggle-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
    background: none;
    margin-block: 1.25rem;
    transition: all 0.3s ease-in-out;
    .feather-dock-toggle {
      padding-inline: 1rem;
    }
  }

  &.dock-open {
    background-color: var(vars.$surface);
  }
  &.dock-closed {
    background-color: var(vars.$surface);
    scrollbar-width: none;
    &.right,
    &.left {
      .feather-dock-toggle-container {
        justify-content: center;
      }
    }
  }
}
</style>
