<template>
  <component
    v-if="$slots.content || active"
    :is="tag"
    class="feather-alert-wrapper"
    :role="isBanner ? 'banner' : type == 'error' ? 'alertdialog' : 'alert'"
    :aria-live="type === 'error' ? 'assertive' : 'polite'"
    aria-atomic="true"
    :tabindex="0"
    ref="alertRef"
    @keydown.esc="closeable ? close() : null"
  >
    <span
      class="feather-alert"
      :class="classes"
      :id="alertId"
      :aria-labelledby="`${alertId}-title`"
      :aria-describedby="$slots.content ? contentId : undefined"
    >
      <div class="status">
        <FeatherStatus
          :status="type"
          :dimension="ALERT_ICON_SIZE"
          class="status-svg"
        />
        <span
          class="status-text"
          ref="statusTextRef"
          :id="`${alertId}-title`"
          >{{ message }}</span
        >
      </div>
      <div v-if="$slots.actions !== undefined" class="feather-alert__actions">
        <slot name="actions"></slot>
      </div>
      <FeatherButton
        v-if="closeable"
        icon="Close"
        @click="close"
        :aria-label="`Close ${type} alert: ${message}`"
      >
        <FeatherIcon :icon="Cancel" />
      </FeatherButton>
    </span>
    <div
      v-if="$slots.content"
      class="feather-alert__content"
      :id="contentId"
      :aria-labelledby="alertId"
    >
      <slot name="content"></slot>
    </div>
  </component>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  useSlots,
  watch,
  inject,
  onMounted,
  nextTick,
  onBeforeUnmount,
} from "vue";
import { AlertProps, type AlertType } from "../types";
import { FeatherButton } from "@featherds/button";
import { FeatherIcon } from "@featherds/icon";
import { FeatherStatus } from "@featherds/status";
import { useStatusColors } from "@featherds/composables/status/color";

import { getSafeId } from "@featherds/utils/id";
import Cancel from "@featherds/icon/navigation/Cancel";

const ALERT_ICON_SIZE = 20;

const props = withDefaults(defineProps<AlertProps>(), {
  type: "info",
  message: "Info",
  active: true,
  banner: false,
  closeable: false,
  tag: "div",
});

const emit = defineEmits<{
  (e: "update:active", value: boolean): void;
  (e: "update:type", value: AlertType): void;
  (e: "update:message", value: string): void;
  (e: "update:closeable", value: boolean): void;
  // (e: "update:sticky", value: boolean): void;
  (e: "close"): void;
}>();

const dockContext = inject("featherAlertDockContext", {
  docked: false,
  dock: "top",
});

const slots = useSlots();

const colors = useStatusColors(props.type, 0.2);

const alertRef = ref<HTMLElement | null>(null);

const statusTextRef = ref<HTMLElement | null>(null);
const statusTextDimensions = ref({
  height: 0,
  lineHeight: 0,
  lines: 0,
});

/**
 * Updates the dimensions of the status text element.
 * This function calculates the height, line height, and number of lines
 * based on the scroll height of the status text element.
 */
const updateStatusTextDimensions = () => {
  if (statusTextRef.value) {
    const contentHeight = statusTextRef.value.scrollHeight;
    const style = window.getComputedStyle(statusTextRef.value);
    const lineHeight = parseFloat(style.lineHeight);
    const lines = Math.floor(contentHeight / lineHeight);

    statusTextDimensions.value = {
      height: contentHeight,
      lineHeight: lineHeight,
      lines: lines,
    };
  }
};

const alertId = computed(() => getSafeId("feather-alert"));
const contentId = computed(() => getSafeId("feather-alert-content"));

const type = ref<AlertType>(props.type);
const message = ref<string>(props.message);
const active = ref<boolean>(props.active);
const closeable = ref<boolean>(props.closeable);

const banner = computed(() => dockContext.docked || props.banner);

// Can only be set from docked context
const sticky = computed(() => dockContext.docked);
const anchoredTo = computed(() => dockContext.dock);

const classes = computed(() => {
  return {
    "feather-alert__active": active.value,
    "feather-alert__banner": banner.value,
    "feather-alert__has-actions": slots.actions !== undefined,
    "feather-alert__has-content": slots.content !== undefined,
    "feather-alert__closeable": closeable.value,
    "feather-alert__sticky": sticky.value,
    top: anchoredTo.value === "top",
    bottom: anchoredTo.value === "bottom",
    [type.value]: true,
    [`feather-alert__${type.value}`]: true,
    [`feather-alert__verbose`]: isVerboseAlert.value,
  };
});

const tag = computed(() => {
  let mappedTag = props.tag;
  // mappedTag = isTopBanner.value ? "header" : mappedTag;
  // mappedTag = isBottomBanner.value ? "footer" : mappedTag;
  return mappedTag;
});

const isTopBanner = computed(
  () => banner.value && sticky.value && anchoredTo.value === "top"
);
const isBottomBanner = computed(
  () => banner.value && sticky.value && anchoredTo.value === "bottom"
);
const isBanner = computed(() => isTopBanner.value || isBottomBanner.value);

const isVerboseAlert = computed(() => {
  return statusTextDimensions.value.lines > 2;
});

const announceAlertClosed = () => {
  // Create and trigger an announcement when alert is closed
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", "polite");
  announcement.setAttribute("class", "sr-only");
  announcement.textContent = `${type.value} alert dismissed`;
  announcement.setAttribute("tabindex", "-1");
  announcement.setAttribute("role", "alert");
  announcement.setAttribute("aria-hidden", "true");
  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 6000);
};

const close = () => {
  active.value = false;
  emit("update:active", active.value);
  emit("close");
  announceAlertClosed();
};

/**
 * Watches for changes in props and syncs the local reactive properties,
 * emitting corresponding update events whenever a prop value changes.
 * This ensures the component's internal state stays in sync with its props,
 * while properly notifying parent components of any changes.
 */
watch(
  [
    () => props.active,
    () => props.type,
    () => props.message,
    () => props.closeable,
  ],
  (
    [newActive, newType, newMessage, newCloseable],
    [prevActive, prevType, prevMessage, prevCloseable]
  ) => {
    if (newActive !== prevActive) {
      active.value = newActive;
      emit("update:active", newActive);
    }
    if (newType !== prevType) {
      type.value = newType;
      emit("update:type", newType);
    }
    if (newMessage !== prevMessage) {
      message.value = newMessage;
      emit("update:message", newMessage);
    }
    if (newCloseable !== prevCloseable) {
      closeable.value = newCloseable;
      emit("update:closeable", newCloseable);
    }
  }
);

watch(message, () => {
  nextTick(() => {
    updateStatusTextDimensions();
  });
});

onMounted(() => {
  updateStatusTextDimensions();

  window.addEventListener("resize", updateStatusTextDimensions);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateStatusTextDimensions);
  if (alertRef.value) {
    alertRef.value.removeAttribute("aria-live");
  }
});
</script>

<style lang="scss">
@use "@featherds/styles/mixins/typography" as typo;

.sr-only {
  @include typo.screen-reader();
}
</style>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/themes/utils" as utils;

.feather-alert-wrapper {
  border-radius: 0.25rem;
  &:hover {
    border-color: utils.alpha(
      vars.$state-color-on-surface,
      var(vars.$state-opacity-hover-on-surface)
    );
  }
  &:focus-within,
  &:focus-visible {
    border-color: var(vars.$text-button-primary, var(vars.$primary));
    &:not(.feather-alert-wrapper) {
      text-decoration: underline;
      text-underline-offset: 0.25rem;
    }
  }
  &:has(> .feather-alert.feather-alert__banner) {
    display: grid;
    grid-template-columns:
      [full-start] minmax(1rem, 1fr)
      [content-start] min(100% - 2rem, 100ch)
      [content-end] minmax(1rem, 1fr)
      [full-end];
    margin-bottom: 1rem;
    > .feather-alert.feather-alert__banner {
      grid-column: full-start / full-end;
      border: unset;
      border-radius: 0;
      width: 100%;
      margin: 0;
    }
    > *:not(.feather-alert__banner) {
      grid-column: content-start / content-end;
    }
  }

  &:has(> .feather-alert__active) {
    margin-bottom: 1rem;
  }
  // for a .feather-alert-wrapper that contains another .feather-alert-wrapper
  // add a bottom margin to the inner .feather-alert (before the content)
  &:has(.feather-alert-wrapper > .feather-alert.feather-alert__active)
    > .feather-alert {
    margin-bottom: 1rem;
  }
  &:has(> .feather-alert__content) > .feather-alert.feather-alert__active {
    margin-bottom: unset;
  }

  //  /\  feather-alert__wrapper  /\
  //----------------------------------
  //  \/      feather-alert       \/

  > .feather-alert {
    display: grid;
    grid-template-columns: 1fr auto auto;
    transition: all 0.5s ease-in-out;
    border-radius: 0.25rem;
    line-height: 1.25;
    padding: 0.5rem;
    &.feather-alert__active {
      min-height: 3.125rem;
    }
    &.feather-alert__verbose {
      & > .status {
        align-items: flex-start;
      }
    }
    background-color: v-bind("colors.bgColorAlpha");
    > .status {
      display: inline-flex;
      align-items: center;
      padding: 0.125rem 0.25rem;
      margin: 0 0.25rem 0 0;
      > .status-svg {
        fill: v-bind("colors.iconColor");
        padding-inline-end: 0.25rem;
      }
      > .status-text {
        display: inline-block;
        color: v-bind("colors.color");
        margin-inline-start: 0.125rem;
        padding-inline-start: 0.5rem;
      }
    }

    &.feather-alert__active {
      &.feather-alert__has-content {
        border-radius: 0.25rem 0.25rem 0 0;
        border-bottom: unset;
        & + .feather-alert__content {
          border-radius: 0 0 0.25rem 0.25rem;
          border-top: unset;
          background-color: utils.alpha(vars.$primary, 0.04);
          padding: 0.5rem;
        }
      }
    }
    &:not(.feather-alert__active) {
      overflow: hidden;
      opacity: 0;
      height: 0;
      padding: unset;
      margin: unset;
      border: unset;
    }
  }
  &
    > .feather-alert.feather-alert__active.feather-alert__banner.feather-alert__sticky {
    border-radius: 0;
    background-color: var(vars.$surface);
    color: var(vars.$primary-text-on-color);
    background-color: v-bind("colors.bgColor");

    > .status {
      > :deep(.status-svg) {
        fill: var(vars.$primary-text-on-color);
      }
      > :deep(.status-text) {
        color: var(vars.$primary-text-on-color);
      }
    }

    > .feather-alert__actions,
    &.feather-alert__closeable {
      :deep(.btn) {
        color: var(vars.$primary-text-on-color);
      }
    }
    &.feather-alert__warning {
      :deep(.btn) {
        color: var(vars.$primary-text-on-warning);
      }
      .status {
        > .status-svg {
          fill: var(vars.$primary-text-on-warning);
        }
        .status-text {
          color: var(vars.$primary-text-on-warning);
        }
      }
    }
  }
  & > :not(.feather-alert__active) {
    margin: unset;
    padding: unset;
  }
}
</style>
