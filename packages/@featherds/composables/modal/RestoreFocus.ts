import { watch, Ref } from "vue";

const useRestoreFocus = (visibleRef: Ref<boolean>) => {
  let focusAfterClosed: HTMLElement | undefined;
  watch(visibleRef, (v) => {
    if (v) {
      focusAfterClosed = document.activeElement as HTMLElement;
    } else {
      //hidden
      setTimeout(() => {
        if (focusAfterClosed && focusAfterClosed.focus) {
          focusAfterClosed.focus();
        }
        focusAfterClosed = undefined;
      }, 0);
    }
  });
};

export { useRestoreFocus };
