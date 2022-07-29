<template>
  <section>
    <FeatherProgressCircular
      :size="size"
    ></FeatherProgressCircular>
  </section>
</template>
<script>
import { FeatherProgressCircular } from "@featherds/progress";
export default {
  components: {
    FeatherProgressCircular,
  },
  data() {
    return {
      size: "sm",
    };
  },
};
</script>
