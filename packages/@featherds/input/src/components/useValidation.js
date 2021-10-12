import { inject, ref, provide, watch } from "vue";
const useValidation = (inputId, value, label, schema) => {
  const form = inject("featherForm", false);
  if (schema && form && inputId.value) {
    const errorMessage = ref("");
    provide("validationErrorMessage", errorMessage);
    const validate = () => {
      try {
        schema.validateSync(value.value);
        errorMessage.value = "";
        return { success: true };
      } catch (e) {
        errorMessage.value = e.errors[0];
        return {
          success: false,
          message: e.errors[0],
          inputId: inputId.value,
          label: label,
        };
      }
    };
    form.register(inputId.value, validate);
    watch(inputId, (curr, old) => {
      if (curr) {
        form.reregister(old, curr);
      } else {
        form.deregister(old);
      }
    });
    return { validate };
  }
  return { validate: () => true };
};

export { useValidation };
