<template>
  <span
    ref="spinner"
    tabindex="-1"
    role="spinbutton"
    :aria-label="label"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuenow="modelValue || 0"
    :aria-valuetext="modelValueText || placeholder"
    :aria-disabled="disabled"
    :class="{ disabled: disabled }"
    @keydown="handleKeyDown"
    @focus="handleFocus"
    @click.stop="handleFocus"
    >{{ displayText }}</span
  >
</template>

<script lang="ts">
import { Code } from "@featherds/utils/keys";
import { defineComponent } from "vue";
export default defineComponent({
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  emits: ["update:modelValue", "next", "previous"],
  props: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    modelValue: {
      type: Number,
    },
    label: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      input: "",
    };
  },
  computed: {
    modelValueText() {
      return this.modelValue?.toString();
    },
    displayText() {
      const pad = (value: number | string) => {
        let paddingLength =
          this.max.toString().length - value.toString().length;
        let padding = "";
        while (paddingLength > 0) {
          padding += "0";
          paddingLength--;
        }
        return `${padding}${value}`;
      };
      if (this.modelValue !== undefined) {
        if (this.modelValue.toString().length < this.max.toString().length) {
          return pad(this.modelValue);
        }
        return this.modelValue.toString();
      }
      if (this.input) {
        return pad(this.input);
      }
      return this.placeholder || "";
    },
  },
  methods: {
    clear() {
      this.input = "";
    },
    focus() {
      (this.$refs.spinner as HTMLElement).focus();
    },
    deselect() {
      if (window.getSelection) {
        const selection = window.getSelection();
        selection?.removeAllRanges();
      }
    },
    parseValue(str: string) {
      const value = parseInt(str, 10);
      if (isNaN(value) || value < this.min || value > this.max) {
        this.$emit("update:modelValue", undefined);
      } else {
        this.$emit("update:modelValue", value);
        //if they type in the string 01 then go to next
        if (this.max.toString().length === str.length) {
          this.$emit("next");
          return;
        }
      }

      if (value * 10 >= this.max) {
        this.$emit("next");
      }
    },
    handleFocus(e: FocusEvent) {
      if (this.disabled) {
        return;
      }
      this.highlight(e.target as HTMLInputElement);
      this.input = "";
    },
    highlight(el: HTMLElement) {
      if (document.createRange) {
        var range = document.createRange();
        range.selectNode(el);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    },
    handleKeyDown(e: KeyboardEvent) {
      if (this.disabled) {
        return;
      }
      const isModifiedKeyPress = (_ev: KeyboardEvent) => {
        return _ev.shiftKey || _ev.ctrlKey || _ev.metaKey || _ev.altKey;
      };

      if (isModifiedKeyPress(e)) {
        return;
      }
      const stop = (_ev: KeyboardEvent) => {
        _ev.stopPropagation();
        _ev.preventDefault();
      };

      //handle input for numbers
      const allowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      if (allowed.indexOf(e.key) > -1) {
        const newInput = this.input + e.key;
        //if a user tries to type in 6 chars into the year only take last 4 as valid
        const charLimit = this.max.toString().length;
        if (newInput.length > charLimit) {
          this.input = newInput.substring(newInput.length - charLimit);
        } else {
          this.input = newInput;
        }
        this.parseValue(this.input);
        stop(e);
        return;
      }

      //handle arrow keys
      switch (e.code) {
        case Code.LEFT:
          this.$emit("previous");
          stop(e);
          break;
        case Code.RIGHT:
          this.$emit("next");
          stop(e);
          break;
        case Code.UP:
          if (this.modelValue !== undefined && this.modelValue < this.max) {
            this.$emit("update:modelValue", this.modelValue + 1);
          }
          if (this.modelValue === undefined || this.modelValue === 0) {
            this.$emit("update:modelValue", this.min);
          }
          stop(e);
          break;
        case Code.DOWN:
          if (this.modelValue !== undefined && this.modelValue > this.min) {
            this.$emit("update:modelValue", this.modelValue - 1);
          }
          if (this.modelValue === undefined || this.modelValue === 0) {
            this.$emit("update:modelValue", this.max);
          }
          stop(e);
          break;
        case Code.DELETE:
          //reset
          this.input = "";
          this.$emit("update:modelValue", undefined);
          stop(e);
          break;
        case Code.BACKSPACE:
          this.input = this.input.slice(0, -1);

          this.parseValue(this.input);
          stop(e);

          break;
      }
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
span {
  cursor: pointer;
  &:focus {
    outline: 0;
  }
  &.disabled {
    cursor: text;
    color: var($disabled-text-on-surface);
  }
}
</style>
