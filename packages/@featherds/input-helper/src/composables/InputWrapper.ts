import { provide, ExtractPropTypes } from "vue";

export const InputWrapperProps = {
  label: {
    type: String,
    required: true,
  },
  error: {
    type: String,
  },
  clear: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  hideLabel: {
    type: Boolean,
    default: false,
  },
} as const;

export const useInputWrapper = (
  u: ExtractPropTypes<typeof InputWrapperProps>
) => {
  provide("wrapperOptions", u);
};
