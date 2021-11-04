<template>
  <div
    class="feather-dialog"
    :class="{ relative: relative }"
    v-show="modelValue"
    ref="element"
  >
    <transition name="fade">
      <div class="backdrop" v-show="modelValue"></div>
    </transition>
    <transition
      name="delayFade"
      v-on:after-enter="shown = true"
      v-on:after-leave="shown = false"
    >
      <FocusTrap :enable="shown && modelValue" class="trap" v-show="modelValue">
        <div
          class="content"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="headerId"
          data-ref-id="feather-dialog"
        >
          <div class="focus-area" tabindex="-1" first-focus>
            <div class="dialog-body">
              <header
                :id="headerId"
                v-if="!hideTitle"
                data-ref-id="feather-dialog-header"
              >
                {{ titleLabel }}
              </header>

              <div class="dialog-content">
                <div v-if="hasIcon" class="icon-wrapper">
                  <slot name="icon" />
                </div>
                <slot />
              </div>
            </div>
            <div
              v-if="hasFooter"
              class="dialog-footer"
              data-ref-id="feather-dialog-footer"
            >
              <slot name="footer" />
            </div>
            <DialogClose
              v-if="!hideClose"
              :close-text="closeLabel"
              @close="close"
              small
            ></DialogClose>
          </div>
        </div>
      </FocusTrap>
    </transition>
  </div>
</template>
<script>
import FocusTrap from "./FocusTrap";
import DialogClose from "./DialogClose";
import { getSafeId } from "@featherds/utils/id";
import { useCloseOnEsc } from "@featherds/composables/modal/CloseOnEsc";
import { useRestoreFocus } from "@featherds/composables/modal/RestoreFocus";
import {
  useHideBodyOverflow,
  useHideRelativeOverflow,
} from "@featherds/composables/modal/HideOverflow";
import { useLabelProperty } from "@featherds/composables/LabelProperty";
import { computed, toRef, ref, watch } from "vue";
const LABELS = {
  title: "REQUIRED",
  close: "Close Dialog",
};
export default {
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  emits: ["update:modelValue", "shown", "hidden"],
  props: {
    modelValue: {
      type: Boolean,
    },
    relative: {
      type: Boolean,
      default: false,
    },
    hideTitle: {
      type: Boolean,
      default: false,
    },
    hideClose: {
      type: Boolean,
      default: false,
    },
    labels: {
      type: Object,
      default() {
        return LABELS;
      },
      validator(v) {
        return !!v.title;
      },
    },
  },
  setup(props, context) {
    const labels = useLabelProperty(toRef(props, "labels"), LABELS);
    const visible = toRef(props, "modelValue");
    const element = ref();
    const close = () => {
      context.emit("update:modelValue", false);
    };
    const hasIcon = computed(() => {
      return !!context.slots.icon;
    });
    const hasFooter = computed(() => {
      return !!context.slots.footer;
    });
    const headerId = computed(() => {
      return getSafeId("dialog-header");
    });

    if (props.relative) {
      useHideRelativeOverflow(visible, element);
    } else {
      useHideBodyOverflow(visible);
    }
    useRestoreFocus(visible);
    watch(useCloseOnEsc(visible), () => {
      close();
    });

    const shown = ref(props.modelValue);
    watch(shown, (v) => {
      if (v) {
        context.emit("shown");
      } else {
        context.emit("hidden");
      }
    });

    return { close, hasIcon, hasFooter, headerId, element, shown, ...labels };
  },
  components: {
    FocusTrap,
    DialogClose,
  },
};
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/mixins/typography";
.feather-dialog {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var($zindex-modal);
  &.relative {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: auto;
    width: auto;
  }
}

.content {
  z-index: 1;
  background-color: var($surface);
  border-radius: 2px;
  @include elevation(24);
  position: relative;
  margin: 0 $spacing-xl;
}

//fixing UISPRT-171 - removing focus outlines
.content,
.focus-area {
  &:focus-visible {
    outline: none;
  }
}

.dialog-body {
  padding: 24px;
  color: var($secondary-text-on-surface);
  header {
    color: var($primary-text-on-surface);
    @include headline4();
    margin-bottom: 24px;
    line-height: 1.25em;
  }
  p {
    padding: 0;
  }
}
.dialog-footer {
  padding: 8px;
  text-align: right;
  :deep(.btn) {
    margin: 0;
  }
  :deep(.btn + .btn) {
    margin-left: 8px;
  }
}

.dialog-content {
  display: flex;
  font-size: 38px;
  .icon-wrapper {
    padding-right: 32px;
    line-height: 1.25em;
  }
}

:deep(.closeButton) {
  margin-top: 13px;
  margin-right: 13px;
}

.trap {
  z-index: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.delayFade-enter-active,
.delayFade-leave-active {
  transition: opacity 0.5s ease;
  transition-delay: 200ms;
}
.delayFade-enter-to,
.delayFade-leave-from {
  opacity: 1;
}
.delayFade-enter-from,
.delayFade-leave-to {
  opacity: 0;
}

.backdrop {
  flex: none;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: var($disabled-text-on-surface);
  &.transparent {
    background-color: transparent;
  }
}
.relative {
  .backdrop {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    height: auto;
    width: auto;
  }
}
</style>
