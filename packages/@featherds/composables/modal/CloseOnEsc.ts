import { watch, ref, onBeforeUnmount, Ref } from "vue";
import { CODES } from "@featherds/utils/keyboardevents";

const useCloseOnEsc = (visibleRef: Ref<boolean>) => {
  const result = ref(false);
  const handleEsc = (e: KeyboardEvent) => {
    if (e.code === CODES.ESCAPE) {
      e.preventDefault();
      result.value = !result.value;
    }
  };
  watch(
    visibleRef,
    (v) => {
      if (v) {
        document.addEventListener("keydown", handleEsc);
      } else if (typeof document !== "undefined") {
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
