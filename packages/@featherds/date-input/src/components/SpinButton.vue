<template>
  <span
    ref="spinner"
    tabindex="-1"
    role="spinbutton"
    :aria-label="label"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuenow="modelValue || 0"
    :aria-valuetext="modelValue || placeholder"
    @keydown="handleKeyDown"
    @focus="handleFocus"
    @click.stop="handleFocus"
    >{{ displayText }}</span
  >
</template>

<script>
import { KEYCODES } from "@featherds/utils/keys";
export default {
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
    displayText() {
      const pad = (value) => {
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
    focus() {
      this.$refs.spinner.focus();
    },
    deselect() {
      if (window.getSelection) {
        window.getSelection().removeAllRanges();
      }
    },
    parseValue(str) {
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
    handleFocus(e) {
      this.highlight(e.target);
      this.input = "";
    },
    highlight(el) {
      if (document.createRange) {
        var range = document.createRange();
        range.selectNode(el);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    },
    handleKeyDown(e) {
      const isModifiedKeyPress = (_ev) => {
        return _ev.shiftKey || _ev.ctrlKey || _ev.metaKey || _ev.altKey;
      };

      if (isModifiedKeyPress(e)) {
        return;
      }
      const stop = (_ev) => {
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
      switch (e.keyCode) {
        case KEYCODES.LEFT:
          this.$emit("previous");
          stop(e);
          break;
        case KEYCODES.RIGHT:
          this.$emit("next");
          stop(e);
          break;
        case KEYCODES.UP:
          if (this.modelValue < this.max) {
            this.$emit("update:modelValue", this.modelValue + 1);
          }
          if (this.modelValue === undefined || this.modelValue === 0) {
            this.$emit("update:modelValue", this.min);
          }
          stop(e);
          break;
        case KEYCODES.DOWN:
          if (this.modelValue > this.min) {
            this.$emit("update:modelValue", this.modelValue - 1);
          }
          if (this.modelValue === undefined || this.modelValue === 0) {
            this.$emit("update:modelValue", this.max);
          }
          stop(e);
          break;
        case KEYCODES.DELETE:
          //reset
          this.input = "";
          this.$emit("update:modelValue", undefined);
          stop(e);
          break;
        case KEYCODES.BACKSPACE:
          this.input = this.input.slice(0, -1);

          this.parseValue(this.input);
          stop(e);

          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
span {
  cursor: pointer;
  &:focus {
    outline: 0;
  }
}
</style>
