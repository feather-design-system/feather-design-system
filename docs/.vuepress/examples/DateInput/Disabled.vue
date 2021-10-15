<template>
  <section>
    <FeatherDateInput
      v-model="test"
      label="Appointment Date"
      :disabled-dates="disabledDates"
      class="my-date"
    ></FeatherDateInput>
  </section>
</template>
<script>
import { FeatherDateInput } from "@featherds/date-input";
export default {
  data() {
    return {
      test: undefined,
      disabledDates: {
        to: new Date(),
      },
    };
  },
  components: {
    FeatherDateInput,
  },
};
</script>
<style lang="scss" scoped>
.my-date {
  width: 400px;
}
</style>
