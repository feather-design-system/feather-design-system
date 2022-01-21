<template>
  <section>
    <FeatherInput
      :label="label"
      :hint="hint"
      v-model="value"
      class="my-text-input"
    />
    <div>
      {{ value }}
    </div>
  </section>
</template>
<script>
import { FeatherInput } from "@featherds/input";
export default {
  data() {
    return {
      label: "First Name",
      hint: "Please enter your first name",
      value: "",
    };
  },
  components: {
    FeatherInput,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
.my-text-input {
  width: 25rem;
}
</style>
