import { computed } from "vue";

const useLabelProperty = (labelRef, defaultLabels) => {
  const result = {};
  Object.keys(defaultLabels).forEach((key) => {
    result[`${key}Label`] = computed(() => {
      return labelRef.value[key] ? labelRef.value[key] : defaultLabels[key];
    });
  });
  return result;
};

export { useLabelProperty };
