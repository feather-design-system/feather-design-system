<template>
  <form @submit="onSubmit" novalidate>
    <h1>Register, v2</h1>
    * indicates required
    <ValidationHeader :errorList="errors" />
    <FeatherInput
      v-if="test"
      label="Email *"
      :modelValue="email"
      :schema="emailV"
      autocomplete="dasdasd"
      required
      background
    />

    <FeatherInput
      label="Name *"
      autocomplete="dasdas"
      :modelValue="name"
      :schema="nameV"
      background
      required
    />
    <button type="submit">Submit</button>
  </form>
</template>
<script>
import { string } from "yup";
import { ref } from "vue";
import * as components from "./../src";
import { useForm, ValidationHeader } from "@featherds/input-helper";

export default {
  setup() {
    const form = useForm();
    const test = ref(true);
    const name = ref("");
    const nameV = string().required("Required");

    const email = ref("");
    const emailV = string().required("Required").email();
    const errors = ref([]);
    const heading = ref();
    const focusElement = (id) => {
      document.getElementById(id).focus();
    };
    const onSubmit = (e) => {
      e.preventDefault();
      errors.value = form.validate();
    };

    const addHash = (str) => `#${str}`;
    return {
      test,
      email,
      emailV,
      name,
      nameV,
      onSubmit,
      errors,
      heading,
      addHash,
      focusElement,
    };
  },
  components: {
    ...components,
    ValidationHeader,
  },
};
</script>
