<template>
  <ValidationObserver ref="validator">
    <ValidationProvider
      :name="emailLabel"
      :rules="{ required: submitted, email: true }"
      v-slot="{ errors }"
    >
      <FeatherInput
        :label="emailLabel"
        :error="errors[0]"
        v-model="email"
        background
      />
    </ValidationProvider>
    <ValidationProvider
      :name="nameLabel"
      :rules="{ required: submitted }"
      v-slot="{ errors }"
    >
      <FeatherInput
        :label="nameLabel"
        :error="errors[0]"
        v-model="name"
        background
      />
    </ValidationProvider>
    <button @click="onSubmit">Submit</button>
  </ValidationObserver>
</template>
<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import * as components from "./../src";
export default {
  data() {
    return {
      emailLabel: "Email",
      email: "",
      nameLabel: "Name",
      name: "",
      submitted: false,
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
