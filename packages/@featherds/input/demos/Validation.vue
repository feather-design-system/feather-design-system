<template>
  <form @submit="onSubmit">
    <FeatherInput
      label="Email"
      :error="emailError"
      v-model="email"
      background
    />

    <FeatherInput label="Name" :error="nameError" v-model="name" background />
    <button @mousedown="setSubmitted" type="submit">Submit</button>
  </form>
</template>
<script>
import { useForm, useField } from "vee-validate";
import { ref, computed } from "vue";
import * as components from "./../src";
export default {
  setup() {
    const submitted = ref(false);
    const schema = computed(() => {
      return {
        email(v) {
          if (submitted.value) {
            if (v && v.trim()) {
              return true;
            }
            return "Required";
          }
          return true;
        },
        name(v) {
          if (submitted.value) {
            if (v && v.trim()) {
              return true;
            }
            return "Required";
          }
          return true;
        },
      };
    });
    // Create a form context with the validation schema
    const { handleSubmit } = useForm({
      validationSchema: schema,
    });

    const { value: email, errorMessage: emailError } = useField("email");
    const { value: name, errorMessage: nameError } = useField("name");

    const onSubmit = handleSubmit((values) => {
      console.log(values);
    });
    const setSubmitted = () => {
      submitted.value = true;
    };
    return {
      email,
      emailError,
      name,
      nameError,
      setSubmitted,
      onSubmit,
    };
  },
  components: {
    ...components,
  },
};
</script>
