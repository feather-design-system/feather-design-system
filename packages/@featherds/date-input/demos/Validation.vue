<template>
  <form @submit="onSubmit">
    <FeatherDateInput
      v-model="dateField"
      :label="label"
      :schema="dateV"
      background
      class="my-date"
    ></FeatherDateInput>

    <button type="submit">Submit</button>
  </form>
</template>
<script lang="ts">
import { useForm } from "@featherds/input-helper";
import { date } from "yup";
import { ref, defineComponent, Ref } from "vue";
import * as components from "./../src";
export default defineComponent({
  setup() {
    const form = useForm();
    const dateField: Ref<Date | undefined> = ref();
    const dateV = date().required("required");

    const onSubmit = (_e: Event) => {
      form.validate();
    };

    const label = "Date of Birth or something";
    return {
      dateField,
      dateV,
      label,
      onSubmit,
    };
  },
  components: {
    ...components,
  },
});
</script>
<style lang="scss" scoped>
.my-date {
  width: 25rem;
}
</style>
