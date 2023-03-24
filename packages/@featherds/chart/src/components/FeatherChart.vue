<template>
  <div>
    <h3>{{ title }}</h3>
    <div class="container">
      <component
        :is="chartType"
        :data="(chartData as FeatherBarChartData)"
        :options="chartOptions"
        role="img"
        :aria-label="ariaDesc"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  FeatherBarChartData,
  FeatherBarChartOptions,
  FeatherChartType,
  ShirtSize,
} from "./types";
import { computed, PropType, reactive } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.plugins.legend.position = "bottom";

const props = defineProps({
  chartData: Object as PropType<FeatherBarChartData>,
  chartOptions: Object as PropType<FeatherBarChartOptions>,
  type: String as PropType<FeatherChartType>,
  title: String,
  size: { type: String as PropType<ShirtSize>, default: "md", required: false },
  ariaDesc: { type: String, required: true },
});

const { chartData, chartOptions, type, title } = reactive(props);
/*
  COLORS
*/
const getColor = (pos: number): string => {
  const palette = ["#FF7F3F", "#5D9C59", "#FF597B"];
  if (pos > palette.length) {
    pos = pos % palette.length;
  }
  return palette[pos];
};

const getColors = () => {
  if (!chartData) return;
  for (let i = 0; i < chartData.datasets.length; i++) {
    chartData.datasets[i].backgroundColor = getColor(i);
  }
};

const chartType = computed(() => {
  return type === "bar" ? Bar : null;
});

getColors();
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";

.container {
  width: 400px;
  height: 250px;
  align-self: left;
  vertical-align: auto;
  padding: 1em;
  background: var($surface);
}
</style>
