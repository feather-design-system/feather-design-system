import { watch, onBeforeUnmount, ref } from "vue";

const useOutsideClick = (elementRef, listener) => {
  const active = ref(false);
  const windowBlurChecker = (e) => {
    if (e.target === window) {
      listener(e);
    }
  };
  const outSideClick = (e) => {
    if (!elementRef.value.contains(e.target)) {
      listener(e);
    }
  };
  const removeEvents = () => {
    if (document && window) {
      document.removeEventListener("click", outSideClick);
      document.removeEventListener("focus", outSideClick, true);
      window.removeEventListener("blur", windowBlurChecker);
    }
  };
  const unwatch = watch(
    [elementRef, active],
    ([el, enabled]) => {
      if (el && document && window && enabled) {
        document.addEventListener("click", outSideClick);
        document.addEventListener("focus", outSideClick, true);
        window.addEventListener("blur", windowBlurChecker);
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

  return active;
};

export { useOutsideClick };
