import { computed, Ref } from "vue";

export interface IRadio {
  first: boolean;
  focus: () => void;
  checked: boolean;
  disabled: boolean;
  value: unknown;
  id: string;
}
const useSelection = (
  current: Ref<IRadio | undefined>,
  radios: Ref<IRadio[]>,
  select: (r: IRadio) => void
) => {
  const notDisabled = computed(() => {
    return radios.value.filter((x) => !x.disabled);
  });
  const index = computed(() =>
    current.value ? notDisabled.value.indexOf(current.value) : -1
  );

  return {
    selectPrevious() {
      if (current.value && current.value.disabled) {
        return;
      }
      if (index.value === 0) {
        select(notDisabled.value[notDisabled.value.length - 1]!);
      } else {
        select(notDisabled.value[index.value - 1]!);
      }
    },
    selectNext() {
      if (current.value && current.value.disabled) {
        return;
      }
      if (index.value === notDisabled.value.length - 1) {
        select(notDisabled.value[0]!);
      } else {
        select(notDisabled.value[index.value + 1]!);
      }
    },
  };
};

export { useSelection };
