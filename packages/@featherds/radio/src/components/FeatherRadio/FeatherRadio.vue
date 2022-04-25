<template>
  <div class="layout-container">
    <div
      class="feather-radio"
      role="radio"
      ref="input"
      :id="id"
      :aria-checked="vm.checked ? 'true' : 'false'"
      :aria-disabled="vm.disabled ? 'true' : 'false'"
      :aria-labelledby="labelId"
      :tabindex="tabindex"
      @click="click"
      @blur="blur"
      data-ref-id="feather-radio"
    >
      <div class="radio hover focus">
        <div class="icon" aria-hidden="true">
          <svg class="dot">
            <circle
              cx="50%"
              cy="50%"
              r="0.3125rem"
              stroke="black"
              stroke-width="0"
            />
          </svg>
        </div>
        <feather-ripple center v-if="!vm.disabled" />
      </div>

      <span class="label" data-ref-id="feather-radio-label" :id="labelId">
        <slot />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { getSafeId } from "@featherds/utils/id";
import { FeatherRipple } from "@featherds/ripple";
import {
  computed,
  defineComponent,
  inject,
  PropType,
  reactive,
  Ref,
  ref,
  watch,
} from "vue";
import { IRadio } from "@featherds/composables/radio/Selection";
export const props = {
  value: {
    type: [String, Number, Boolean, Array, Object, Date, Function] as PropType<
      string | number | boolean | unknown[] | unknown | Date | Function
    >,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
} as const;
export default defineComponent({
  props,
  setup(props) {
    const input = ref() as Ref<HTMLElement>;
    const focus = () => {
      input.value.focus();
    };
    const id = computed(() => {
      return getSafeId("feather-radio-button");
    });
    const vm = reactive({
      first: false,
      focus,
      disabled: props.disabled,
      value: props.value,
      checked: false,
      id: id.value,
    }) as IRadio;

    const labelId = computed(() => getSafeId("radio-label-id"));
    const tabindex = computed(() => {
      if (vm.first) {
        return 0;
      }
      return vm.checked ? 0 : -1;
    });
    watch(
      () => props.disabled,
      (v) => {
        vm.disabled = v;
      },
      { immediate: true }
    );
    watch(
      () => props.value,
      (v) => {
        vm.value = v;
      },
      { immediate: true }
    );

    //register
    const register = inject("register", (_radio: IRadio) => {});
    const blur = inject("blur", (_e: FocusEvent) => {});
    const select = inject("select", (_radio: IRadio) => {});

    register(vm);
    const click = () => {
      select(vm);
    };

    return {
      labelId,
      tabindex,
      vm,
      blur,
      click,
      input,
      id,
    };
  },
  components: {
    FeatherRipple,
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/themes/utils";

.feather-radio {
  &:focus {
    outline: 0;
  }
  @include state-on-surface();
}
.layout-container {
  display: inline-block;
  line-height: 0;
}

.feather-radio {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  margin-left: -0.5rem;
  .radio {
    height: 2.25rem;
    width: 2.25rem;
    display: inline-block;
    padding: 0.5rem;
    border-radius: 100%;
  }
  .icon {
    height: 1.25rem;
    width: 1.25rem;
    border: 2px solid var($secondary-text-on-surface);
    background-color: transparent;
    border-radius: 100%;
    position: relative;
  }
  .dot {
    position: absolute;
    height: 100%;
    width: 100%;
    fill: var($primary);
    border-radius: 100%;
    opacity: 0;
    transform: scale(0);
  }
  .label {
    @include body-small();
    color: var($primary-text-on-surface);
    min-width: 1.5rem;
    padding-right: 0.75rem;
    padding-left: 0.25rem;
  }
}

.feather-radio:hover {
  &[aria-disabled="true"] {
    cursor: default;
  }
}

.feather-radio[aria-checked="true"] {
  .icon {
    border-color: var($primary);
  }
  .dot {
    transition: all 280ms ease-in-out;
    opacity: 1;
    transform: scale(1);
  }
}
.feather-radio[aria-disabled="true"] {
  @include state-disabled();
  .icon {
    border-color: var($disabled-text-on-surface);
  }
  .label {
    color: var($disabled-text-on-surface);
  }
  .dot {
    fill: var($disabled-text-on-surface);
  }
}
</style>
