<template>
  <div>
    <feather-radio-group label="should skip no" v-model="disabledSelectedA">
      <feather-radio
        v-for="item in disabledA"
        :value="item"
        :key="item"
        :disabled="item === 'no'"
        >{{ item }}</feather-radio
      >
    </feather-radio-group>
    <feather-radio-group
      label="should skip yes select no on tab"
      v-model="disabledSelectedB"
    >
      <feather-radio
        v-for="item in disabledA"
        :value="item"
        :key="item"
        :disabled="item === 'yes'"
        >{{ item }}</feather-radio
      >
    </feather-radio-group>
    <feather-radio-group
      label="should not be able to move selection"
      v-model="disabledSelectedC"
    >
      <feather-radio
        v-for="item in disabledA"
        :value="item"
        :key="item"
        :disabled="item === 'yes'"
        >{{ item }}</feather-radio
      >
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
      disabledA: ["yes", "no", "maybe"],
      disabledSelectedA: "",
      disabledSelectedB: "",
      disabledSelectedC: "yes",
    };
  },
};
</script>
