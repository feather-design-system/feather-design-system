<template>
  <div>
    <feather-radio-group :label="'Favourite object type?'" v-model="selected">
      <feather-radio
        v-for="item in items"
        :value="item.value"
        :key="item.name"
        >{{ item.name }}</feather-radio
      >
    </feather-radio-group>

    <div>Your favourite type can have a value of {{ selected }}</div>
  </div>
</template>
<script>
import { FeatherRadioGroup, FeatherRadio } from "@featherds/radio";
export default {
  components: {
    FeatherRadio,
    FeatherRadioGroup,
  },
  data: function () {
    return {
      items: [
        {
          name: "String",
          value: "Hello",
        },
        {
          name: "Number",
          value: 5,
        },
        {
          name: "Object",
          value: { rik: "hisname" },
        },
      ],
      selected: 5,
    };
  },
};
</script>
