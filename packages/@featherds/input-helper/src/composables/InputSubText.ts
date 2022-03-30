import { provide, ExtractPropTypes } from "vue";

export const InputSubTextProps = {
  hint: {
    type: String,
  },
  error: {
    type: String,
  },
  inline: {
    type: Boolean,
    default: false,
  },
} as const;

export const useInputSubText = (
  u: ExtractPropTypes<typeof InputSubTextProps>
) => {
  provide("subTextOptions", u);
};
