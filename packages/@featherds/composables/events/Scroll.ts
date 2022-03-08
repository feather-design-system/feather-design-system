import { watch, onBeforeUnmount, ref, Ref } from "vue";
const useScroll = (
  elementRef: Ref<HTMLElement | Document>,
  listener: (e: Event) => void
) => {
  const active = ref(false);
  let ticking = false;
  const scrollHandler = (e: Event) => {
    listener(e);
    ticking = false;
  };

  function requestTick(e: Event) {
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
