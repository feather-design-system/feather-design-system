import { watch, onBeforeUnmount, ref } from "vue";
import debounce from "lodash.debounce";
const useResize = (listener, threshold = 10) => {
  const active = ref(false);
  const resizeHandler = debounce((e) => {
    listener(e);
  }, threshold); //we do this so as not to hold up the main thread

  const removeEvents = () => {
    if (window) {
      window.removeEventListener("resize", resizeHandler);
    }
  };
  const unwatch = watch(
    active,
    (enabled) => {
      if (window && enabled) {
        window.addEventListener("resize", resizeHandler);
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

export { useResize };
