import { watch, onBeforeUnmount, nextTick, onMounted } from "vue";

const hideBodyOverflow = (e) => {
  const originalOverflow = e.style.overflow;
  e.style.overflow = "hidden";
  return originalOverflow;
};
const resetBodyOverflow = (originalOverflow, element) => {
  if (originalOverflow !== undefined && element) {
    element.style.overflow = originalOverflow;
  }
  return undefined;
};
const useHideBodyOverflow = (visibleRef) => {
  let originalOverflow;
  const element =
    typeof document !== "undefined"
      ? document.body
      : { style: { overflow: "hidden" } };

  onBeforeUnmount(() => resetBodyOverflow(originalOverflow, element));
  onMounted(() =>
    watch(
      visibleRef,
      (v) => {
        if (v) {
          nextTick(() => {
            originalOverflow = hideBodyOverflow(element);
          });
        } else {
          //hidden
          resetBodyOverflow(originalOverflow, element);
        }
      },
      { immediate: true }
    )
  );
};

const useHideRelativeOverflow = (visibleRef, elementRef) => {
  let originalOverflow;

  onBeforeUnmount(() =>
    resetBodyOverflow(
      originalOverflow,
      elementRef.value ? elementRef.value.offsetParent : undefined
    )
  );
  watch(
    [visibleRef, elementRef],
    ([v, e]) => {
      if (v && e) {
        nextTick(() => {
          originalOverflow = hideBodyOverflow(e.offsetParent);
        });
      } else if (e) {
        //hidden
        resetBodyOverflow(originalOverflow, e.offsetParent);
      }
    },
    {
      immediate: true,
    }
  );
};

export { useHideBodyOverflow, useHideRelativeOverflow };
