<template>
  <FeatherChart
    id="gaugeChartNoThreshold"
    ref="gaugeChartNoThresholdRef"
    type="gauge"
    title="Single Gauge no Threshold"
    :data="gauge1NoThreshold"
    :size="'sm'"
    :options="options"
    @refresh="refresh"
  ></FeatherChart>
  <FeatherChart
    id="gaugeChartWithThreshold"
    ref="gaugeChartWithThresholdRef"
    type="gauge"
    title="Gauge With Thresholds"
    :data="gauge1"
    :size="'sm'"
    :options="options"
    @refresh="refresh"
  ></FeatherChart>
  <FeatherChart
    id="gaugeChartNoData"
    ref="gaugeChartNoDataRef"
    type="gauge"
    title="No Data"
    :data="gaugeNone"
    :size="'sm'"
    :options="options"
    @refresh="refresh"
  ></FeatherChart>
  <FeatherChart
    id="gaugeChartMultipleSeries3"
    ref="gaugeChartMultipleSeries3Ref"
    type="gauge"
    title="Multiple Gauges"
    :data="gauge3"
    :size="'xl'"
    :options="options"
    @refresh="refresh"
  ></FeatherChart>
  <FeatherChart
    id="gaugeChartMultipleSeries10"
    ref="gaugeChartMultipleSeries10Ref"
    type="gauge"
    title="Max Gauges"
    :data="gauge10"
    :size="'xl'"
    :options="options"
    @refresh="refresh"
  ></FeatherChart>
</template>

<script setup lang="ts">
import { FeatherChart } from "./../src";
import type {
  FeatherChartFlexibleData,
  FeatherChartOptions,
} from "../src/components/types";

import { gaugeNoData, gaugeData1, gaugeData3, gaugeData10 } from "./demo-data";
import { computed, ref } from "vue";

const gaugeChartNoDataRef = ref<InstanceType<typeof FeatherChart> | null>(null);
const gaugeChartNoThresholdRef = ref<InstanceType<typeof FeatherChart> | null>(
  null
);
const gaugeChartWithThresholdRef = ref<InstanceType<
  typeof FeatherChart
> | null>(null);
const gaugeChartMultipleSeries3Ref = ref<InstanceType<
  typeof FeatherChart
> | null>(null);
const gaugeChartMultipleSeries10Ref = ref<InstanceType<
  typeof FeatherChart
> | null>(null);

const refMap: Record<string, any> = {
  gaugeChartNoData: gaugeChartNoDataRef,
  gaugeChartNoThreshold: gaugeChartNoThresholdRef,
  gaugeChartWithThreshold: gaugeChartWithThresholdRef,
  gaugeChartMultipleSeries3: gaugeChartMultipleSeries3Ref,
  gaugeChartMultipleSeries10: gaugeChartMultipleSeries10Ref,
};

const refresh = (chartId: string, data: FeatherChartFlexibleData) => {
  console.log("data", data);
  const gauge = refMap[chartId].value;
  gauge?.forceRedraw?.() || gauge?.draw?.();
};

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
