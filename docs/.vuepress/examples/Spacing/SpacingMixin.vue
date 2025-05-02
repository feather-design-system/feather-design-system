<template>
  <form>
    <FeatherInput
      label="Test 1"
      :modelValue="test"
    />
    <FeatherInput
      label="Test 2"
      :modelValue="test"
    />
    <FeatherInput
      label="Test 3"
      :modelValue="test"
    />
  </form>
</template>
<script>
import { ref } from "vue";
import { FeatherInput } from "@featherds/input";

export default {
  setup() {
    const test = ref("");

    return {
      test
    };
  },
  components: {
    FeatherInput,
  },
};
</script>
<style lang="scss" scoped>
@use "@featherds/input-helper/scss/spacing" as spacing;
form {
  @include spacing.form-spacing();
}
</style>
