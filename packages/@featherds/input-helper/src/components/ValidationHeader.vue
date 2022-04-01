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
          getFullMessage(item)
        }}</a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import {
  ref,
  computed,
  nextTick,
  inject,
  watch,
  toRef,
  PropType,
  defineComponent,
} from "vue";
import { IValidationFailure } from "../composables/useForm";
export const props = {
  headingText: {
    type: Function as PropType<(s: unknown[]) => string>,
    default: (errors: unknown[]) => {
      if (errors.length && errors.length === 1) return "1 error";
      return `${errors.length} errors`;
    },
  },

  errorList: {
    type: Array as PropType<IValidationFailure[]>,
    default: () => [],
  },
  generalError: {
    type: String,
    default: "",
  },
};
export default defineComponent({
  props,
  setup(props) {
    const formErrors = inject(
      "featherFormErrors",
      ref([] as IValidationFailure[])
    );
    const propErrors = toRef(props, "errorList");
    const errors = computed(() => {
      return propErrors.value?.length ? propErrors.value : formErrors.value;
    });
    const mainError = toRef(props, "generalError");
    const focusElement = (id: string) => {
      (document.getElementById(id) as HTMLAnchorElement).focus();
    };
    const removeAsteriks = (str: string) => {
      return str.replace(/ \*$/, "");
    };
    const heading = ref();

    const getFullMessage = (v: IValidationFailure) => {
      return `${removeAsteriks(v.label)} - ${v.message}`;
    };
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
      getFullMessage,
    };
  },
});
</script>
<style lang="scss" scoped></style>
