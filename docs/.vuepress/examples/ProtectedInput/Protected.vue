<template>
  <section>
    <FeatherProtectedInput
      class="my-password-input"
      label="Password"
      v-model="value"
    ></FeatherProtectedInput>
  </section>
</template>
<script>
import { FeatherProtectedInput } from "@featherds/protected-input";
export default {
  data() {
    return {
      value: "",
    };
  },
  components: {
    FeatherProtectedInput,
  },
};
</script>
<style lang="scss" scoped>
.my-password-input {
  width: 25rem;
}
</style>
