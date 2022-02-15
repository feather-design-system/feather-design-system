<template>
  <form @submit="onSubmit" novalidate>
    <h1>Register, v2</h1>
    * indicates required
    <ValidationHeader />
    <FeatherInput
      label="Email *"
      :modelValue="email"
      :schema="emailV"
      autocomplete="dasdasd"
      required
      background
    />

    <FeatherInput
      :id="nameId"
      label="Name *"
      autocomplete="dasdas"
      :modelValue="name"
      :schema="nameV"
      :error="nameError"
      background
      required
    />
    <button type="submit">Submit</button>
    <div class="submitting" v-if="submitting">
      <FeatherSpinner />
    </div>
    <div
      class="alert"
      aria-live="assertive"
      aria-atomic="true"
      ref="alert"
    ></div>
  </form>
</template>
<script>
import { string } from "yup";
import { ref, provide } from "vue";
import * as components from "./../src";
import { ValidationHeader, useForm } from "@featherds/input-helper";

import { FeatherSpinner } from "@featherds/progress";

export default {
  setup() {
    const form = useForm();
    const name = ref("");
    const nameId = ref("name-id");
    const nameV = string().required("Required");
    const nameError = ref();

    const email = ref("");
    const emailV = string().required("Required").email();
    const submitting = ref();
    const alert = ref();

    const onSubmit = (e) => {
      nameError.value = "";
      e.preventDefault();
      const errors = form.validate();

      if (!errors.length) {
        submitting.value = true;
        alert.value.textContent = "Submitting form, please wait";

        setTimeout(() => {
          submitting.value = false;
          nameError.value = "Already taken";
        }, 3000);
      }
    };

    return {
      email,
      emailV,
      name,
      nameV,
      nameId,
      nameError,
      onSubmit,

      submitting,
      alert,
    };
  },
  components: {
    ...components,
    FeatherSpinner,
    ValidationHeader,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
.alert {
  @include screen-reader();
}
</style>
