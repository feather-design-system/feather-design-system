import { computed, ref, type Ref } from "vue";

export type UseWheelZoomOptions = {
  enabled?: boolean | Ref<boolean>;
  minStep?: number; // default -2
  maxStep?: number; // default 2
  initialStep?: number; // default 0
  stepToScale?: (step: number) => number; // default mapping
  // keyboard support
  keyboardEnabled?: boolean | Ref<boolean>;
  keyboardRequireCtrlOrMeta?: boolean; // default true
  keyboardPreventDefault?: boolean; // default true
};

export function useWheelZoom(options: UseWheelZoomOptions = {}) {
  const enabledRef =
    (options.enabled as Ref<boolean>) ??
    ref(typeof options.enabled === "boolean" ? options.enabled : true);

  // Ensure bidirectional zoom: minStep < 0 and maxStep > 0.
  let rawMin = options.minStep ?? -2;
  let rawMax = options.maxStep ?? 2;

  // If only one side is provided, mirror it. If both invalid, fall back to defaults.
  if (rawMin >= 0 && rawMax > 0) rawMin = -Math.abs(rawMax);
  if (rawMax <= 0 && rawMin < 0) rawMax = Math.abs(rawMin);
  if (rawMin >= 0 && rawMax <= 0) {
    rawMin = -2;
    rawMax = 2;
  }

  const minStep = rawMin; // guaranteed negative
  const maxStep = rawMax; // guaranteed positive

  const clamp = (s: number) => Math.max(minStep, Math.min(maxStep, s));

  const step = ref<number>(clamp(options.initialStep ?? 0));

  // Default mapping honoring minStep/maxStep:
  // minStep -> 2x, 0 -> 1x, maxStep -> 0.5x
  const createDefaultScaleMapper = (minS: number, maxS: number) => {
    const negativeStepSpan = Math.abs(minS);
    const positiveStepSpan = Math.abs(maxS);
    return (s: number) => {
      if (s === 0) return 1;
      if (s < 0) {
        const t = Math.min(1, Math.abs(s) / negativeStepSpan); // 0..1
        return 1 + t * (2 - 1); // 1 -> 2
      } else {
        const t = Math.min(1, s / positiveStepSpan); // 0..1
        return 1 - t * (1 - 0.5); // 1 -> 0.5
      }
    };
  };

  const stepToScale =
    options.stepToScale ?? createDefaultScaleMapper(minStep, maxStep);

  const scale = computed<number>(() => stepToScale(step.value));

  const setStep = (s: number) => {
    step.value = clamp(s);
  };

  const onWheel = (e: WheelEvent) => {
    if ((enabledRef as Ref<boolean>).value === false) return;
    e.preventDefault();
    const sign = e.deltaY === 0 ? 0 : Math.abs(e.deltaY) / e.deltaY; // -1 | 0 | 1
    if (sign !== 0) setStep(step.value + sign);
  };

  // Keyboard support (Ctrl/Cmd + '+', '-', '0')
  const keyboardEnabledRef =
    (options.keyboardEnabled as Ref<boolean>) ??
    ref(
      typeof options.keyboardEnabled === "boolean"
        ? options.keyboardEnabled
        : true
    );
  const requireCtrlOrMeta = options.keyboardRequireCtrlOrMeta ?? true;
  const preventDefaultOnHandled = options.keyboardPreventDefault ?? true;

  const isEditableTarget = (el: EventTarget | null) => {
    if (!(el instanceof HTMLElement)) return false;
    const tag = el.tagName;
    return (
      el.isContentEditable ||
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      tag === "SELECT" ||
      (el as HTMLInputElement).type === "text"
    );
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if ((enabledRef as Ref<boolean>).value === false) return;
    if ((keyboardEnabledRef as Ref<boolean>).value === false) return;
    if (isEditableTarget(e.target)) return;

    const hasModifier = requireCtrlOrMeta ? e.ctrlKey || e.metaKey : true;
    if (!hasModifier) return;

    // Normalize keys across layouts and numpad
    const key = e.key; // e.g., '+', '-', '0', '='
    const code = e.code; // e.g., 'NumpadAdd', 'NumpadSubtract', 'Digit0'
    let handled = false;

    // Ctrl/Cmd + '+' or '=' => zoom in (toward negative step)
    if (key === "+" || key === "=" || code === "NumpadAdd") {
      setStep(step.value - 1);
      handled = true;
    }
    // Ctrl/Cmd + '-' => zoom out (toward positive step)
    else if (key === "-" || code === "NumpadSubtract") {
      setStep(step.value + 1);
      handled = true;
    }
    // Ctrl/Cmd + '0' => reset
    else if (key === "0" || code === "Digit0" || code === "Numpad0") {
      setStep(0);
      handled = true;
    }

    if (handled && preventDefaultOnHandled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const reset = () => setStep(0);

  return { step, scale, onWheel, onKeyDown, setStep, reset };
}
