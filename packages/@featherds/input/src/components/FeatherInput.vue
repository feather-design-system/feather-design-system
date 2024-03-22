<template>
  <div v-bind="inherittedAttrs" class="feather-input-container">
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
      <template v-slot:pre><slot name="pre" /></template>
      <input
        v-bind="attrs"
        class="feather-input"
        ref="input"
        v-on="listeners"
        data-ref-id="feather-input"
        :maxlength="maxlength > 0 ? maxlength : 'false'"
      />

      <template v-slot:post><slot name="post" /></template>
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
<script lang="ts">
import { getSafeId } from "@featherds/utils/id";
import { useValidation } from "@featherds/input-helper";
import { ref, toRef, computed, defineComponent, Ref } from "vue";
import {
  InputWrapper,
  InputSubText,
  useInputWrapper,
  useInputSubText,
  useInputInheritAttrs,
} from "@featherds/input-helper";
import { props, emits } from "./types";
export default defineComponent({
  name: "FeatherInput",
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  emits,
  props,
  setup(props, context) {
    useInputSubText(props);
    useInputWrapper(props);
    const incomingId = toRef(props, "id");
    const inputId = computed(() => {
      if (incomingId.value) {
        return incomingId.value;
      }
      return getSafeId("feather-input-label");
    });
    const internalValue = ref() as Ref<string>;

    const { validate } = useValidation(
      inputId,
      internalValue,
      props.label as string,
      props.schema as Record<string, any>,
      toRef(props, "error") as Ref<string>
    );

    return {
      inputId,
      internalValue,
      validate,
      ...useInputInheritAttrs(context.attrs as Record<string, unknown>),
    };
  },
  data() {
    return {
      focused: false,
    };
  },
  computed: {
    descriptionId() {
      return getSafeId("feather-input-description");
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
      if (this.type === "number") {
        if (
          (this.internalValue !== undefined &&
            this.internalValue !== null &&
            this.internalValue !== "") ||
          this.focused
        ) {
          return true;
        }
        return false;
      }

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
        type: this.type,
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
          this.validate();
          this.handleBlur();
          if (this.$attrs.onBlur) {
            (this.$attrs.onBlur as (e: FocusEvent) => void)(e);
          }
        },
        onInput: (e: Event) => {
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
  methods: {
    handleClear() {
      this.internalValue = "";
      this.focus();
    },
    handleWrapperClick() {
      (this.$refs.input as HTMLInputElement).focus();
    },
    handleFocus() {
      this.focused = true;
    },
    handleBlur() {
      this.focused = false;
    },
    handleInput(e: Event) {
      this.internalValue = (e.target as HTMLInputElement).value;
      this.$emit("update:modelValue", this.internalValue);
    },
    focus() {
      this.$nextTick(() => {
        (this.$refs.input as HTMLInputElement).focus();
      });
    },
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
.feather-input-content {
  &.error {
    .feather-input {
      caret-color: var($error);
    }
  }

  &.focused {
    .feather-input {
      color: var($primary-text-on-surface);
    }
  }
}

.feather-input {
  border: none;
  padding: 0;
  margin: 0;
  width: 0;
  min-width: 2.5rem;
  background-color: transparent;
  @include body-small();
  line-height: 1.5em; //IE has an issue with the mixin lineheight when typing
  color: var($secondary-text-on-surface);
  flex: 1;
  caret-color: var($primary);
  &::-ms-clear,
  &::-ms-reveal {
    display: none;
  }
  &:focus {
    outline: 0;
  }
  &[disabled] {
    color: var($disabled-text-on-surface);
  }
}

.feather-input-count {
  padding-left: 1rem;
  align-self: flex-start;
  margin-left: auto;
  @include caption();
  color: var($secondary-text-on-surface);
}
</style>
