import { Ref, ComputedRef } from "vue";

declare module "@featherds/composables/events/Scroll" {
  const useScroll: (
    ref: Ref<HTMLElement>,
    callback: () => void,
    threshold: number
  ) => Ref<boolean>;
  export { useScroll };
}

declare module "@featherds/composables/events/Resize" {
  const useResize: (
    callback: () => void,
    threshold: number
  ) => Ref<boolean>;
  export { useResize };
}

declare module "@featherds/composables/events/OutsideClick" {
  const useOutsideClick: (
    ref: Ref<HTMLElement>,
    callback: () => void
  ) => Ref<boolean>;

  export { useOutsideClick };
}

declare module "@featherds/composables/LabelProperty" {
  const useLabelProperty: (
    label: Ref<Record<string, string>>,
    defaults: Record<string, string>
  ) => ComputedRef<string>[];

  export { useLabelProperty };
}

declare module "@featherds/composables/modal/CloseOnEsc" {
  const useCloseOnEsc: (ref: Ref<boolean>) => Ref<boolean>;
  export { useCloseOnEsc };
}

declare module "@featherds/composables/modal/HideOverflow" {
  const useHideBodyOverflow: (ref: Ref<boolean>) => void;
  const useHideRelativeOverflow: (
    ref: Ref<boolean>,
    element: Ref<HTMLElement>
  ) => void;
  export { useHideBodyOverflow, useHideRelativeOverflow };
}

declare module "@featherds/composables/modal/RestoreFocus" {
  const useRestoreFocus: (ref: Ref<boolean>) => void;
  export { useRestoreFocus };
}
