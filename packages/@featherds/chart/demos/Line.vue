<template>
  <FeatherChart
    id="lineChart1"
    type="line"
    title="Line Chart"
    :data="lineData"
    :size="'md'"
    :options="options"
    :axes="axes"
  ></FeatherChart>
</template>

<script setup lang="ts">
import { FeatherChart } from "./../src";
import type {
  FeatherChartAxes,
  FeatherChartFlexibleData,
  FeatherChartOptions,
} from "../src/components/types";

import { line1 } from "./demo-data";

const lineData = { ...line1 } as FeatherChartFlexibleData;

const options: FeatherChartOptions = {
  units: "units",
  ariaSummary: "This chart shows stuff.",
  margin: {
    top: 33,
    right: 33,
    bottom: 33,
    left: 44,
  },
  xAxis: {
    tickPadding: 10,
    tickRotation: 0,
  },
  yAxis: {
    tickPadding: 10,
    tickRotation: 335,
  },
};

const axes: FeatherChartAxes = {
  x: "date",
  y: "close",
};
</script>

<style scoped></style>
