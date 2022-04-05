import { provide, ref } from "vue";
export interface IValidationResult {
  success: boolean;
  message?: string;
  inputId?: string;
  label?: string;
}
export interface IFeatherForm {
  register: (input: string, validate: () => IValidationResult) => void;
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
  let controls = {} as Record<string, () => IValidationResult>;
  const errorMessages = ref([] as IValidationResult[]);
  const _validate = () => {
    const validation = Object.keys(controls).map((key) => {
      return controls[key]();
    });
    errorMessages.value = validation.filter((x) => x.success === false);
    return errorMessages.value;
  };

  provide("featherFormErrors", errorMessages);

  provide("featherForm", {
    register: (input: string, validate: () => IValidationResult) => {
      controls[input] = validate;
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
      }, {} as Record<string, () => IValidationResult>);

      controls = newControls;
    },
    runValidation: _validate,
  });

  return { validate: _validate };
};

export { useForm };
