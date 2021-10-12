import { provide } from "vue";
const useForm = () => {
  let controls = {};
  const _validate = () => {
    const validation = Object.keys(controls).map((key) => {
      return controls[key]();
    });
    return validation.filter((x) => x.success === false);
  };

  provide("featherForm", {
    register: (input, validate) => {
      controls[input] = validate;
    },
    deregister: (input) => {
      delete controls[input];
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
