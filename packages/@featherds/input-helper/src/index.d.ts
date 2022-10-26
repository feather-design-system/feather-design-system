import { DefineComponent, ExtractPropTypes } from "vue";
export const InputWrapper: DefineComponent<
  typeof import("./components/InputWrapper.vue").props,
  {},
  {},
  {},
  {},
  {},
  {},
  typeof import("./components/InputWrapper.vue").emits
>;

export const ActionIcon: DefineComponent<
  typeof import("./components/ActionIcon.vue").props
>;

export const InputSubText: DefineComponent<
  typeof import("./components/InputSubText.vue").props
>;
export const ValidationHeader: DefineComponent<
  typeof import("./components/ValidationHeader.vue").props
>;

export const useInputInheritAttrs: typeof import("./composables/InputInheritAttrs").useInputInheritAttrs;

export const InputSubTextProps: typeof import("./composables/InputSubText").InputSubTextProps;
export const useInputSubText: (
  u: ExtractPropTypes<typeof InputSubTextProps>
) => void;

export const InputWrapperProps: typeof import("./composables/InputWrapper").InputWrapperProps;
export const useInputWrapper: (
  u: ExtractPropTypes<typeof InputWrapperProps>
) => void;
export const useForm: typeof import("./composables/useForm").useForm;
export const useValidation: typeof import("./composables/useValidation").useValidation;
export {
  IValidationResult,
  IValidationFailure,
  IValidationSuccess,
} from "./composables/useForm";
