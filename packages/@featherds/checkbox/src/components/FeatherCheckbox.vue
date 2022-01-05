<template>
  <div class="layout-container">
    <div
      class="feather-checkbox feather-form-input feather-checkbox-table"
      @click="click"
      @keydown="keydown"
      :aria-checked="modelValue ? 'true' : indeterminate ? 'mixed' : 'false'"
      :aria-disabled="disabled"
      :aria-labelledby="labelId"
      :aria-label="label"
      :id="inputId"
      :tabindex="noFocus ? -1 : 0"
      ref="input"
      role="checkbox"
      data-ref-id="feather-checkbox"
    >
      <div class="checkbox hover focus">
        <div class="box">
          <svg
            class="checkmark"
            role="presentation"
            focusable="false"
            viewBox="0 0 24 24"
          >
            <path
              class="path"
              fill="none"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"
            />
          </svg>
          <div class="indeterminate"></div>
        </div>
        <feather-ripple center v-if="!disabled" />
      </div>
      <label
        v-if="!label"
        data-ref-id="feather-checkbox-label"
        :id="labelId"
        :for="inputId"
      >
        <slot></slot>
      </label>
    </div>
  </div>
</template>
<script>
import { getSafeId } from "@featherds/utils/id";
import { KEYCODES } from "@featherds/utils/keys";
import { FeatherRipple } from "@featherds/ripple";

export default {
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  emits: ["click", "update:modelValue", "indeterminate"],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    indeterminate: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
    noFocus: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputId() {
      return this.label && this.label.length
        ? undefined
        : getSafeId("checkbox");
    },
    labelId() {
      return this.label && this.label.length
        ? undefined
        : getSafeId("checkbox-label");
    },
  },
  watch: {
    indeterminate: {
      handler(v) {
        this.$emit("update:modelValue", undefined);
        this.$emit("indeterminate", v);
      },
    },
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
    updateValue() {
      if (!this.disabled) {
        if (this.indeterminate) {
          this.$emit("update:modelValue", true);
          this.$emit("indeterminate", false);
        } else {
          this.$emit("update:modelValue", !this.modelValue);
          this.$emit("indeterminate", false);
        }
      }
    },
    click(e) {
      this.focus();
      this.updateValue();
      this.$emit("click", e);
    },
    keydown(e) {
      if (e.keyCode === KEYCODES.SPACE || e.keyCode === KEYCODES.ENTER) {
        this.updateValue();
      }
      //stop page scrolling
      if (e.keyCode === KEYCODES.SPACE) {
        e.preventDefault();
      }
    },
  },
  components: {
    FeatherRipple,
  },
};
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/themes/utils";
@import "@featherds/styles/mixins/typography";

.feather-checkbox {
  @include state-on-surface();
}
.layout-container {
  display: inline-block;
  margin-bottom: $spacing-xs;
}

$height: 36px;
$boxHeight: math.div($height, 2);
.feather-checkbox {
  display: inline-flex;
  margin-left: -8px;
  cursor: pointer;
  align-items: center;
  .checkbox {
    height: $height;
    width: $height;
    border-radius: 100%;
    position: relative;
    flex: none;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .box {
    height: $boxHeight;
    width: $boxHeight;
    border: 2px solid var($secondary-text-on-surface);
    background-color: transparent;
    border-radius: 2px;
    pointer-events: none;
    display: inline-flex;
    justify-content: center;
    align-content: center;
    position: relative;
    transition: border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),
      background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1);
  }
  .checkmark {
    opacity: 0;
    color: var($surface);
    flex: 1;
    transition: opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),
      transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);
    .path {
      transition: stroke-dashoffset 280ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
      stroke: currentColor;
      stroke-width: 3.12px;
      stroke-dashoffset: 30;
      stroke-dasharray: 30;
    }
  }
  .indeterminate {
    position: absolute;
    left: 0px;
    border-width: 1px;
    border-style: solid;
    border-bottom-color: var($surface);
    border-top-color: var($surface);
    height: 0;
    width: 100%;
    margin-top: math.div($boxHeight - 6, 2);
    opacity: 0;
    transform: rotateZ(135deg);
    transition: opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),
      transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);
  }
  label {
    @include body-small();
    color: var($primary-text-on-surface);
    padding-left: 4px;
    padding-right: 16px;
    min-width: 56px;
    user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
  }
}
.feather-checkbox:hover[aria-checked="true"] .box {
  border-color: var($primary);
  background-color: var($primary);
}

.feather-checkbox[aria-checked="true"] .box {
  border-color: var($primary);
  background-color: var($primary);
  .checkmark {
    opacity: 1;
  }
  .path {
    stroke-dashoffset: 0;
  }
}

.feather-checkbox[aria-checked="mixed"] .box {
  border-color: var($primary);
  background-color: var($primary);
  .checkmark {
    opacity: 0;
  }
  .indeterminate {
    opacity: 1;
    transform: rotateZ(0deg);
  }
}

.feather-checkbox[aria-disabled="true"] {
  @include state-disabled();
  cursor: default;
  .box {
    border-color: var($disabled-text-on-surface);
  }
  .checkbox {
    background: transparent;
  }
  &[aria-checked="true"] .box {
    border-color: transparent;
    background-color: var($disabled-text-on-surface);
  }
  label {
    color: var($disabled-text-on-surface);
    cursor: default;
  }
}
</style>
