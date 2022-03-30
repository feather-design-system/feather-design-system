import { watch, onBeforeUnmount, ref, onMounted } from "vue";
const useResize = (listener: (e: UIEvent) => void) => {
  const active = ref(false);
  let ticking = false;
  const resizeHandler = (e: UIEvent) => {
    listener(e);
    ticking = false;
  };

  function requestTick(e: UIEvent) {
    if (!ticking) {
      requestAnimationFrame(() => resizeHandler(e));
      ticking = true;
    }
  }
  const removeEvents = () => {
    if (window) {
      window.removeEventListener("resize", requestTick);
    }
  };
  onMounted(() => {
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
  });

  return active;
};

export { useResize };
