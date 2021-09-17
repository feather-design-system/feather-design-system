<template>
  <section>
    <FeatherDateInput
      v-model="test"
      label="Appointment Date"
      :disabled-dates="disabledDates"
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
      disabledDates: {
        from: new Date(),
      },
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
