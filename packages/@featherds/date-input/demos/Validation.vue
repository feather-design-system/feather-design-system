<template>
  <section>
    <ValidationObserver ref="validator" mode="lazy">
      <ValidationProvider
        :name="label"
        :rules="{ required: submitted, future: true }"
        v-slot="{ errors }"
      >
        <FeatherDateInput
          v-model="test"
          :label="label"
          :error="errors[0]"
          background
          class="my-date"
        ></FeatherDateInput>
      </ValidationProvider>
      <button @click="onSubmit">Submit</button>
    </ValidationObserver>
  </section>
</template>
<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import * as components from "./../src";
export default {
  data() {
    return {
      label: "Appointment Date",
      test: undefined,
      submitted: false,
      today: new Date(),
    };
  },
  methods: {
    onSubmit() {
      this.submitted = true;
      this.$nextTick(() => {
        this.$refs.validator.validate().then((v) => {
          if (v) {
            console.log(`email: ${this.email}`);
            console.log(`name: ${this.name}`);
          }
        });
      });
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    ...components,
  },
};
</script>
<style lang="scss" scoped>
.my-date {
  width: 400px;
}
</style>
