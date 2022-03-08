import { computed, Ref, ComputedRef } from "vue";
type Labels<Type> = {
  [Property in keyof Type as `${string & Property}Label`]: ComputedRef<
    Type[Property]
  >;
};
const useLabelProperty = <T>(
  labelRef: Ref<Record<string, string>>,
  defaultLabels: Record<string, string>
): Labels<T> => {
  const result: Record<string, ComputedRef<string>> = {};
  Object.keys(defaultLabels).forEach((key) => {
    result[`${key}Label`] = computed(() => {
      return labelRef.value[key] ? labelRef.value[key] : defaultLabels[key];
    });
  });
  return result as any as Labels<T>;
};

export { useLabelProperty };
