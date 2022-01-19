<template>
  <form @submit="onSubmit" novalidate>
    * indicates required
    <div class="errors" v-if="errors.length">
      <div class="error-heading" tabindex="-1" ref="heading">
        {{ errorsHeading }}
      </div>
      <ul>
        <li v-for="item in errors" :key="item.inputId">
          <a href="#" @click.prevent="focusElement(item.inputId)">{{
            item.fullMessage
          }}</a>
        </li>
      </ul>
    </div>
    <FeatherInput
      label="Email *"
      :modelValue="email"
      :schema="emailV"
      required
    />

    <FeatherInput
      label="Name *"
      :modelValue="name"
      :schema="nameV"
      required
    />

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

    <FeatherRadioGroup :label="'What is your sex? *'" v-model="sexSelected" :schema="sexV">
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
      hint="Pineapple is not allowed."
    >
      <FeatherCheckbox v-model="pepperoni"> Pepperoni </FeatherCheckbox>
      <FeatherCheckbox v-model="chicken"> Chicken </FeatherCheckbox>
      <FeatherCheckbox v-model="olives"> Olives </FeatherCheckbox>
      <FeatherCheckbox v-model="pineapple"> Pineapple </FeatherCheckbox>
    </FeatherCheckboxGroup>

    <FeatherTextarea
      v-model="comment"
      label="Leave a comment *"
      :schema="commentV"
      rows="5"
      required
    ></FeatherTextarea>

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
import { string, array, date } from "yup";
import { ref, computed, provide, nextTick } from "vue";
import { FeatherAutocomplete } from "@featherds/autocomplete";
import { FeatherCheckbox, FeatherCheckboxGroup } from "@featherds/checkbox";
import { FeatherDateInput } from "@featherds/date-input";
import { FeatherDropdown } from "@featherds/dropdown";
import { FeatherInput } from "@featherds/input";
import { FeatherProtectedInput } from "@featherds/protected-input";
import { FeatherRadio, FeatherRadioGroup } from "@featherds/radio";
import { FeatherSelect } from "@featherds/select";
import { FeatherTextarea } from "@featherds/textarea";

import { FeatherSpinner } from "@featherds/progress";

import allCountries from "./countries.js";

export default {
  setup() {
    const controls = {};
    provide("featherForm", {
      register: (input, validate) => {
        controls[input] = validate;
      },
    });
    //Field values and validation rules
    const name = ref("");
    const nameV = string().required("Required");

    const email = ref("");
    const emailV = string().required("Required").email();

    const pass = ref("");
    const passV = string().required("Required");
    const pass2 = ref("");
    const pass2V = string().required("Required");

    const dob = ref();
    const dobV = date().required("Required").max(new Date(Date.now() - 86400000));
    const dobDisabled = { from: new Date() };

    const countries = allCountries;
    const country = ref();
    const countryV = string().required("Required");

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
    const allFilms = ["Terminator 2", "True Lies", "Eraser", "Last Action Hero", "Commando", "Predator", "Total Recall", "Twins", "Kung Fury 2"];
    const filmsResults = ref([]);
    const filmsSearch = function(q) {
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

    const pepperoni = ref(false);
    const chicken = ref(false);
    const olives = ref(false);
    const pineapple = ref(false);

    const comment = ref("");
    const commentV = string().required("Required");

    //General Error variables
    const errors = ref([]);
    const errorsHeading = ref("");
    const heading = ref();
    const submitting = ref();
    const alert = ref();
    const removeAsteriks = (str) => {
      return str.replace(/ \*$/, "");
    };
    const focusElement = (id) => {
      document.getElementById(id).focus();
    };
    const onSubmit = (e) => {
      errors.value = [];
      e.preventDefault();
      const validation = Object.keys(controls).map((key) => {
        return controls[key]();
      });
      errors.value = validation
        .filter((x) => x.success === false)
        .map((v) => {
          v.fullMessage = `${removeAsteriks(v.label)} - ${v.message}`;
          return v;
        });

      if (errors.value.length) {
        errorsHeading.value = errors.value
          ? errors.value.length + " errors"
          : "";
        nextTick(() => heading.value.focus());
      } else {
        submitting.value = true;
        alert.value.textContent = "Submitting form, please wait";

        setTimeout(() => {
          alert.value.textContent = "Submission successful";
          submitting.value = false;
        }, 3000);
      }
    };

    const addHash = (str) => `#${str}`;
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
      pepperoni,
      chicken,
      olives,
      pineapple,
      comment,
      commentV,
      onSubmit,
      errors,
      errorsHeading,
      heading,
      addHash,
      focusElement,
      submitting,
      alert,
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
    FeatherTextarea
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
.alert {
  @include screen-reader();
}
</style>
