import { inject, ref, provide, watch, isRef, onBeforeUnmount, Ref } from "vue";
import {
  IFeatherForm,
  IValidationFailure,
  IValidationSuccess,
  IValidator,
} from "./useForm";
const useValidation = (
  inputId: Ref<string>,
  value: Ref<unknown>,
  label: string,
  schema?: Record<string, any>,
  errorFromInput?: Ref<string>
) => {
  const form = inject("featherForm", false as false | IFeatherForm);
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
        } as IValidationFailure;
      }
      try {
        schema.validateSync(value.value);
        errorMessage.value = "";
        return { success: true } as IValidationSuccess;
      } catch (e: unknown) {
        const err = e as { errors: string[] };
        errorMessage.value = err.errors[0];
        return {
          success: false,
          message: err.errors[0],
          inputId: inputId.value,
          label: label,
        } as IValidationFailure;
      }
    };
    const clear = () => {
      errorMessage.value = "";
    };
    const validator = {
      clear,
      validate,
    } as IValidator;
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
        if (curr && form) {
          form.register(curr, validator);
        }
        if (old && form) {
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
