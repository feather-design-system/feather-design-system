<template>
  <feather-checkbox
    v-model="noLabel"
    label="Hey I am a label"
  ></feather-checkbox>
</template>
<script>
import { FeatherCheckbox } from "@featherds/checkbox";
export default {
  data: function () {
    return {
      noLabel: false,
    };
  },
  components: {
    FeatherCheckbox,
  },
};
</script>
