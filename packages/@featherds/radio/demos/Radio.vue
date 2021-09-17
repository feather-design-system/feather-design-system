<template>
  <div>
    <feather-radio-group
      label="Can you repeat the question?"
      v-model="selected"
    >
      <feather-radio v-for="item in items" :value="item" :key="item">{{
        item
      }}</feather-radio>
    </feather-radio-group>
    <feather-radio-group
      label="Would you come back here again?"
      v-model="selectedB"
    >
      <feather-radio v-for="item in itemsB" :value="item" :key="item">{{
        item
      }}</feather-radio>
    </feather-radio-group>
  </div>
</template>
<script>
import { FeatherRadio, FeatherRadioGroup } from "../src";
export default {
  components: {
    FeatherRadio,
    FeatherRadioGroup,
  },
  data: function () {
    return {
      items: ["yes", "no", "maybe"],
      selected: "yes",
      itemsB: ["yes", "no", "maybe"],
      selectedB: "",
    };
  },
};
</script>
