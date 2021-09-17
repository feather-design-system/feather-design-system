<template>
  <div>
    <FeatherCheckboxGroup
      label="Some random label"
      hint="Test hint for this example"
    >
      <FeatherCheckbox v-model="subscribe"> Subscribe </FeatherCheckbox>
      <FeatherCheckbox v-model="ready"> Ready </FeatherCheckbox>
      <FeatherCheckbox v-model="approve"> Approvde </FeatherCheckbox>
    </FeatherCheckboxGroup>
    <FeatherCheckboxGroup
      label="Some random label"
      vertical
      hint="Test hint for this example"
    >
      <FeatherCheckbox v-model="subscribe"> Subscribe </FeatherCheckbox>
      <FeatherCheckbox v-model="ready"> Ready </FeatherCheckbox>
      <FeatherCheckbox v-model="approve"> Approvde </FeatherCheckbox>
    </FeatherCheckboxGroup>
  </div>
</template>
<script>
import { FeatherCheckbox, FeatherCheckboxGroup } from "../src";
export default {
  components: {
    FeatherCheckbox,
    FeatherCheckboxGroup,
  },
  data: function () {
    return {
      subscribe: false,
      approve: true,
      ready: true,
    };
  },
};
</script>
