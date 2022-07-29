<template>
  <section>
    <FeatherProgressCircular
      :value="value"
      :showPercentage="showPercentage"
      :size="size"
    ></FeatherProgressCircular>
  </section>
</template>
<script>
import { FeatherProgressCircular } from "@featherds/progress";
export default {
  components: {
    FeatherProgressCircular
},
  data() {
    return {
      value: 0,
      showPercentage: true,
      size: "lg"
    };
  },
  mounted() {
    this.value = 75;
  }
};
</script>
