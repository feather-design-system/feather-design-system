<template>
  <div
    class="errors"
    v-if="errors.length || mainError.length"
    data-ref-id="feather-validation-header"
  >
    <div class="error-heading" tabindex="-1" ref="heading">
      <span v-if="errors.length">{{ errorsHeading }}<br /></span>
      {{ mainError }}
    </div>
    <ul>
      <li v-for="item in errors" :key="item.inputId">
        <a href="#" @click.prevent="focusElement(item.inputId)">{{
          item.fullMessage
        }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, computed, nextTick, inject, watch, toRef } from "vue";
export default {
  props: {
    headingText: {
      type: Function,
      default: (errors) => {
        if (errors.length && errors.length === 1) return "1 error";
        return `${errors.length} errors`;
      },
    },
    generalError: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const errorList = inject("featherFormErrors", ref([]));
    const mainError = toRef(props, "generalError");
    const focusElement = (id) => {
      document.getElementById(id).focus();
    };
    const removeAsteriks = (str) => {
      return str.replace(/ \*$/, "");
    };
    const heading = ref();

    const errors = computed(() => {
      return errorList.value.map((v) => {
        v.fullMessage = `${removeAsteriks(v.label)} - ${v.message}`;
        return v;
      });
    });
    const errorsHeading = computed(() => {
      if (errors.value.length) {
        nextTick(() => heading.value.focus());
      }
      return props.headingText(errors.value);
    });

    watch(mainError, (v) => {
      if (v.length) {
        nextTick(() => heading.value.focus());
      }
    });

    return {
      errors,
      errorsHeading,
      heading,
      focusElement,
      mainError,
    };
  },
};
</script>
<style lang="scss" scoped></style>
