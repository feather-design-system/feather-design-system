import { inject, ref, provide, watch, isRef, onBeforeUnmount } from "vue";
const useValidation = (inputId, value, label, schema, errorFromInput) => {
  const form = inject("featherForm", false);
  if (schema && form && inputId.value) {
    const errorMessage = ref("");
    provide("validationErrorMessage", errorMessage);
    const validate = () => {
      //if error comes from input then we always use it as our validation
      //this accomodates server side error beiung passed to input
      if (errorFromInput && isRef(errorFromInput) && errorFromInput.value) {
        errorMessage.value = errorFromInput.value;
        return {
          success: false,
          message: errorFromInput.value,
          inputId: inputId.value,
          label: label,
        };
      }
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
    //watch for error from input
    //server side error, run validation when it occurs
    if (errorFromInput && isRef(errorFromInput)) {
      watch(errorFromInput, () => {
        form.runValidation();
      });
    }
    watch(
      inputId,
      (curr, old) => {
        if (curr) {
          form.register(curr, validate);
        }
        if (old) {
          form.deregister(old);
        }
      },
      { immediate: true }
    );
    onBeforeUnmount(() => {
      form.deregister(inputId.value, true);
    });
    return { validate };
  }
  return { validate: () => true };
};

export { useValidation };
