<template>
  <section>
    <FeatherDateInput
      v-model="test"
      label="Appointment Date"
      background
      class="my-date"
    ></FeatherDateInput>
  </section>
</template>
<script>
import * as components from "./../src";
export default {
  data() {
    return {
      test: undefined,
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
