declare module "@featherds/composables/events/Scroll" {
  import { Ref } from "vue";
  const useScroll: (
    ref: Ref<HTMLElement | Document>,
    callback: () => void
  ) => Ref<boolean>;
  export { useScroll };
}

declare module "@featherds/composables/events/Resize" {
  import { Ref } from "vue";
  const useResize: (callback: () => void) => Ref<boolean>;
  export { useResize };
}

declare module "@featherds/composables/events/OutsideClick" {
  import { Ref } from "vue";
  const useOutsideClick: (
    ref: Ref<HTMLElement>,
    callback: () => void
  ) => Ref<boolean>;

  export { useOutsideClick };
}

declare module "@featherds/composables/LabelProperty" {
  import { Ref, ComputedRef } from "vue";
  type Labels<Type> = {
    [Property in keyof Type as `${string & Property}Label`]: ComputedRef<
      Type[Property]
    >;
  };

  const useLabelProperty: <T>(label: Ref<Partial<T>>, defaults: T) => Labels<T>;

  export { useLabelProperty };
}

declare module "@featherds/composables/modal/CloseOnEsc" {
  import { Ref } from "vue";
  const useCloseOnEsc: (ref: Ref<boolean>) => Ref<boolean>;
  export { useCloseOnEsc };
}

declare module "@featherds/composables/modal/HideOverflow" {
  import { Ref } from "vue";
  const useHideBodyOverflow: (ref: Ref<boolean>) => void;
  const useHideRelativeOverflow: (
    ref: Ref<boolean>,
    element: Ref<HTMLElement>
  ) => void;
  export { useHideBodyOverflow, useHideRelativeOverflow };
}

declare module "@featherds/composables/modal/RestoreFocus" {
  import { Ref } from "vue";
  const useRestoreFocus: (ref: Ref<boolean>) => void;
  export { useRestoreFocus };
}
