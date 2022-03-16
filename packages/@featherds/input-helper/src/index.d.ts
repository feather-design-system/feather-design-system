declare module "@featherds/input-helper" {
  import { DefineComponent, Ref, ComputedRef, ExtractPropTypes } from "vue";
  const ActionIcon: DefineComponent;
  const InputWrapper: DefineComponent;
  const InputWrapperMixin: DefineComponent;
  const InputSubText: DefineComponent;
  const InputSubTextMixin: DefineComponent;
  const InputInheritAttrsMixin: DefineComponent;
  const ValidationHeader: DefineComponent;
  const useInputInheritAttrs: (attrs: Record<string, unknown>) => {
    inherittedAttrs: ComputedRef<{
      class: string;
      "data-ref-id": string;
    }>;
  };
  type InputSubTextProps =
    typeof import("./composables/InputSubText").InputSubTextProps;
  const useInputSubText: (u: ExtractPropTypes<InputSubTextProps>) => void;
  const InputSubTextProps: InputSubTextProps;

  type InputWrapperProps =
    typeof import("./composables/InputWrapper").InputWrapperProps;
  const useInputWrapper: (u: ExtractPropTypes<InputWrapperProps>) => void;
  const InputWrapperProps: InputWrapperProps;

  const useForm: () => {
    validate: () => {
      success: boolean;
      message: string;
      inputId: string;
      label: string;
    }[];
  };
  const useValidation: (
    inputId: Ref<string | undefined>,
    value: Ref<unknown>,
    label: string,
    schema: Object,
    error?: Ref<string>
  ) => {
    validate: () => {
      success: boolean;
      message: string;
      inputId: string;
      label: string;
    };
    removeValidation: () => void;
  };

  export {
    ActionIcon,
    InputWrapper,
    InputWrapperMixin,
    InputSubText,
    InputSubTextMixin,
    InputInheritAttrsMixin,
    ValidationHeader,
    useForm,
    useValidation,
    useInputInheritAttrs,
    useInputSubText,
    InputSubTextProps,
    useInputWrapper,
    InputWrapperProps,
  };
}
