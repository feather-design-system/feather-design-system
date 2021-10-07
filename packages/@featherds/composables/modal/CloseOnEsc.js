import { watch, ref, onBeforeUnmount } from "vue";
import { KEYCODES } from "@featherds/utils/keys";

const useCloseOnEsc = (visibleRef) => {
  const result = ref(false);
  const handleEsc = (e) => {
    if (e.keyCode === KEYCODES.ESCAPE) {
      e.preventDefault();
      result.value = !result.value;
    }
  };
  watch(
    visibleRef,
    (v) => {
      if (v) {
        document.addEventListener("keydown", handleEsc);
      } else {
        document.removeEventListener("keydown", handleEsc);
      }
    },
    { immediate: true }
  );
  onBeforeUnmount(() => {
    document.removeEventListener("keydown", handleEsc);
  });
  return result;
};

export { useCloseOnEsc };
