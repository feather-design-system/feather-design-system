<template>
  <div>
    <feather-radio-group
      :label="'Favourite object type?'"
      v-model="selected"
      hint="Hint Text"
    >
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
<script lang="ts">
import { FeatherRadioGroup, FeatherRadio } from "../src";
import { ref, onMounted, defineComponent } from "vue";
export default defineComponent({
  components: {
    FeatherRadio,
    FeatherRadioGroup,
  },
  setup() {
    const items = ref([] as { name: string; value: unknown }[]);
    const selected = ref();
    onMounted(() => {
      setTimeout(() => {
        items.value = [
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
        ];
      }, 1000);
    });

    return { items, selected };
  },
});
</script>
