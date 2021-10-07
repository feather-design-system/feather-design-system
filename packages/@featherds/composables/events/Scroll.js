import { watch, onBeforeUnmount, ref } from "vue";
import debounce from "lodash.debounce";
const useScroll = (elementRef, listener, threshold = 10) => {
  const active = ref(false);
  const scrollHandler = debounce((e) => {
    listener(e);
  }, threshold);

  const removeEvents = () => {
    if (elementRef.value) {
      elementRef.value.removeEventListener("scroll", scrollHandler);
    }
  };
  const unwatch = watch(
    [elementRef, active],
    ([el, enabled], previous) => {
      if (previous && previous.length && previous[0]) {
        previous[0].removeEventListener("scroll", scrollHandler);
      }
      if (enabled && el) {
        el.addEventListener("scroll", scrollHandler);
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
