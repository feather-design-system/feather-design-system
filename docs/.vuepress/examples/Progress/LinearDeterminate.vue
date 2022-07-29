<template>
  <section>
    <FeatherProgressLinear :value="value" :showPercentage="showPercentage"></FeatherProgressLinear>
  </section>
</template>
<script>
import { FeatherProgressLinear } from "@featherds/progress";
export default {
  components: {
    FeatherProgressLinear,
  },
  data() {
    return {
      value: 50,
      showPercentage: true,
    }
  }
};
</script>
