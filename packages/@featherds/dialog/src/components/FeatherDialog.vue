<template>
  <div
    class="feather-dialog"
    :class="{ relative: relative }"
    v-show="modelValue"
  >
    <transition name="fade">
      <div class="backdrop" v-show="modelValue"></div>
    </transition>
    <transition
      name="delayFade"
      v-on:after-enter="shown = true"
      v-on:after-leave="shown = false"
    >
      <FocusTrap
        :enable="shown && modelValue"
        class="trap"
        v-show="modelValue"
        :layer="layer"
      >
        <div
          class="content"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="headerId"
          data-ref-id="feather-dialog"
          ref="element"
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
<script lang="ts">
import FocusTrap from "./FocusTrap.vue";
import DialogClose from "./DialogClose.vue";
import { getSafeId } from "@featherds/utils/id";
import { useCloseOnEsc } from "@featherds/composables/modal/CloseOnEsc";
import { useRestoreFocus } from "@featherds/composables/modal/RestoreFocus";
import {
  useHideBodyOverflow,
  useHideRelativeOverflow,
} from "@featherds/composables/modal/HideOverflow";
import { useLabelProperty } from "@featherds/composables/LabelProperty";
import {
  computed,
  toRef,
  ref,
  watch,
  defineComponent,
  PropType,
  Ref,
} from "vue";
import {
  removeLayer,
  addLayer,
  ILayer,
} from "@featherds/composables/modal/Layers";
const LABELS = {
  title: "REQUIRED",
  close: "Close Dialog",
};
export const props = {
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
    type: Object as PropType<typeof LABELS>,
    default: () => {
      return LABELS;
    },
    validator: (v: Partial<typeof LABELS>) => {
      return !!v.title;
    },
  },
};
export const emits = {
  "update:modelValue": (value: boolean) => true,
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
    const visible = toRef(props, "modelValue");
    const element = ref();
    const close = () => {
      context.emit("update:modelValue", false);
    };

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
    const layer = ref() as Ref<ILayer>;
    watch(shown, (v) => {
      if (v) {
        context.emit("shown");
        layer.value = addLayer(element, "modal");
      } else {
        context.emit("hidden");
        removeLayer(layer.value);
      }
    });

    return { close, hasFooter, headerId, element, shown, layer, ...labels };
  },
  components: {
    FocusTrap,
    DialogClose,
  },
});
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
  margin: 0 var($spacing-xl);
}

//fixing UISPRT-171 - removing focus outlines
.content,
.focus-area {
  &:focus-visible {
    outline: none;
  }
}

.dialog-body {
  padding: 1.5rem;
  color: var($secondary-text-on-surface);
  header {
    color: var($primary-text-on-surface);
    @include headline4();
    margin-bottom: 1.5rem;
    line-height: 1.25em;
  }
  p {
    padding: 0;
  }
}
.dialog-footer {
  padding: 0.5rem;
  text-align: right;
  :deep(.btn) {
    margin: 0;
  }
  :deep(.btn + .btn) {
    margin-left: 0.5rem;
  }
}

.dialog-content {
  display: flex;
}

:deep(.closeButton) {
  margin-top: 0.8125rem;
  margin-right: 0.8125rem;
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
