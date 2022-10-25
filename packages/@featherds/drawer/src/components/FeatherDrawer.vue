<template>
  <Teleport to="body">
    <div class="drawer-container feather-styles" v-bind="$attrs">
      <transition name="greyOutShim">
        <div v-if="modelValue" class="greyedOut"></div>
      </transition>
      <transition
        :name="left ? 'drawer-left' : 'drawer'"
        v-on:after-enter="shown = true"
        v-on:after-leave="shown = false"
      >
        <focus-trap
          v-if="modelValue"
          :enable="modelValue"
          :style="{ width: width }"
          :key="'sect'"
          class="content"
          ref="element"
          :class="{ left: left }"
        >
          <div
            :aria-label="titleLabel"
            ref="drawer"
            role="dialog"
            aria-modal="true"
            data-ref-id="feather-drawer"
            tabindex="-1"
            first-focus
          >
            <div class="slot">
              <slot></slot>
            </div>
            <dialog-close
              :close-text="closeLabel"
              @close="close"
            ></dialog-close>
          </div>
        </focus-trap>
      </transition>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { FocusTrap, DialogClose } from "@featherds/dialog";
import { useCloseOnEsc } from "@featherds/composables/modal/CloseOnEsc";
import { useRestoreFocus } from "@featherds/composables/modal/RestoreFocus";
import { useHideBodyOverflow } from "@featherds/composables/modal/HideOverflow";
import { useLabelProperty } from "@featherds/composables/LabelProperty";
import {
  toRef,
  watch,
  ref,
  defineComponent,
  PropType,
  Ref,
  ComponentPublicInstance,
} from "vue";
const LABELS = {
  title: "REQUIRED",
  close: "Close Dialog",
};
export const props = {
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
  width: {
    type: String,
    default: "auto",
    validator: (value: string) => {
      if (value === "auto") {
        return true;
      }
      return /(\d*)(px|%|em|vw)/.test(value);
    },
  },
  left: {
    type: Boolean,
    default: false,
  },
  labels: {
    type: Object as PropType<Partial<typeof LABELS>>,
    default: () => {
      return LABELS;
    },
    validator: (v: Partial<typeof LABELS>) => {
      return !!v.title;
    },
  },
} as const;
export const emits = {
  "update:modelValue": (_value: boolean) => true,
  shown: () => true,
  hidden: () => true,
};
export default defineComponent({
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  emits,
  props,
  setup(props, context) {
    const labels = useLabelProperty<typeof LABELS>(
      toRef(props, "labels"),
      LABELS
    );
    const isShown = toRef(props, "modelValue");
    const close = () => {
      context.emit("update:modelValue", false);
    };

    useHideBodyOverflow(isShown);
    useRestoreFocus(isShown);
    watch(useCloseOnEsc(isShown), () => {
      close();
    });
    const element = ref() as Ref<ComponentPublicInstance>;
    const shown = ref(false);
    watch(shown, (v) => {
      if (v) {
        context.emit("shown");
      } else {
        context.emit("hidden");
      }
    });
    return { close, shown, isShown, element, ...labels };
  },
  components: {
    DialogClose,
    FocusTrap,
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/elevation";
.greyedOut {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: var($zindex-modal-backdrop);
  background-color: var($lightbox-background);
}

.content {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  z-index: var($zindex-modal);
  background-color: var($surface);
  margin-left: 3.5rem;
  @include elevation(8);
  &.left {
    right: unset;
    left: 0;
    margin-right: 3.5rem;
    margin-left: 0px;
  }
  :deep(.focus-trap-content) {
    height: 100%;
  }
}

.slot,
[role="dialog"] {
  height: 100%;
}

/* Transitions */
.drawer-enter-active,
.drawer-leave-active,
.drawer-left-enter-active,
.drawer-left-leave-active {
  transition: transform 0.3s cubic-bezier(0.2, 0.6, 0.4, 1);
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}
.drawer-left-enter-from,
.drawer-left-leave-to {
  transform: translateX(-100%);
}

.greyOutShim-enter-active,
.greyOutShim-leave-active {
  transition: opacity 0.3s ease-in;
}

.greyOutShim-enter-from,
.greyOutShim-leave-to {
  opacity: 0;
}
.content :deep([data-lock]),
.content :deep(.focus-trap-content) {
  height: 100%;
}
</style>
