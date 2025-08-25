<template>
  <FeatherChart
    id="gaugeChartNoData"
    type="gauge"
    title="No Data"
    :data="gaugeNone"
    :size="'sm'"
    :options="options"
  ></FeatherChart>
  <FeatherChart
    id="gaugeChartNoThreshold"
    type="gauge"
    title="Single Gauge no Threshold"
    :data="gauge1NoThreshold"
    :size="'sm'"
    :options="options"
  ></FeatherChart>
  <FeatherChart
    id="gaugeChartWithThreshold"
    type="gauge"
    title="Chart With Thresholds"
    :data="gauge1"
    :size="'sm'"
    :options="options"
  ></FeatherChart>
  <FeatherChart
    id="gaugeChartMultipleSeries3"
    type="gauge"
    title="Multiple Gauges"
    :data="gauge3"
    :size="'xl'"
    :options="options"
  ></FeatherChart>
  <FeatherChart
    id="gaugeChartMultipleSeries10"
    type="gauge"
    title="Max Gauges"
    :data="gauge10"
    :size="'xl'"
    :options="options"
  ></FeatherChart>
</template>

<script setup lang="ts">
import { FeatherChart } from "./../src";
import type {
  FeatherChartFlexibleData,
  FeatherChartOptions,
} from "../src/components/types";

import { gaugeNoData, gaugeData1, gaugeData3, gaugeData10 } from "./demo-data";
import { computed } from "vue";

const gaugeNone = computed(() => {
  return {
    ...gaugeNoData,
  } as FeatherChartFlexibleData;
});

const gauge1 = computed(() => {
  return {
    ...gaugeData1,
  } as unknown as FeatherChartFlexibleData;
});

const gauge1NoThreshold = computed(() => {
  const stripped = gaugeData1.data.map((d: any) => {
    const { thresholds, ...rest } = d; // eslint-disable-line @typescript-eslint/no-unused-vars
    return rest;
  });
  return { data: stripped } as unknown as FeatherChartFlexibleData;
});

const gauge3 = computed(() => {
  return {
    ...gaugeData3,
  } as FeatherChartFlexibleData;
});

const gauge10 = computed(() => {
  return {
    ...gaugeData10,
  } as FeatherChartFlexibleData;
});

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
