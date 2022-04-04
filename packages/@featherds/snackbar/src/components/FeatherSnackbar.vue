<template>
  <div class="feather-snackbar-wrapper" v-if="modelValue || contentShow">
    <div
      class="feather-snackbar"
      data-ref-id="feather-snackbar"
      :class="{
        'fade-in': internalValue,
        'fade-out': contentShow && !internalValue,
        center: center,
        error: error,
      }"
      @animationend="closed"
      @keydown="keyPressed"
      @mouseover="stopTimer"
      @mouseleave="resumeTimer"
      @focusin="stopTimer"
      @focusout="resumeTimer"
    >
      <div class="content-wrapper" role="status" aria-live="polite">
        <div
          class="content"
          v-if="contentShow"
          data-ref-id="feather-snackbar-content"
        >
          <slot />
        </div>
      </div>
      <div class="button" data-ref-id="feather-snackbar-button">
        <slot name="button"> </slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, inject, watch, toRef, nextTick, defineComponent, Ref } from "vue";
import { KEYCODES } from "@featherds/utils/keys";
export const props = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  center: {
    type: Boolean,
    default: false,
  },
  timeout: {
    type: Number,
    default: 4000,
  },
  error: {
    type: Boolean,
    default: false,
  },
} as const;
export const emits = {
  "update:modelValue": (v: boolean) => true,
  closed: () => true,
};
export default defineComponent({
  emits,
  props,
  setup(props, context) {
    const hideTimeout = ref() as Ref<ITimer>;
    const contentShow = ref(false);
    const internalValue = ref(false);
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const incomingValue = toRef(props, "modelValue");
    const queueSnackbar = inject(
      "queueSnackbar",
      false as false | ((id: number, internalVal: Ref<boolean>) => void)
    );
    const unqueueSnackbar = inject(
      "unqueueSnackbar",
      false as false | ((id: number) => void)
    );
    const nextSnackbar = inject("nextSnackbar", () => {});
    interface ITimer {
      pause: () => void;
      resume: () => void;
    }
    const timer = (callback: () => void, duration: number): ITimer => {
      let id: number,
        start: number,
        remaining = duration;
      const pause = () => {
        if (!id) return;
        window.clearTimeout(id);
        id = -1;
        remaining -= Date.now() - start;
      };
      const resume = () => {
        if (id) return;
        start = Date.now();
        id = window.setTimeout(callback, remaining);
      };
      resume();
      return { pause: pause, resume: resume };
    };

    const closed = () => {
      contentShow.value = false;
      context.emit("closed");
      if (nextSnackbar) nextSnackbar();
    };

    const keyPressed = (e: KeyboardEvent) => {
      if (e.keyCode === KEYCODES.ESCAPE) {
        internalValue.value = false;
      }
    };

    const stopTimer = () => {
      hideTimeout.value.pause();
    };

    const resumeTimer = () => {
      if (internalValue.value) hideTimeout.value.resume();
    };

    watch(
      incomingValue,
      (v) => {
        if (v) {
          nextTick(() => {
            queueSnackbar === false
              ? (internalValue.value = v)
              : queueSnackbar(id, internalValue);
          });
        } else {
          unqueueSnackbar === false
            ? (internalValue.value = v)
            : unqueueSnackbar(id);
        }
      },
      { immediate: true }
    );

    watch(internalValue, (v) => {
      if (v) {
        contentShow.value = true;
        hideTimeout.value = timer(() => {
          internalValue.value = false;
        }, props.timeout);
        console.log("setting timer");
      } else {
        context.emit("update:modelValue", false);
        stopTimer();
      }
    });

    return {
      hideTimeout,
      contentShow,
      internalValue,
      id,
      incomingValue,
      closed,
      keyPressed,
      stopTimer,
      resumeTimer,
    };
  },
});
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/mixins/typography";

.feather-snackbar-wrapper {
  display: flex;
  position: fixed;
  width: 100%;
  bottom: 0px;
  right: 0px;
  padding: 24px;
  pointer-events: none;
  z-index: var(--feather-current-zindex, var($zindex-popover));

  .feather-snackbar {
    display: flex;
    flex-wrap: wrap;
    @include elevation(6);
    border-radius: 4px;
    background-color: var($high-visibility-on-surface);
    padding: 0.75rem 0 0.75rem 1rem;
    max-width: 540px;
    overflow: visible;
    margin-left: auto;
    opacity: 0;
    transform: translateY(12px);
    pointer-events: none;

    &.center {
      margin-right: auto;
    }

    .content-wrapper,
    .button {
      display: flex;
      align-items: center;
    }

    .content-wrapper {
      @include body-small();
      color: var($secondary-text-on-color);
      min-width: calc(160px + 1rem);
      max-width: calc(400px + 1rem);
      padding-right: 1rem;
    }
    .button {
      margin-left: auto;
      padding: 0 0.5rem 0 0.5rem;
      & :deep(.btn-text) {
        color: var($high-visibility-text-on-surface);
        &:focus {
          border-color: var($high-visibility-text-on-surface);
        }
      }
      color: var($secondary-text-on-color);
    }

    &.error {
      background-color: var($error);
      .content-wrapper {
        color: var($secondary-text-on-color);
      }
      :deep(.btn-text) {
        color: var($primary-text-on-color);
        &:focus {
          border-color: var($primary-text-on-color);
        }
      }
    }

    @keyframes fadeout {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      99% {
        opacity: 0;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(12px);
      }
    }
    &.fade-out {
      animation-duration: 280ms;
      animation-name: fadeout;
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      opacity: 0;
      transform: translateY(12px);
    }
    &.fade-in {
      transition: all 280ms;
      transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
  }
}
</style>
