<template>
  <form @submit="onSubmit" novalidate>
    <h1>Register, v2</h1>
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
<script>
import { string } from "yup";
import { ref, computed, provide, nextTick } from "vue";
import * as components from "./../src";

import { FeatherSpinner } from "@featherds/progress";

export default {
  setup() {
    const controls = {};
    provide("featherForm", {
      register: (input, validate) => {
        controls[input] = validate;
      },
    });
    const name = ref("");
    const nameV = string().required("Required");

    const email = ref("");
    const emailV = string().required("Required").email();
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
        }, 5000);
      }
    };

    const addHash = (str) => `#${str}`;
    return {
      email,
      emailV,
      name,
      nameV,
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
    ...components,
    FeatherSpinner,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
.alert {
  @include screen-reader();
}
</style>
