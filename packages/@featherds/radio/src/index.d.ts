declare module "@featherds/radio" {
  import { defineComponent } from "vue";
  const FeatherRadio: ReturnType<typeof defineComponent>;
  const FeatherRadioGroup: ReturnType<typeof defineComponent>;

  const useRadioGroup: (
    modelValue: any,
    emit: any
  ) => {
    focus: () => void;
    selectPrevious(): void;
    selectNext(): void;
    keydown: (e: any) => void;
  };
  export { FeatherRadio, FeatherRadioGroup, useRadioGroup };
}
