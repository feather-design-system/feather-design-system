import { provide, ref } from "vue";
const useForm = () => {
  let controls = {};
  const errorMessages = ref([]);
  const _validate = () => {
    const validation = Object.keys(controls).map((key) => {
      return controls[key]();
    });
    errorMessages.value = validation.filter((x) => x.success === false);
    return errorMessages.value;
  };

  provide("featherFormErrors", errorMessages);

  provide("featherForm", {
    register: (input, validate) => {
      controls[input] = validate;
    },
    deregister: (input, revalidate = false) => {
      delete controls[input];
      if (revalidate && errorMessages.value.length) _validate();
    },
    reregister: (old, curr) => {
      const keys = Object.keys(controls);
      const newControls = keys.reduce((acc, val) => {
        if (val === old) {
          acc[curr] = controls[old];
        } else {
          acc[val] = controls[val];
        }
        return acc;
      }, {});

      controls = newControls;
    },
    runValidation: _validate,
  });

  return { validate: _validate };
};

export { useForm };
