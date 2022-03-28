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
<script lang="ts">
import * as components from "./../src";
import { defineComponent } from "vue";
export default defineComponent({
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
});
</script>
<style lang="scss" scoped>
.my-date {
  width: 25rem;
}
</style>
