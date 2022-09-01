import { watch, onBeforeUnmount, ref, onMounted, Ref } from "vue";

const useOutsideClick = (
  elementRef: Ref<HTMLElement> | Ref<HTMLElement[]>,
  listener: (e?: FocusEvent) => void,
  options: {
    click?: boolean;
    focus?: boolean;
    window?: boolean;
  } = {
    click: true,
    focus: true,
    window: true,
  }
) => {
  const active = ref(false);
  const windowBlurChecker = (e: FocusEvent) => {
    if (e.target === window) {
      listener(e);
    }
  };
  const outSideClick = (e: FocusEvent) => {
    let elementArr: HTMLElement[] = [];
    if (Array.isArray(elementRef.value)) {
      elementArr = elementRef.value;
    } else {
      elementArr = [elementRef.value];
    }
    const contained = elementArr.some(
      (el: HTMLElement) => el && el.contains(e.target as HTMLElement)
    );
    if (!contained) {
      listener(e);
    }
  };
  const removeEvents = () => {
    if (document && window) {
      if (options.click) {
        document.removeEventListener("click", outSideClick, true);
      }
      if (options.focus) {
        document.removeEventListener("focus", outSideClick, true);
      }
      if (options.window) {
        window.removeEventListener("blur", windowBlurChecker);
      }
    }
  };
  onMounted(() => {
    const unwatch = watch(
      active,
      (enabled) => {
        if (document && window && enabled) {
          if (options.click) {
            document.addEventListener("click", outSideClick, true);
          }
          if (options.focus) {
            document.addEventListener("focus", outSideClick, true);
          }
          if (options.window) {
            window.addEventListener("blur", windowBlurChecker);
          }
        } else {
          removeEvents();
        }
      },
      {
        immediate: true,
      }
    );

    onBeforeUnmount(() => {
      unwatch();
      removeEvents();
    });
  });

  return active;
};

export { useOutsideClick };
