import { watch, onBeforeUnmount, nextTick, onMounted, Ref } from "vue";

const hideBodyOverflow = (e: HTMLElement | false) => {
  if (e === false) {
    return "hidden";
  }
  const originalOverflow = e.style.overflow;
  e.style.overflow = "hidden";
  return originalOverflow;
};
const resetBodyOverflow = (
  originalOverflow: string,
  element: HTMLElement | false
) => {
  if (originalOverflow !== undefined && element !== false) {
    element.style.overflow = originalOverflow;
  }
  return undefined;
};
const useHideBodyOverflow = (visibleRef: Ref<boolean>) => {
  let originalOverflow: string;
  const element = typeof document !== "undefined" ? document.body : false;

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

const useHideRelativeOverflow = (
  visibleRef: Ref<boolean>,
  elementRef: Ref<HTMLElement>
) => {
  let originalOverflow: string;

  onBeforeUnmount(() =>
    resetBodyOverflow(
      originalOverflow,
      elementRef.value ? <HTMLElement>elementRef.value.offsetParent : false
    )
  );
  watch(
    [visibleRef, elementRef],
    ([v, e]) => {
      if (v && e) {
        nextTick(() => {
          originalOverflow = hideBodyOverflow(<HTMLElement>e.offsetParent);
        });
      } else if (e) {
        //hidden
        resetBodyOverflow(originalOverflow, <HTMLElement>e.offsetParent);
      }
    },
    {
      immediate: true,
    }
  );
};

export { useHideBodyOverflow, useHideRelativeOverflow };
