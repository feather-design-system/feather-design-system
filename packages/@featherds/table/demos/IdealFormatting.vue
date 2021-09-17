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
<script>
import IdealTable from "./components/IdealTable";
import { FeatherCheckbox } from "@featherds/checkbox";

export default {
  data() {
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
};
</script>
