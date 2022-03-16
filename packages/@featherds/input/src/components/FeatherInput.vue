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
        :maxlength="maxlength > 0 ? maxlength : false"
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
<script>
import { getSafeId } from "@featherds/utils/id";
import { useValidation } from "@featherds/input-helper";
import { ref, toRef, computed, onBeforeUnmount } from "vue";
import {
  InputWrapper,
  InputWrapperMixin,
  InputSubText,
  InputSubTextMixin,
  InputInheritAttrsMixin,
} from "@featherds/input-helper";
export default {
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  mixins: [InputWrapperMixin, InputSubTextMixin, InputInheritAttrsMixin],
  emits: ["update:modelValue"],
  props: {
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: [String, Number],
    },
    maxlength: {
      type: Number,
      required: false,
      default: 0,
    },
    schema: {
      type: Object,
      required: false,
    },
    id: {
      type: String,
      required: false,
    },
  },

  setup(props) {
    const incomingId = toRef(props, "id");
    const inputId = computed(() => {
      if (incomingId.value) {
        return incomingId.value;
      }
      return getSafeId("feather-input-label");
    });
    const internalValue = ref();

    onBeforeUnmount(() => {
      removeValidation();
    });

    const { validate, removeValidation } = useValidation(
      inputId,
      internalValue,
      props.label,
      props.schema,
      toRef(props, "error")
    );

    return { inputId, internalValue, validate };
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
          (this.internalValue !== undefined && this.internalValue !== null) ||
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
        "aria-describedby": (attrs["aria-describedby"] || "")
          .split(" ")
          .concat([this.descriptionId])
          .filter(Boolean)
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
          this.validate();
          this.handleBlur();
          if (this.$attrs.onBlur) {
            this.$attrs.onBlur(e);
          }
        },
        onInput: (e) => {
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
      this.$refs.input.focus();
    },
    handleFocus() {
      this.focused = true;
    },
    handleBlur() {
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
  },

  components: {
    InputSubText,
    InputWrapper,
  },
};
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
