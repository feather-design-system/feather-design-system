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
@import "@featherds/input-helper/scss/spacing";
form {
  @include form-spacing();
}
</style>
