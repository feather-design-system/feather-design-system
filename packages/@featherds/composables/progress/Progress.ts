import { computed, ref, Ref } from "vue";

const useProgress = (
  value: Ref<Number | undefined>,
  error: Ref<String | undefined>
) => {
  const announce = ref();
  const completed = computed(() => {
    return value.value === 100;
  });

  const containerClasses = computed(() => {
    return {
      completed: completed.value || hasError.value,
      determinate: isDeterminate.value && !hasError.value,
      error: hasError.value,
      indeterminate: isIndeterminate.value && !hasError.value,
    };
  });

  const hasError = computed(() => {
    return !!error.value;
  });

  // TODO:  MOVE LABEL PROCESSING IN HERE

  const isIndeterminate = computed(() => {
    return value.value === undefined;
  });

  const isDeterminate = computed(() => {
    return !isIndeterminate.value;
  });

  const percentage = computed(() => {
    if (value.value === undefined) return undefined;
    return ((+value.value / 100) * 100).toFixed(0);
  });

  return {
    announce,
    containerClasses,
    completed,
    hasError,
    isDeterminate,
    isIndeterminate,
    percentage,
  };
};

export { useProgress };
