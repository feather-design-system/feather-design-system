import { computed, Ref, ComputedRef } from "vue";
type Labels<Type> = {
  [Property in keyof Type as `${string & Property}Label`]: ComputedRef<
    Type[Property] | string | undefined
  >;
};
const useLabelProperty = <T>(
  labelRef: Ref<Record<string, string>>,
  defaultLabels: Record<string, string>
): Labels<T> => {
  const result: Record<string, ComputedRef<string>> = {};
  Object.keys(defaultLabels).forEach((key) => {
    //TS2322
    // @ts-expect-error
    result[`${key}Label`] = computed(() => {
      return labelRef.value[key] || defaultLabels[key];
    });
  });
  return result as Labels<T>;
};

export { useLabelProperty };
