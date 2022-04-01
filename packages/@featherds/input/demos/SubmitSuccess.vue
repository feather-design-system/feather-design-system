<template>
  <form @submit="onSubmit" novalidate>
    <h1>Register, v2</h1>
    * indicates required
    <ValidationHeader :errorList="errors" :generalError="headingText" />
    <FeatherInput
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
<script lang="ts">
import { string } from "yup";
import { ref, defineComponent } from "vue";
import * as components from "./../src";
import {
  IValidationFailure,
  useForm,
  ValidationHeader,
} from "@featherds/input-helper";

import { FeatherSpinner } from "@featherds/progress";

export default defineComponent({
  setup() {
    const form = useForm();
    const name = ref("");
    const nameV = string().required("Required");

    const email = ref("");
    const emailV = string().required("Required").email();
    const errors = ref([] as IValidationFailure[]);
    const errorsHeading = ref("");
    const heading = ref();
    const submitting = ref();
    const alert = ref();
    const headingText = ref("");

    const onSubmit = (e: Event) => {
      e.preventDefault();
      errors.value = form.validate();
      headingText.value = "";
      if (!errors.value.length) {
        submitting.value = true;
        alert.value.textContent = "Submitting form, please wait";

        setTimeout(() => {
          submitting.value = false;
          alert.value.textContent = "Submission successful";
        }, 5000);
      }
    };

    return {
      email,
      emailV,
      name,
      nameV,
      onSubmit,
      errors,
      errorsHeading,
      heading,
      submitting,
      alert,
      headingText,
    };
  },
  components: {
    ...components,
    FeatherSpinner,
    ValidationHeader,
  },
});
</script>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
.alert {
  @include screen-reader();
}
</style>
