<template>
  <div>
    <FeatherCheckboxGroup
      label="Please select pizza toppings"
      hint="Pineapple is not allowed."
      vertical
    >
      <FeatherCheckbox v-model="pepperoni"> Pepperoni </FeatherCheckbox>
      <FeatherCheckbox v-model="chicken"> Chicken </FeatherCheckbox>
      <FeatherCheckbox v-model="olives"> Olives </FeatherCheckbox>
    </FeatherCheckboxGroup>
  </div>
</template>
<script>
import { FeatherCheckbox, FeatherCheckboxGroup } from "@featherds/checkbox";
export default {
  components: {
    FeatherCheckbox,
    FeatherCheckboxGroup,
  },
  data: function () {
    return {
      chicken: false,
      pepperoni: true,
      olives: true,
    };
  },
};
</script>
