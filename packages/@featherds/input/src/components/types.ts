import { InputWrapperProps, InputSubTextProps } from "@featherds/input-helper";
import { PropType } from "vue";
export const props = {
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: [String, Number] as PropType<string | number>,
  },
  maxlength: {
    type: Number,
    required: false,
    default: 0,
  },
  schema: {
    type: Object as PropType<Record<string, any>>,
    required: false,
  },
  id: {
    type: String,
    required: false,
  },
  ...InputWrapperProps,
  ...InputSubTextProps,
} as const;

export const emits = {
  "update:modelValue": (value: string | undefined | number) => true,
};
