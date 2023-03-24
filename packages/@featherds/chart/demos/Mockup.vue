<template>
  <div class="container">
    <h1>Vue Chart using Chart.js</h1>
    <component
      :is="FeatherChart"
      :chartData="(data as FeatherBarChartData)"
      :chartOptions="options"
      :ariaDesc="description"
      :type="(type as FeatherChartType)"
      title="Food Preferences"
    >
    </component>
  </div>
  <!-- <div class="container">
    <component
      :is="FeatherChart"
      :chartData="data"
      :chartOptions="options"
      :ariaDesc="description"
      type="bar"
      title="Other Chart"
    >
    </component>
  </div> -->
</template>

<script lang="ts" setup>
import {
  FeatherBarChartData,
  FeatherBarChartOptions,
  FeatherChartType,
} from "../src/components/types";
import { PropType, reactive, ref } from "vue";
import { FeatherChart } from "./../src";

const props = defineProps({
  data: Object as PropType<FeatherBarChartData>,
  options: Object as PropType<FeatherBarChartOptions>,
  type: String as PropType<FeatherChartType>,
});

let { data, options, type } = reactive(props);
type = "bar";
const description = ref("Number of Votes from 0 to 20.");

data = {
  labels: ["men", "women", "dogs", "cats"],
  datasets: [
    {
      label: "Fruits",
      data: [15, 19, 20, 2],
    },
    {
      label: "Veggies",
      data: [14, 12, 15, 1],
    },
    {
      label: "Sweets",
      data: [18, 19, 10, 4],
    },
  ],
};

data.labels = ["Men", "Women", "Dogs", "Cats"];
</script>

<style scoped></style>
