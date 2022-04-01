<template>
  <form @submit="onSubmit" novalidate>
    * indicates required
    <ValidationHeader />

    <FeatherSelect
      label="Country *"
      :options="countries"
      v-model="country"
      :schema="countryV"
      required
    >
    </FeatherSelect>

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
import { string, object, ValidationError } from "yup";
import { defineComponent, ref } from "vue";

import { FeatherSelect } from "@featherds/select";
import { useForm, ValidationHeader } from "@featherds/input-helper";

import { FeatherSpinner } from "@featherds/progress";

import allCountries from "./countries.js";

export default defineComponent({
  setup() {
    const form = useForm();

    const countries = allCountries;
    const country = ref();
    const countryV = object({
      _text: string().required("You must make a selection to continue"),
    }).test("countryTest", (obj) => {
      if (obj._text?.includes("Narnia")) {
        return new ValidationError(
          "Narnia residents are not allowed to use computers",
          null,
          ""
        );
      }
      return true; // everything is fine
    });

    //General Error variables
    const errorMessages = ref([] as unknown[]);
    const submitting = ref();
    const alert = ref();
    const onSubmit = (e: Event) => {
      e.preventDefault();
      errorMessages.value = form.validate();

      if (!errorMessages.value.length) {
        submitting.value = true;
        alert.value.textContent = "Submitting form, please wait";

        setTimeout(() => {
          alert.value.textContent = "Submission successful";
          submitting.value = false;
        }, 3000);
      }
    };

    return {
      countries,
      country,
      countryV,

      onSubmit,
      submitting,
      alert,
      form,
      errorMessages,
    };
  },
  components: {
    FeatherSelect,
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
