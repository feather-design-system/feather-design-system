<template>
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
</template>
<script>
import { ref, computed, nextTick, inject } from "vue";

export default {
  props: {},
  setup() {
    const form = inject("featherForm", false);
    const errorList = ref([]);
    const focusElement = (id) => {
      document.getElementById(id).focus();
    };
    const removeAsteriks = (str) => {
      return str.replace(/ \*$/, "");
    };
    const runValidation = () => {
      errorList.value = form.runValidation();
      return errorList.value.length;
    };
    const heading = ref();

    const errors = computed(() => {
      return errorList.value.map((v) => {
        v.fullMessage = `${removeAsteriks(v.label)} - ${v.message}`;
        return v;
      });
    });
    const errorsHeading = computed(() => {
      if (errorList.value.length) {
        nextTick(() => heading.value.focus());
      }
      return errors.value ? errors.value.length + " errors" : "";
    });

    return {
      errors,
      errorsHeading,
      heading,
      focusElement,
      runValidation,
    };
  },
};
</script>
<style lang="scss" scoped></style>
