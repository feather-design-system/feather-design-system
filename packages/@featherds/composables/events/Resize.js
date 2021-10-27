import { watch, onBeforeUnmount, ref } from "vue";
const useResize = (listener) => {
  const active = ref(false);
  let ticking = false;
  const resizeHandler = () => {
    listener();
    ticking = false;
  };

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(resizeHandler);
      ticking = true;
    }
  }
  const removeEvents = () => {
    if (window) {
      window.removeEventListener("resize", requestTick);
    }
  };
  const unwatch = watch(
    active,
    (enabled) => {
      if (window && enabled) {
        window.addEventListener("resize", requestTick);
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
