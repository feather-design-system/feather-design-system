<template>
  <form @submit="onSubmit">
    <FeatherDateInput
      v-model="date"
      :label="label"
      :error="dateError"
      background
      class="my-date"
    ></FeatherDateInput>

    <button @mousedown="setSubmitted" type="submit">Submit</button>
  </form>
</template>
<script>

import { useForm, useField } from "vee-validate";
import { ref, computed } from "vue";
import * as components from "./../src";
export default {
  setup() {
    const submitted = ref(false);
    const schema = computed(() => {
      return {
        date(v) {
          if (submitted.value) {
            if (v) {
              return true;
            }
            return "Required";
          }
          return true;
        },
      };
    });
    // Create a form context with the validation schema
    const { handleSubmit } = useForm({
      validationSchema: schema,
    });

    const { value: date, errorMessage: dateError } = useField("date");

    const onSubmit = handleSubmit((values) => {
      console.log(values);
    });
    const setSubmitted = () => {
      submitted.value = true;
    };

    const label = "Date of Birth or something";
    return {
      date,
      dateError,
      label,
      setSubmitted,
      onSubmit,
    };
  },
  components: {
    ...components,
  },
};
</script>
<style lang="scss" scoped>
.my-date {
  width: 400px;
}
</style>
