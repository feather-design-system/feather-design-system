<template>
  <div class="feather-input-wrapper-container" :class="containerCls">
    <div class="feather-input-border">
      <div class="pre-border"></div>
      <div class="label-border" :style="{ width: labelWidth }">
        <label
          class="feather-input-label"
          :for="inputId"
          data-ref-id="feather-form-element-label"
          >{{ label }}</label
        >
      </div>
      <div class="post-border"></div>
    </div>

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
import {
  inject,
  computed,
  defineComponent,
  ExtractPropTypes,
  Ref,
  toRef,
  toRefs,
} from "vue";
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
  errorText: {
    type: String,
  },
  raised: {
    type: Boolean,
    default: false,
  },
};
export const emits = {
  clear: () => true,
  "wrapper-click": (_e: MouseEvent) => true,
};
export default defineComponent({
  emits,
  props,
  data() {
    return {
      labelWidth: "0px",
      labelObserver: undefined as unknown as MutationObserver,
    };
  },
  setup(props) {
    const options = inject(
      "wrapperOptions",
      {} as ExtractPropTypes<typeof InputWrapperProps>
    );
    const errorMessage = inject(
      "validationErrorMessage",
      false as false | Ref<string>
    );
    const errorText = toRef(props, "errorText");
    const error = computed(() => {
      if (options.error) {
        return options.error;
      }
      if (errorText && errorText.value) {
        return errorText.value;
      }
      if (errorMessage && errorMessage.value) {
        return errorMessage.value;
      }
      return false;
    });
    return { ...toRefs(options), error };
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
      console.log(this);
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
    const element = this.$el.querySelector(".feather-input-label");
    if (element) {
      const config = { childList: true, subtree: true };
      const callback = () => {
        const label = this.$el.querySelector(".feather-input-label");
        const { width } = label.getBoundingClientRect();
        if (width > 2) {
          if (this.raised || this.focused) {
            this.labelWidth = width + "px";
          } else {
            this.labelWidth = width * 0.75 + 8 + "px";
          }
        } else {
          this.labelWidth = "0px";
        }
      };

      this.labelObserver = new MutationObserver(callback);

      this.labelObserver.observe(element, config);
      this.$nextTick(callback);
    }
  },
  unmounted() {
    if (this.labelObserver) {
      this.labelObserver.disconnect();
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
  .feather-input-border {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    margin: 0;
    padding: 0;
    #{$input-wrapper-border-color}: var($secondary-text-on-surface);
    #{$input-wrapper-border-width}: 1px;
    .pre-border {
      border-left: var($input-wrapper-border-width) solid
        var($input-wrapper-border-color);
      border-top: var($input-wrapper-border-width) solid
        var($input-wrapper-border-color);
      border-bottom: var($input-wrapper-border-width) solid
        var($input-wrapper-border-color);
      border-radius: 4px 0 0 4px;
      width: 12px;
      flex: none;
    }
    .post-border {
      border-right: var($input-wrapper-border-width) solid
        var($input-wrapper-border-color);
      border-top: var($input-wrapper-border-width) solid
        var($input-wrapper-border-color);
      border-bottom: var($input-wrapper-border-width) solid
        var($input-wrapper-border-color);
      border-radius: 0 4px 4px 0;
      flex: 1;
    }
    .label-border {
      border-top: var($input-wrapper-border-width) solid
        var($input-wrapper-border-color);
      border-bottom: var($input-wrapper-border-width) solid
        var($input-wrapper-border-color);
      transition: border-top-width 100ms ease-in-out 100ms;
    }
  }
  &:hover {
    cursor: text;
    .feather-input-border {
      #{$input-wrapper-border-color}: var($primary-text-on-surface);
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
      #{$input-wrapper-border-color}: var($primary);
      #{$input-wrapper-border-width}: 2px;

      &:after {
        transform: translateX(8px) scaleX(0.25);
        opacity: 0;
      }
    }
    .feather-input-border .label-border {
      transition: none;
      border-top-width: 0;
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
        #{$input-wrapper-border-color}: var($error);
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
      #{$input-wrapper-border-color}: var($border-on-surface);
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
    .feather-input-border .label-border {
      transition: none;
      border-top-width: 0;
    }
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
        left: 0.75rem;
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
  line-height: 1.2rem;
  top: 0.625rem;
  cursor: text;
  position: absolute;
  transition: all 280ms ease-in-out;
  transition-property: top, left, transform, padding;
  transform-origin: center left;
  left: 1rem;
}
</style>
