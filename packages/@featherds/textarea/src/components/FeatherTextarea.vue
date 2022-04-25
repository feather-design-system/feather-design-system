<template>
  <div v-bind="inherittedAttrs" class="feather-textarea-container">
    <InputWrapper
      :for="inputId"
      :raised="isRaised"
      :focused="focused"
      :show-clear="showClear"
      @wrapper-click="handleWrapperClick"
      @clear="handleClear"
      class="feather-textarea-content"
      :class="contentCls"
    >
      <textarea
        v-bind="attrs"
        class="feather-textarea"
        data-ref-id="feather-textarea-input"
        :class="{ error: error }"
        :maxlength="maxlength > 0 ? maxlength : undefined"
        ref="input"
      ></textarea>
    </InputWrapper>
    <InputSubText :id="descriptionId">
      <template v-slot:right>
        <div
          class="feather-textarea-count"
          v-if="maxlength"
          data-ref-id="feather-form-element-count"
        >
          {{ charCount }}
        </div>
      </template>
    </InputSubText>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, Ref } from "vue";
import { getSafeId } from "@featherds/utils/id";
import { useValidation } from "@featherds/input-helper";
import { computed, toRef } from "vue";

import {
  InputWrapper,
  InputWrapperProps,
  InputSubText,
  InputSubTextProps,
  useInputWrapper,
  useInputSubText,
  useInputInheritAttrs,
} from "@featherds/input-helper";
export const props = {
  ...InputWrapperProps,
  ...InputSubTextProps,
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
    type: Object as PropType<Record<string, any>>,
    required: false,
  },
  id: {
    type: String,
    required: false,
  },
} as const;
export const emits = {
  "update:modelValue": (_v: string) => true,
};
export default defineComponent({
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  emits,
  props,
  data: () => {
    return {
      focused: false,
      internalValue: "",
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
        "aria-describedby": ((attrs["aria-describedby"] as string) || "")
          .split(" ")
          .concat([this.descriptionId])
          .filter(Boolean)
          .join(" "),
        value: this.internalValue,
      };
    },
    listeners() {
      return {
        onFocus: (e: FocusEvent) => {
          this.handleFocus();
          if (this.$attrs.onFocus) {
            (this.$attrs.onFocus as (e: FocusEvent) => void)(e);
          }
        },
        onBlur: (e: FocusEvent) => {
          this.handleBlur();
          if (this.$attrs.onBlur) {
            (this.$attrs.onBlur as (e: FocusEvent) => void)(e);
          }
        },
        onInput: (e: Event) => {
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
  setup(props, context) {
    useInputSubText(props);
    useInputWrapper(props);
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
      props.schema as Record<string, any>,
      toRef(props, "error") as Ref<string>
    );

    return {
      inputId,
      incomingId,
      validate,
      ...useInputInheritAttrs(context.attrs as Record<string, unknown>),
    };
  },
  methods: {
    handleClear() {
      this.internalValue = "";
      this.focus();
    },
    handleWrapperClick() {
      (this.$refs.input as HTMLTextAreaElement).focus();
    },
    handleFocus() {
      this.focused = true;
    },
    handleBlur() {
      this.validate();
      this.focused = false;
    },
    handleInput(e: Event) {
      this.internalValue = (e.target as HTMLTextAreaElement).value;
      this.$emit("update:modelValue", this.internalValue);
    },
    focus() {
      this.$nextTick(() => {
        (this.$refs.input as HTMLTextAreaElement).focus();
      });
    },
    adjustTextArea() {
      if (!this.auto) {
        return;
      }
      //auto adjust height
      const tx = this.$refs.input as HTMLTextAreaElement;
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
          txWidth <
            (tx.parentElement as HTMLElement).getBoundingClientRect().width
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
    const tx = this.$refs.input as HTMLTextAreaElement;
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

.feather-textarea {
  border: none;
  margin: 0.5rem 0;
  display: inline-block;
  vertical-align: middle;
  resize: none;
  background-color: transparent;
  flex: 1 1 2.5rem;
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

.feather-textarea-count {
  padding-left: 1rem;
  align-self: flex-start;
  margin-left: auto;
  @include caption();
  color: var($secondary-text-on-surface);
}

.feather-textarea-container {
  :deep(.prefix),
  :deep(.post) {
    align-self: flex-start;
    margin-top: 0.625rem;
  }
}
</style>
