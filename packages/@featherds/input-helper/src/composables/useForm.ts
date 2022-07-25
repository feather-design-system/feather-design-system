import { provide, ref } from "vue";
export type IValidationResult = IValidationFailure | IValidationSuccess;
export interface IValidationFailure {
  success: false;
  message: string;
  inputId: string;
  label: string;
}
export interface IValidationSuccess {
  success: true;
}
export interface IValidator {
  validate: () => IValidationResult;
  clear: () => void;
}
export interface IFeatherForm {
  register: (input: string, validator: IValidator) => void;
  deregister: (input: string, revalidate?: boolean) => void;
  reregister: (ol: string, nw: string) => void;
  runValidation: () => {
    success: boolean;
    message: string;
    inputId: string;
    label: string;
  }[];
}
const useForm = () => {
  let controls = {} as Record<string, IValidator>;
  const errorMessages = ref([] as IValidationFailure[]);
  const _validate = () => {
    const validation = Object.keys(controls).map((key) => {
      return controls[key].validate();
    });
    errorMessages.value = validation.filter(
      (x) => x.success === false
    ) as IValidationFailure[];
    return errorMessages.value;
  };
  const _clearErrors = () => {
    Object.keys(controls).forEach((key) => {
      controls[key].clear();
    });
    errorMessages.value = [] as IValidationFailure[];
    return [];
  };

  provide("featherFormErrors", errorMessages);

  provide("featherForm", {
    register: (input: string, validator: IValidator) => {
      controls[input] = validator;
    },
    deregister: (input: string, revalidate = false) => {
      delete controls[input];
      if (revalidate && errorMessages.value.length) _validate();
    },
    reregister: (old: string, curr: string) => {
      const keys = Object.keys(controls);
      const newControls = keys.reduce((acc, val) => {
        if (val === old) {
          acc[curr] = controls[old];
        } else {
          acc[val] = controls[val];
        }
        return acc;
      }, {} as Record<string, IValidator>);

      controls = newControls;
    },
    runValidation: _validate,
  });

  return { validate: _validate, clearErrors: _clearErrors };
};

export { useForm };
