import { watch, onBeforeUnmount, ref, onMounted } from "vue";

const useOutsideClick = (elementRef, listener) => {
  const active = ref(false);
  const windowBlurChecker = (e) => {
    if (e.target === window) {
      listener(e);
    }
  };
  const outSideClick = (e) => {
    let elementRefs = [elementRef];
    if (Array.isArray(elementRef.value)) {
      elementRefs = elementRef.value;
    }
    const contained = elementRefs.some(
      (elRef) => elRef && elRef.contains(e.target)
    );
    if (!contained) {
      listener(e);
    }
  };
  const removeEvents = () => {
    if (document && window) {
      document.removeEventListener("click", outSideClick, true);
      document.removeEventListener("focus", outSideClick, true);
      window.removeEventListener("blur", windowBlurChecker);
    }
  };
  onMounted(() => {
    const unwatch = watch(
      active,
      (enabled) => {
        if (document && window && enabled) {
          document.addEventListener("click", outSideClick, true);
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
  });

  return active;
};

export { useOutsideClick };
