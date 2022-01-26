import { ref, watch, watchEffect, computed, provide } from "vue";
import { useValidation } from "@featherds/input/src/components/useValidation";
import { useSelection } from "./Selection";
const useRadioGroup = (modelValue, emit, label, schema) => {
  const radios = ref([]);
  const currentSelected = ref();
  const firstElement = ref();

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

  const select = (radio) => {
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

  let validate = ref(useValidation().validate);

  const register = (radio) => {
    radios.value = [...radios.value, radio];
    //lets try and instance validation
    if ("" + validate.value == "" + useValidation().validate) {
      ({ validate } = useValidation(radio.id, modelValue, label, schema));
    }
  };
  provide("register", register);
  provide("select", select);
  provide("blur", (e) => {
    emit("blur", e);
  });
  const focus = () => {
    if (currentSelected.value) {
      currentSelected.value.focus();
    }
  };

  const keydown = (e) => {
    switch (e.keyCode) {
      case 13:
      case 32:
        if (currentSelected.value) {
          select(currentSelected.value);
        } else if (firstElement.value) {
          select(firstElement.value);
        }
        break;
      //next
      case 40:
      case 39:
        selection.selectNext();
        break;
      //previous
      case 37:
      case 38:
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
  };
};

export { useRadioGroup };
