<template>
  <div>
    <feather-radio-group
      :label="'Favourite object type?'"
      v-model="selectedC"
      hint="Hint Text"
      class="test"
      data-ref-id="test"
    >
      <feather-radio
        v-for="(item, index) in itemsC"
        :value="item.value"
        :key="item.name"
        :disabled="index === disabled"
        >{{ item.name }}</feather-radio
      >
    </feather-radio-group>

    <feather-radio-group
      :label="'Favourite object type?'"
      v-model="selectedC"
      vertical
      hint="Hint Text"
    >
      <feather-radio
        v-for="item in itemsC"
        :value="item.value"
        :key="item.name"
        >{{ item.name }}</feather-radio
      >
    </feather-radio-group>

    <div>Your favourite type can have a value of {{ selectedC }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { FeatherRadioGroup, FeatherRadio } from "../src";
export default defineComponent({
  components: {
    FeatherRadio,
    FeatherRadioGroup,
  },
  data: function () {
    return {
      itemsC: [
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
      selectedC: 5,
      disabled: 1,
    };
  },
});
</script>
