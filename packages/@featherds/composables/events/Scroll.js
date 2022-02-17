import { watch, onBeforeUnmount, ref } from "vue";
const useScroll = (elementRef, listener) => {
  const active = ref(false);
  let ticking = false;
  const scrollHandler = (e) => {
    listener(e);
    ticking = false;
  };

  function requestTick(e) {
    if (!ticking) {
      requestAnimationFrame(() => scrollHandler(e));
      ticking = true;
    }
  }

  const removeEvents = () => {
    if (elementRef.value) {
      elementRef.value.removeEventListener("scroll", requestTick, true);
    }
  };
  const unwatch = watch(
    [elementRef, active],
    ([el, enabled], previous) => {
      if (previous && previous.length && previous[0]) {
        previous[0].removeEventListener("scroll", requestTick, true);
      }
      if (enabled && el) {
        el.addEventListener("scroll", requestTick, true);
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
