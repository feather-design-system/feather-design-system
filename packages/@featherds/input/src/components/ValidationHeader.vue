<template>
  <div
    class="errors"
    v-if="errors.length"
    data-ref-id="feather-validation-header"
  >
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
import { ref, computed, nextTick } from "vue";

export default {
  props: {
    errorList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const focusElement = (id) => {
      document.getElementById(id).focus();
    };
    const removeAsteriks = (str) => {
      return str.replace(/ \*$/, "");
    };
    const heading = ref();

    const errors = computed(() => {
      return props.errorList.map((v) => {
        v.fullMessage = `${removeAsteriks(v.label)} - ${v.message}`;
        return v;
      });
    });
    const errorsHeading = computed(() => {
      if (props.errorList.length) {
        nextTick(() => heading.value.focus());
      }
      return errors.value ? errors.value.length + " errors" : "";
    });

    return {
      errors,
      errorsHeading,
      heading,
      focusElement,
    };
  },
};
</script>
<style lang="scss" scoped></style>
