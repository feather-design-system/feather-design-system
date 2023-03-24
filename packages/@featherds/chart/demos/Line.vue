<template>
  <FeatherChart
    id="lineChartMultipleSeries"
    type="line"
    title="Line Chart (multiple series, wide)"
    :data="lineData3SeriesNumbersWide"
    :size="'sm'"
    :options="options"
    :axes="axesAsMultipleSeries"
  ></FeatherChart>
  <FeatherChart
    id="lineChartDates"
    type="line"
    title="Line Chart (date x-axis)"
    :data="lineDataWDates"
    :size="'sm'"
    :options="options"
    :axes="axesAsDates"
  ></FeatherChart>
  <FeatherChart
    id="lineChartNumbers"
    type="line"
    title="Line Chart (numbers x-axis)"
    :data="lineDataWNumbers"
    :size="'sm'"
    :options="options"
    :axes="axesAsNumbers"
  ></FeatherChart>
  <FeatherChart
    id="lineChartCategory"
    type="line"
    title="Line Chart (category x-axis)"
    :data="lineDataWCategories"
    :size="'sm'"
    :options="options"
    :axes="axesAsCategories"
  ></FeatherChart>
</template>

<script setup lang="ts">
import { FeatherChart } from "./../src";
import type {
  FeatherChartAxes,
  FeatherChartFlexibleData,
  FeatherChartOptions,
} from "../src/components/types";

import {
  lineWNumbers,
  lineWDates,
  lineWCategoriesInteresting,
  line3SeriesNumbersWide,
} from "./demo-data";

const lineDataWDates = { ...lineWDates } as FeatherChartFlexibleData;
const lineDataWNumbers = { ...lineWNumbers } as FeatherChartFlexibleData;
const lineDataWCategories = {
  ...lineWCategoriesInteresting,
} as FeatherChartFlexibleData;
const lineData3SeriesNumbersWide = {
  ...line3SeriesNumbersWide,
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
  xAxis: {
    tickPadding: 8,
    tickRotation: 15,
    fontSize: 0.75,
  },
  yAxis: {
    tickPadding: 10,
    tickRotation: 0,
    fontSize: 0.875,
  },
};

const axesAsDates: FeatherChartAxes = {
  x: "date",
  y: "close",
};
const axesAsNumbers: FeatherChartAxes = {
  x: "point",
  y: "value",
};
const axesAsCategories: FeatherChartAxes = {
  x: "category",
  y: "value",
};
const axesAsMultipleSeries: FeatherChartAxes = {
  x: "sales",
  y: "", // not used in multiple series; can be empty
};
</script>

<style scoped></style>
