<template>
  <form @submit="onSubmit" novalidate>
    * indicates required
    <!--optional but recommended, use the Validation Header to format error messages-->
    <ValidationHeader />
    <!--Pass a schema object and any inputs you have plus any other neccessary attributes-->
    <FeatherInput
      label="Email *"
      :modelValue="email"
      :schema="emailV"
      required
    />
    <!--Provide feedback for form submission for sighted and screen reader users-->
    <FeatherButton type="button" @click="clearErrors" text>Clear</FeatherButton>
    <FeatherButton type="submit" primary>Submit</FeatherButton>
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
import { ref } from "vue";
import { FeatherInput } from "@featherds/input";
import { useForm, ValidationHeader } from "@featherds/input-helper";

import { FeatherSpinner } from "@featherds/progress";
import { FeatherButton } from "@featherds/button";

export default {
  setup() {
    //use the form object to controls can register for validation
    const form = useForm();

    //Field values and validation rules
    const email = ref("");
    const emailV = string().required("Required").email();

    //General Error variables
    const submitting = ref();
    const alert = ref();
    const clearErrors = form.clearErrors;
    const onSubmit = (e) => {
      e.preventDefault();
      //run validation and pass the messages to the Validation Header component
      const errors = form.validate();

      //Form submission boilerplate and user feedback
      if (!errors.length) {
        submitting.value = true;
        alert.value.textContent = "Submitting form, please wait";

        setTimeout(() => {
          alert.value.textContent = "Submission successful";
          submitting.value = false;
        }, 3000);
      }
    };

    return {
      email,
      emailV,
      onSubmit,
      submitting,
      alert,
      form,
      clearErrors,
    };
  },
  components: {
    FeatherInput,
    FeatherSpinner,
    ValidationHeader,
    FeatherButton,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
.alert {
  @include screen-reader();
}
</style>
