<template>
  <form @submit="onSubmit" novalidate>
    * indicates required
    <ValidationHeader />
    <FeatherInput
      label="Email *"
      :modelValue="email"
      :schema="emailV"
      required
    />

    <FeatherInput label="Name *" :modelValue="name" :schema="nameV" required />

    <FeatherProtectedInput
      label="Password *"
      v-model="pass"
      :schema="passV"
      required
    ></FeatherProtectedInput>

    <FeatherProtectedInput
      label="Confirm Password *"
      v-model="pass2"
      :schema="pass2V"
      required
    ></FeatherProtectedInput>

    <FeatherDateInput
      v-model="dob"
      :schema="dobV"
      label="Date of Birth *"
      :disabledDates="dobDisabled"
      required
    ></FeatherDateInput>

    <FeatherSelect
      label="Country *"
      :options="countries"
      v-model="country"
      :schema="countryV"
      required
    >
    </FeatherSelect>

    <FeatherRadioGroup
      :label="'What is your sex? *'"
      v-model="sexSelected"
      :schema="sexV"
    >
      <FeatherRadio
        v-for="item in sexes"
        :value="item.value"
        :key="item.name"
        >{{ item.name }}</FeatherRadio
      >
    </FeatherRadioGroup>

    <FeatherAutocomplete
      label="Favourite films *"
      type="multi"
      v-model="films"
      :schema="filmsV"
      :selectionLimit="3"
      :loading="filmsLoading"
      :results="filmsResults"
      @search="filmsSearch"
      required
    ></FeatherAutocomplete>

    <FeatherCheckboxGroup
      label="Please select your favourite pizza toppings *"
      hint="Pick at least one. Pineapple is not allowed."
      v-model="toppings"
      :schema="toppingsV"
    >
      <FeatherCheckbox v-model="toppings.pepperoni" :schema="toppingsV">
        Pepperoni
      </FeatherCheckbox>
      <FeatherCheckbox v-model="toppings.chicken" :schema="toppingsV">
        Chicken
      </FeatherCheckbox>
      <FeatherCheckbox v-model="toppings.olives" :schema="toppingsV">
        Olives
      </FeatherCheckbox>
      <FeatherCheckbox v-model="toppings.pineapple" :schema="toppingsV">
        Pineapple
      </FeatherCheckbox>
    </FeatherCheckboxGroup>

    <FeatherTextarea
      v-model="comment"
      label="Leave a comment *"
      :schema="commentV"
      rows="5"
      required
    ></FeatherTextarea>

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
import { string, array, date, object, boolean, ValidationError } from "yup";
import { ref } from "vue";
import { FeatherAutocomplete } from "@featherds/autocomplete";
import { FeatherCheckbox, FeatherCheckboxGroup } from "@featherds/checkbox";
import { FeatherDateInput } from "@featherds/date-input";
import { FeatherDropdown } from "@featherds/dropdown";
import { FeatherInput } from "@featherds/input";
import { FeatherProtectedInput } from "@featherds/protected-input";
import { FeatherRadio, FeatherRadioGroup } from "@featherds/radio";
import { FeatherSelect } from "@featherds/select";
import { FeatherTextarea } from "@featherds/textarea";
import { useForm, ValidationHeader } from "@featherds/input-helper";

import { FeatherSpinner } from "@featherds/progress";
import { FeatherButton } from "@featherds/button";

import allCountries from "./countries.js";

export default {
  setup() {
    const form = useForm();
    //Field values and validation rules
    const name = ref("");
    const nameV = string().required("Required");

    const email = ref("");
    const emailV = string().required("Required").email();

    const pass = ref("");
    const passV = string().required("Required");
    const pass2 = ref("");
    const pass2V = string()
      .required("Required")
      .test("passwordTest", null, () => {
        if (pass.value !== pass2.value) {
          return new ValidationError(
            "Please ensure both passwords match",
            null,
            ""
          );
        }
        if (pass2.value.length < 10) {
          return new ValidationError(
            "Please ensure your password is at least 10 characters long",
            null,
            ""
          );
        }
        //... etc
        return true; // everything is fine
      });

    const dob = ref();
    const oneday = 60 * 60 * 24 * 1000;
    const dobV = date()
      .required("Required")
      .max(new Date(Date.now() - oneday))
      .test("dobTest", null, (obj) => {
        if (obj > new Date(Date.now() - oneday * 7)) {
          return new ValidationError(
            "Are you telling me you were born last week?",
            null,
            ""
          );
        }
        return true; // everything is fine
      });
    const dobDisabled = { from: new Date() };

    const countries = allCountries;
    const country = ref();
    const countryV = object({
      _text: string().required("You must make a selection to continue"),
    }).test("countryTest", null, (obj) => {
      if (obj._text?.includes("Narnia")) {
        return new ValidationError(
          "Narnia residents are not allowed to use computers",
          null,
          ""
        );
      }
      return true; // everything is fine
    });

    const sexes = [
      {
        name: "Male",
        value: "m",
      },
      {
        name: "Female",
        value: "f",
      },
      {
        name: "Other",
        value: "?",
      },
    ];
    const sexSelected = ref();
    const sexCustom = ref("");
    const sexV = string().required("Required");

    const films = ref([]);
    const filmsV = array().required("Required").length(3);
    let filmsTimeout = -1;
    const filmsLoading = ref(false);
    const allFilms = [
      "Terminator 2",
      "True Lies",
      "Eraser",
      "Last Action Hero",
      "Commando",
      "Predator",
      "Total Recall",
      "Twins",
      "Kung Fury 2",
    ];
    const filmsResults = ref([]);
    const filmsSearch = function (q) {
      filmsLoading.value = true;
      clearTimeout(filmsTimeout);
      filmsTimeout = setTimeout(() => {
        filmsResults.value = allFilms
          .filter((x) => x.toLowerCase().indexOf(q) > -1)
          .map((x) => ({
            _text: x,
          }));
        filmsLoading.value = false;
      }, 500);
    };

    const toppings = ref({
      pepperoni: false,
      chicken: false,
      olives: false,
      pineapple: false,
    });
    const toppingsV = object({
      pepperoni: boolean(),
      chicken: boolean(),
      olives: boolean(),
      pineapple: boolean(),
    }).test("toppingsTest", null, (obj) => {
      if (obj.pineapple) {
        return new ValidationError(
          "Pineapple? Eww, whats wrong with you? Try again!",
          null,
          "myCustomFieldName"
        );
      }
      if (obj.pepperoni || obj.chicken || obj.olives) {
        return true; // everything is fine
      }

      return new ValidationError(
        "Please check one checkbox",
        null,
        "myCustomFieldName"
      );
    });

    const comment = ref("");
    const commentV = string().required("Required");

    //General Error variables
    const submitting = ref();
    const alert = ref();
    const onSubmit = (e) => {
      e.preventDefault();

      if (!form.validate().length) {
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
      name,
      nameV,
      pass,
      passV,
      pass2,
      pass2V,
      dob,
      dobV,
      countries,
      country,
      countryV,
      sexes,
      sexSelected,
      sexV,
      dobDisabled,
      films,
      filmsV,
      filmsLoading,
      filmsResults,
      filmsSearch,
      toppings,
      toppingsV,
      comment,
      commentV,
      onSubmit,
      submitting,
      alert,
      form,
    };
  },
  components: {
    FeatherAutocomplete,
    FeatherCheckbox,
    FeatherCheckboxGroup,
    FeatherDateInput,
    FeatherDropdown,
    FeatherInput,
    FeatherProtectedInput,
    FeatherRadio,
    FeatherRadioGroup,
    FeatherSelect,
    FeatherSpinner,
    FeatherTextarea,
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
