<template>
  <feather-checkbox
    v-model="noLabel"
    label="Hey I am a label"
    no-focus
  ></feather-checkbox>
</template>
<script lang="ts">
import { FeatherCheckbox } from "../src";
import { defineComponent } from "vue";
export default defineComponent({
  data: function () {
    return {
      noLabel: false,
    };
  },
  components: {
    FeatherCheckbox,
  },
});
</script>
