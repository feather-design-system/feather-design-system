<template>
  <div class="feather-input-wrapper-container" :class="containerCls">
    <fieldset aria-hidden="true" class="feather-input-border">
      <legend>{{ label }}</legend>
    </fieldset>
    <label
      class="feather-input-label"
      :for="inputId"
      data-ref-id="feather-form-element-label"
      >{{ label }}</label
    >
    <div class="feather-input-wrapper" @click="handleWrapperClick">
      <div class="prefix">
        <slot name="pre" />
      </div>
      <slot />
      <div class="post">
        <ClearIcon
          :clear="computedClearText"
          v-if="showClear && computedClearText"
          @clear="$emit('clear')"
        />
        <ErrorIcon v-if="error" />
        <slot name="post" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import ClearIcon from "./ClearIcon.vue";
import ErrorIcon from "./ErrorIcon.vue";
import { inject, computed, defineComponent, ExtractPropTypes, Ref } from "vue";
import { InputWrapperProps } from "../composables/InputWrapper";
export const props = {
  for: {
    type: String,
    required: true,
  },
  focused: {
    type: Boolean,
    default: false,
  },
  showClear: {
    type: Boolean,
    default: false,
  },
  clearText: {
    type: String,
  },
  raised: {
    type: Boolean,
    default: false,
  },
};
export const emits = {
  clear: () => true,
  "wrapper-click": (e: MouseEvent) => true,
};
export default defineComponent({
  emits,
  props,
  data() {
    return {
      prefixWidth: 0,
      prefixObserver: undefined as unknown as MutationObserver,
    };
  },
  setup() {
    const options = inject(
      "wrapperOptions",
      {} as ExtractPropTypes<typeof InputWrapperProps>
    );
    const errorMessage = inject(
      "validationErrorMessage",
      false as false | Ref<string>
    );
    const error = computed(() => {
      if (options.error) {
        return options.error;
      }
      if (errorMessage && errorMessage.value) {
        return errorMessage.value;
      }
      return false;
    });
    return { ...options, error };
  },
  computed: {
    computedClearText() {
      if (this.clearText) {
        return this.clearText;
      }
      if (this.clear) {
        return this.clear;
      }
      return "";
    },
    inputId() {
      return this.for;
    },
    hasPre() {
      const hasPre =
        this.$slots.pre &&
        this.$slots
          .pre()
          .findIndex((o) => o.children && o.children.length !== 0) !== -1;
      return hasPre;
    },
    containerCls() {
      const cls = [];
      if (this.hideLabel) {
        cls.push("hide-label");
      }
      if (this.raised) {
        cls.push("raised");
      }

      if (this.focused) {
        cls.push("focused");
      }
      if (this.error) {
        cls.push("error");
      }
      if (this.background) {
        cls.push("background");
      }

      if (this.disabled) {
        cls.push("disabled");
      }

      if (this.inline) {
        cls.push("inline");
      }
      if (this.hasPre) {
        cls.push("has-prefix");
      }
      return cls;
    },
  },
  methods: {
    handleWrapperClick(e: MouseEvent) {
      if (!this.disabled) {
        this.$emit("wrapper-click", e);
      }
    },
  },
  mounted() {
    const element = this.$el.querySelector(".prefix");
    if (element) {
      const config = { childList: true, subtree: true };
      const callback = () => {
        const prefix = this.$el.querySelector(".prefix");
        this.prefixWidth = prefix ? prefix.offsetWidth : 0;
      };

      this.prefixObserver = new MutationObserver(callback);

      this.prefixObserver.observe(element, config);
      callback();
    }
  },
  unmounted() {
    if (this.prefixObserver) {
      this.prefixObserver.disconnect();
    }
  },
  components: {
    ClearIcon,
    ErrorIcon,
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";

@mixin raised-label() {
  top: -0.625rem;
  transform: scale(0.75);
  padding: 0 5.3333333333333333333333px;
}

.feather-input-wrapper-container {
  position: relative;
  width: 100%;
  &.background {
    .feather-input-label {
      background-color: var($background);
    }
  }
  fieldset.feather-input-border {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid var($secondary-text-on-surface);
    border-radius: 4px;
    margin: 0;
    padding: 0;
    legend {
      display: none;
    }
  }
  &:hover {
    cursor: text;
    .feather-input-border {
      border-color: var($primary-text-on-surface);
      &:after {
        content: "";
        width: 3px;
        background-color: var($primary);
        top: 0.5rem;
        bottom: 0.5rem;
        left: 0px;
        position: absolute;
        transition: all 280ms ease-in-out;
        transition-property: opacity, transform;
        transform: translateX(0);
        opacity: 1;
        transform-origin: center;
      }
    }
    .feather-input-label {
      color: var($primary);
    }
  }

  &.focused:not(.disabled) {
    .feather-input-border {
      border-color: var($primary);
      border-width: 2px;

      &:after {
        transform: translateX(8px) scaleX(0.25);
        opacity: 0;
      }
    }
    .feather-input-label {
      color: var($primary);
      @include raised-label();
    }
  }

  &.error {
    &:hover .feather-input-border:after {
      background-color: var($error);
    }
    &.focused {
      .feather-input-border {
        border-color: var($error);
      }
      .feather-input-label {
        color: var($error);
      }
    }
    .feather-input-label {
      color: var($error);
    }
  }

  &.disabled {
    .feather-input-border {
      border-color: var($border-on-surface);
      cursor: default !important;
    }
    &:hover .feather-input-border {
      cursor: default !important;
      &:after {
        display: none;
      }
    }
    .feather-input-label {
      color: var($disabled-text-on-surface);
      cursor: default;
    }
    &.focused {
      .feather-input-wrapper {
        border-color: var($border-on-surface);
      }
    }
    .feather-input-label {
      color: var($disabled-text-on-surface);
      cursor: default;
      pointer-events: none;
    }
    .prefix {
      color: var($disabled-text-on-surface);
    }
    :deep(.hide-when-disabled) {
      display: none;
    }
  }

  &.raised {
    .feather-input-label {
      @include raised-label();
      left: 0.75rem;
    }
  }
  &.inline {
    margin-top: 0;
    &.raised {
      .feather-input-label {
        display: none;
      }
    }
  }

  &.hide-label {
    label {
      @include screen-reader;
      left: -99999px !important;
    }
  }
  &.has-prefix {
    .feather-input-wrapper {
      .prefix {
        margin-right: 0.75rem;
      }
    }
    .feather-input-label {
      left: 3rem;
    }
    &.raised {
      .feather-input-label {
        left: 1rem;
      }
    }
  }
}
.prefix,
.post {
  flex: none;
  display: flex;
  align-items: center;
  color: var($secondary-text-on-surface);

  :deep(svg) {
    width: 1.25rem;
    height: 1.25rem;
  }
}
.post {
  :deep(> *) {
    margin-right: 0.25rem;
    &:last-child {
      margin-right: 0px;
    }
  }
}
.feather-input-wrapper {
  min-height: 2.5rem;
  overflow-y: auto;
  padding: 0 0.75rem;
  position: relative;
  flex: 1;
  display: -ms-flex;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 1rem;
  &:after {
    content: "";
    min-height: inherit;
    font-size: 0;
  }
}
.feather-input-label {
  @include body-small();
  color: var($secondary-text-on-surface);
  background-color: var($surface);
  line-height: 1.2rem;
  top: 0.625rem;
  cursor: text;
  position: absolute;
  transition: all 280ms ease-in-out;
  transition-property: top, left, transform, padding;
  transform-origin: center left;
  z-index: 1;
  left: 1rem;
}
</style>
