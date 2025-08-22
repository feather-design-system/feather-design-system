<template>
  <FeatherChart
    id="lineChartMultipleSeries"
    type="gauge"
    title="Gauge"
    :data="gaugeData1"
    :size="'sm'"
    :options="options"
  ></FeatherChart>
</template>

<script setup lang="ts">
import { FeatherChart } from "./../src";
import type {
  FeatherChartFlexibleData,
  FeatherChartOptions,
} from "../src/components/types";

import { gaugeData } from "./demo-data";

const gaugeData1 = {
  ...gaugeData,
} as FeatherChartFlexibleData;

const options: FeatherChartOptions = {
  units: "units",
  ariaSummary: "This chart shows stuff.",
  margin: {
    top: 33,
    right: 44,
    bottom: 44,
    left: 44,
  },
};
</script>

<style scoped></style>
