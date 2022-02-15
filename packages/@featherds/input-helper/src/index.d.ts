declare module "@featherds/input-helper" {
  import { DefineComponent, Ref } from "vue";
  const ActionIcon: DefineComponent;
  const InputWrapper: DefineComponent;
  const InputWrapperMixin: DefineComponent;
  const InputSubText: DefineComponent;
  const InputSubTextMixin: DefineComponent;
  const InputInheritAttrsMixin: DefineComponent;
  const ValidationHeader: DefineComponent;
  const useForm: () => {
    validation: () => {
      success: boolean;
      message: string;
      inputId: string;
      label: string;
    }[];
  };
  const useValidation: (
    inputId: Ref<string>,
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
  };
  export {
    ActionIcon,
    InputWrapper,
    InputWrapperMixin,
    InputSubText,
    InputSubTextMixin,
    InputInheritAttrsMixin,
    useForm,
    useValidation,
  };
}
