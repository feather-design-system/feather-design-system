import { ref, watch, watchEffect, computed, provide, Ref } from "vue";
import { useSelection, IRadio } from "./Selection";
import { useValidation } from "@featherds/input-helper";
import { getSafeId } from "@featherds/utils/id";
import { Code } from "@featherds/utils/keys";

const useRadioGroup = (
  modelValue: Ref<unknown>,
  emit: ((event: "update:modelValue", v: unknown) => void) &
    ((event: "blur", v: FocusEvent) => void),
  label: string,
  schema: Record<string, unknown>,
  errorFromInput: Ref<string>
) => {
  const radios: Ref<IRadio[]> = ref([]);
  const currentSelected: Ref<IRadio | undefined> = ref();
  const firstElement: Ref<IRadio | undefined> = ref();
  const firstElementId: Ref<string | undefined> = ref();

  watchEffect(() => {
    if (!radios.value.length) {
      return;
    }
    const values = radios.value.map((x) => x.value);
    //select the radio that matches the current value
    if (modelValue.value !== undefined && modelValue.value !== null) {
      currentSelected.value = radios.value[values.indexOf(modelValue.value)];
    }
    //if nothing is selected then set the first property on first radio that isnt disabled
    if (!currentSelected.value && radios.value.length) {
      let enabled = radios.value.filter((x) => !x.disabled);
      enabled = enabled.length ? enabled : radios.value; //if there is none enabled just use radios.
      firstElement.value = enabled[0];
      firstElement.value.first = true;
    }
  });

  watch(currentSelected, (nv, ov) => {
    if (ov) {
      ov.checked = false;
    }
    if (nv) {
      nv.checked = true;
    }
  });

  const select = (radio: IRadio) => {
    if (radio && radio.disabled) {
      return;
    }
    //reset first as we are now selecting and element
    if (firstElement.value) {
      firstElement.value.first = false;
    }
    if (currentSelected.value === radio) {
      return;
    }
    emit("update:modelValue", radio.value);
    currentSelected.value = radio;
    radio.focus();
  };

  const currentHighlight = computed(() => {
    return currentSelected.value || firstElement.value;
  });
  const selection = useSelection(currentHighlight, radios, select);

  const groupId = computed(() => {
    return getSafeId("feather-radio-group");
  });

  firstElementId.value = groupId.value;

  const { validate } = useValidation(
    firstElementId as Ref<string>,
    modelValue,
    label,
    schema,
    errorFromInput
  );

  const register = (radio: IRadio) => {
    radios.value = [...radios.value, radio];
    //lets try and instance validation
    if (firstElementId.value === groupId.value) {
      firstElementId.value = radio.id;
    }
  };
  provide("register", register);
  provide("select", select);
  provide("blur", (e: FocusEvent) => {
    emit("blur", e);
  });
  const focus = () => {
    if (currentSelected.value) {
      currentSelected.value.focus();
    }
  };

  const keydown = (e: KeyboardEvent) => {
    switch (e.code) {
      case Code.ENTER:
      case Code.SPACE:
        if (currentSelected.value) {
          select(currentSelected.value);
        } else if (firstElement.value) {
          select(firstElement.value);
        }
        break;
      //next
      case Code.DOWN:
      case Code.RIGHT:
        selection.selectNext();
        break;
      //previous
      case Code.LEFT:
      case Code.UP:
        selection.selectPrevious();
        break;
      default:
        break;
    }
  };

  return {
    keydown,
    ...selection,
    focus,
    validate,
    firstElementId,
    groupId,
  };
};

export { useRadioGroup };
