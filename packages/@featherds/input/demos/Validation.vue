<template>
  <form @submit="onSubmit" novalidate>
    <h1>Register, v2</h1>
    * indicates required
    <ValidationHeader />
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
    <button type="button" @click="clearErrors">Clear</button>
  </form>
</template>
<script lang="ts">
import { string } from "yup";
import { defineComponent, ref } from "vue";
import * as components from "./../src";
import { useForm, ValidationHeader } from "@featherds/input-helper";

export default defineComponent({
  setup() {
    const form = useForm();
    const test = ref(true);
    const name = ref("");
    const nameV = string().required("Required");

    const email = ref("");
    const emailV = string().required("Required").email();
    const heading = ref();
    const focusElement = (id: string) => {
      (document.getElementById(id) as HTMLElement).focus();
    };
    const onSubmit = (e: Event) => {
      e.preventDefault();
      form.validate();
    };
    const clearErrors = form.clearErrors;

    const addHash = (str: string) => `#${str}`;
    return {
      test,
      email,
      emailV,
      name,
      nameV,
      onSubmit,
      heading,
      addHash,
      focusElement,
      clearErrors,
    };
  },
  components: {
    ...components,
    ValidationHeader,
  },
});
</script>
