declare module "@featherds/input-helper" {
  import { VueConstructor, default as Vue, ComponentOptions } from "vue";
  const ActionIcon: ReturnType<typeof defineComponent>;
  const InputWrapper: ReturnType<typeof defineComponent>;
  const InputWrapperMixin: ReturnType<typeof defineComponent>;
  const InputSubText: ReturnType<typeof defineComponent>;
  const InputSubTextMixin: ReturnType<typeof defineComponent>;
  const InputInheritAttrsMixin: ReturnType<typeof defineComponent>;
  export {
    ActionIcon,
    InputWrapper,
    InputWrapperMixin,
    InputSubText,
    InputSubTextMixin,
    InputInheritAttrsMixin
  };
}
