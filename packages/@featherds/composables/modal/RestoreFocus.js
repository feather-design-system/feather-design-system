import { watch } from "vue";

/**
 * When visible is set to false it will try focus the triggering element.
 * @param {Ref<Boolean>} visibleRef
 */
const useRestoreFocus = (visibleRef) => {
  let focusAfterClosed;
  watch(visibleRef, (v) => {
    if (v) {
      focusAfterClosed = document.activeElement;
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
