<template>
  <div v-bind="inherittedAttrs" class="feather-textarea-container">
    <InputWrapper
      :for="inputId"
      :raised="isRaised"
      :focused="focused"
      :show-clear="showClear"
      @wrapper-click="handleWrapperClick"
      @clear="handleClear"
      class="feather-input-content"
      :class="contentCls"
    >
      <textarea
        v-bind="attrs"
        class="feather-textarea"
        data-ref-id="feather-input"
        :class="{ error: error }"
        :maxlength="maxlength > 0 ? maxlength : false"
        ref="input"
      ></textarea>
    </InputWrapper>
    <InputSubText :id="descriptionId">
      <template v-slot:right>
        <div
          class="feather-input-count"
          v-if="maxlength"
          data-ref-id="feather-form-element-count"
        >
          {{ charCount }}
        </div>
      </template>
    </InputSubText>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { getSafeId } from "@featherds/utils/id";
import { useValidation } from "@featherds/input/src/components/useValidation";
import { computed, toRef } from "vue";

import {
  InputWrapper,
  InputWrapperMixin,
  InputSubText,
  InputSubTextMixin,
  InputInheritAttrsMixin,
} from "@featherds/input-helper";
export default defineComponent({
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  emits: ["update:modelValue"],
  mixins: [InputWrapperMixin, InputSubTextMixin, InputInheritAttrsMixin],
  props: {
    modelValue: {
      type: String,
    },
    maxlength: {
      type: Number,
      required: false,
      default: 0,
    },
    auto: {
      type: Boolean,
      default: false,
    },
    schema: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      focused: false,
      internalValue: undefined,
      initialHeight: 0,
    };
  },
  computed: {
    descriptionId() {
      return getSafeId("feather-textarea-description");
    },
    showClear() {
      return !!(this.internalValue && this.internalValue.length > 0);
    },
    contentCls() {
      const cls = [];

      if (this.error) {
        cls.push("error");
      }

      if (this.disabled) {
        cls.push("disabled");
      }
      if (this.focused) {
        cls.push("focused");
      }
      return cls;
    },
    isRaised() {
      //is a string with length 0 return false
      if (this.internalValue || this.focused) {
        return true;
      }
      return false;
    },

    attrs() {
      const attrs = { ...this.$attrs };
      delete attrs.placeholder;
      //use aria-invalid if passed in (some validation libraries will specify this)
      //otherwise base it off this.error
      if (!attrs["aria-invalid"]) {
        attrs["aria-invalid"] = !!this.error;
      }
      return {
        ...attrs,
        ...this.listeners,
        class: "",
        id: this.inputId,
        name: this.inputId,
        disabled: this.disabled,
        "aria-disabled": this.disabled,
        "aria-describedby": (attrs["aria-describedby"] || "")
          .split(" ")
          .concat([this.descriptionId])
          .filter((x) => x.length > 0)
          .join(" "),
        value: this.internalValue,
      };
    },
    listeners() {
      return {
        onFocus: (e) => {
          this.handleFocus();
          if (this.$attrs.onFocus) {
            this.$attrs.onFocus(e);
          }
        },
        onBlur: (e) => {
          this.handleBlur();
          if (this.$attrs.onBlur) {
            this.$attrs.onBlur(e);
          }
        },
        onInput: (e) => {
          this.adjustTextArea();
          this.handleInput(e);
        },
      };
    },
    charCount() {
      return `${(this.internalValue && this.internalValue.length) || "0"} / ${
        this.maxlength
      }`;
    },
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(v) {
        this.adjustTextArea();
        this.internalValue = v;
      },
    },
    internalValue: {
      immediate: true,
      handler(v) {
        this.$emit("update:modelValue", v);
      },
    },
  },
  setup(props) {
    const incomingId = toRef(props, "id");
    const inputId = computed(() => {
      if (incomingId.value) {
        return incomingId.value;
      }
      return getSafeId("feather-textarea-label");
    });

    const { validate } = useValidation(
      inputId,
      toRef(props, "modelValue"),
      props.label,
      props.schema
    );

    return { inputId, incomingId, validate };
  },
  methods: {
    handleClear() {
      this.internalValue = "";
      this.focus();
    },
    handleWrapperClick() {
      this.$refs.input.focus();
    },
    handleFocus() {
      this.focused = true;
    },
    handleBlur() {
      this.validate();
      this.focused = false;
    },
    handleInput(e) {
      this.internalValue = e.target.value;
      this.$emit("update:modelValue", this.internalValue);
    },
    focus() {
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    adjustTextArea() {
      if (!this.auto) {
        return;
      }
      //auto adjust height
      const tx = this.$refs.input;
      //if this is called before mount
      if (!tx) {
        return;
      }
      tx.style.height = "12px";
      tx.style.flexBasis = "40px";
      tx.style.whiteSpace = "nowrap";

      this.$nextTick(() => {
        const txWidth = tx.getBoundingClientRect().width;
        if (
          tx.scrollWidth <= tx.clientWidth &&
          txWidth < tx.parentElement.getBoundingClientRect().width
        ) {
          tx.style.whiteSpace = "nowrap";
        } else {
          tx.style.whiteSpace = "normal";
          tx.style.flexBasis = "100%";
        }
        this.$nextTick(() => {
          tx.style.height = `${
            tx.scrollHeight < this.initialHeight
              ? this.initialHeight
              : tx.scrollHeight
          }px`;
        });
      });
    },
  },
  mounted() {
    const tx = this.$refs.input;
    this.initialHeight = tx.getBoundingClientRect().height;
  },
  components: {
    InputSubText,
    InputWrapper,
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";
@import "@featherds/input-helper/scss/spacing";
.feather-textarea-container {
  @include input-spacing;
}
.feather-textarea {
  border: none;
  margin: 7px 0;
  display: inline-block;
  vertical-align: middle;
  resize: none;
  background-color: transparent;
  flex: 1 1 40px;
  width: 0;
  @include body-small();
  line-height: 1.5em; //IE has an issue with the mixin lineheight when typing
  color: var($primary-text-on-surface);
  caret-color: var($primary);
  overflow: auto;
  &::-ms-clear {
    display: none;
  }
  &:focus {
    outline: 0;
  }
  &.error {
    caret-color: var($error);
  }
  &[disabled] {
    color: var($disabled-text-on-surface);
  }
}

.feather-input-count {
  padding-left: 16px;
  align-self: flex-start;
  margin-left: auto;
  @include caption();
  color: var($secondary-text-on-surface);
}

.feather-textarea-container {
  :deep(.prefix),
  :deep(.post) {
    align-self: flex-start;
    margin-top: 10px;
  }
}
</style>
