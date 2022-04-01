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
<script lang="ts">
import { string } from "yup";
import { defineComponent, ref } from "vue";
import * as components from "./../src";
import {
  IValidationFailure,
  useForm,
  ValidationHeader,
} from "@featherds/input-helper";

export default defineComponent({
  setup() {
    const form = useForm();
    const test = ref(true);
    const name = ref("");
    const nameV = string().required("Required");

    const email = ref("");
    const emailV = string().required("Required").email();
    const errors = ref([] as IValidationFailure[]);
    const heading = ref();
    const focusElement = (id: string) => {
      (document.getElementById(id) as HTMLElement).focus();
    };
    const onSubmit = (e: Event) => {
      e.preventDefault();
      errors.value = form.validate();
    };

    const addHash = (str: string) => `#${str}`;
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
});
</script>
