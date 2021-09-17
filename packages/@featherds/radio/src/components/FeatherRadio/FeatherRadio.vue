<template>
  <div class="layout-container">
    <div
      class="feather-radio"
      role="radio"
      ref="input"
      :aria-checked="checked ? 'true' : 'false'"
      :aria-disabled="disabled ? 'true' : 'false'"
      :aria-labelledby="labelId"
      :tabindex="tabindex"
      @click="click"
      @blur="blur"
      data-ref-id="feather-radio"
    >
      <div class="radio hover focus">
        <div class="icon" aria-hidden="true">
          <svg height="16" width="16" class="dot">
            <circle cx="8" cy="8" r="5" stroke="black" stroke-width="0" />
          </svg>
        </div>
        <feather-ripple center v-if="!disabled" />
      </div>

      <span class="label" data-ref-id="feather-radio-label" :id="labelId">
        <slot />
      </span>
    </div>
  </div>
</template>
<script>
import { getSafeId } from "@featherds/utils/id";
import { FeatherRipple } from "@featherds/ripple";
import { computed, inject, ref } from "vue";
export default {
  props: {
    value: undefined,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const first = ref(false);
    const checked = ref(false);
    const labelId = computed(() => getSafeId("radio-label-id"));
    const tabindex = computed(() => {
      if (first.value) {
        return 0;
      }
      return checked.value ? 0 : -1;
    });

    const input = ref(null);
    const focus = () => {
      input.value.focus();
    };

    //register
    const register = inject("register");
    const blur = inject("blur");
    const select = inject("select");

    const vm = {
      first,
      focus,
      disabled: props.disabled,
      value: props.value,
      checked,
    };
    register(vm);
    const click = () => {
      select(vm);
    };

    return {
      labelId,
      tabindex,
      first,
      blur,
      click,
      input,
      checked,
    };
  },
  components: {
    FeatherRipple,
  },
};
</script>

<style lang="scss" scoped>
@import "~@featherds/styles/mixins/typography";
@import "~@featherds/styles/themes/variables";
@import "~@featherds/styles/themes/utils";

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
  margin-left: -8px;
  .radio {
    height: 36px;
    width: 36px;
    display: inline-block;
    padding: 8px;
    border-radius: 100%;
  }
  .icon {
    height: 20px;
    width: 20px;
    border: 2px solid var($secondary-text-on-surface);
    background-color: transparent;
    border-radius: 100%;
    position: relative;
  }
  .dot {
    position: absolute;
    height: 16px;
    width: 16px;
    fill: var($primary);
    border-radius: 100%;
    opacity: 0;
    transform: scale(0);
  }
  .label {
    @include body-small();
    color: var($primary-text-on-surface);
    min-width: 24px;
    padding-right: 12px;
    padding-left: 4px;
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
