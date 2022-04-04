<template>
  <section>
    <h2>Configure</h2>

    <FeatherCheckbox v-model="striped">Striped</FeatherCheckbox>
    <FeatherCheckbox v-model="condensed">Condensed</FeatherCheckbox>
    <FeatherCheckbox v-model="hover">Hover</FeatherCheckbox>
    <FeatherCheckbox v-model="selected">Selected</FeatherCheckbox>

    <IdealTable
      :selected="selected"
      :striped="striped"
      :condensed="condensed"
      :hover="hover"
    ></IdealTable>
  </section>
</template>
<script lang="ts">
import IdealTable from "./components/IdealTable.vue";
import { FeatherCheckbox } from "@featherds/checkbox";
import { defineComponent } from "vue";

export default defineComponent({
  data: function () {
    return {
      striped: false,
      condensed: false,
      hover: false,
      selected: false,
    };
  },
  components: {
    IdealTable,
    FeatherCheckbox,
  },
});
</script>
