import { watch, onBeforeUnmount, ref } from "vue";
const useScroll = (elementRef, listener) => {
  const active = ref(false);
  let ticking = false;
  const scrollHandler = () => {
    listener();
    ticking = false;
  };

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(scrollHandler);
      ticking = true;
    }
  }

  const removeEvents = () => {
    if (elementRef.value) {
      elementRef.value.removeEventListener("scroll", requestTick);
    }
  };
  const unwatch = watch(
    [elementRef, active],
    ([el, enabled], previous) => {
      if (previous && previous.length && previous[0]) {
        previous[0].removeEventListener("scroll", requestTick);
      }
      if (enabled && el) {
        el.addEventListener("scroll", requestTick, { passive: true });
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

export { useScroll };
