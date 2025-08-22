<template>
  <div class="demo">
    <FeatherChart
      :id="`${areaId}-sm`"
      title="Simple Area Chart (sm)"
      size="sm"
      :data="areaData as FeatherChartFlexibleData"
      :options="areaOptions"
      type="area"
      :axes="axes"
      @more="more"
      @refresh="refresh"
    >
      <template #filter>
        <FeatherButton
          @click="changeFilter(areaId, `1W`)"
          class="filter filterToday"
          text
          >1W</FeatherButton
        >
        <FeatherButton
          @click="changeFilter(areaId, '5Y')"
          class="filter filterToday"
          text
          >5Y</FeatherButton
        >
      </template>
    </FeatherChart>
    <FeatherChart
      :id="`${areaId}-md`"
      title="Simple Area Chart (md)"
      size="md"
      :data="areaData as FeatherChartFlexibleData"
      :options="areaOptions"
      type="area"
      :axes="axes"
      @more="more"
      @refresh="refresh"
    >
      <template #filter>
        <FeatherButton
          @click="changeFilter(areaId, `1W`)"
          class="filter filterToday"
          text
          >1W</FeatherButton
        >
        <FeatherButton
          @click="changeFilter(areaId, '5Y')"
          class="filter filterToday"
          text
          >5Y</FeatherButton
        >
      </template>
    </FeatherChart>
    <FeatherChart
      :id="`${areaId}-lg`"
      title="Simple Area Chart (lg)"
      size="lg"
      :data="areaData as FeatherChartFlexibleData"
      :options="areaOptions"
      type="area"
      :axes="axes"
      @more="more"
      @refresh="refresh"
    >
      <template #filter>
        <FeatherButton
          @click="changeFilter(areaId, `1W`)"
          class="filter filterToday"
          text
          >1W</FeatherButton
        >
        <FeatherButton
          @click="changeFilter(areaId, '5Y')"
          class="filter filterToday"
          text
          >5Y</FeatherButton
        >
      </template>
    </FeatherChart>
    <FeatherChart
      :id="`${areaId}-xl`"
      title="Simple Area Chart (xl)"
      size="xl"
      :data="areaData as FeatherChartFlexibleData"
      :options="areaOptions"
      type="area"
      :axes="axes"
      @more="more"
      @refresh="refresh"
    >
      <template #filter>
        <FeatherButton
          @click="changeFilter(areaId, `1W`)"
          class="filter filterToday"
          text
          >1W</FeatherButton
        >
        <FeatherButton
          @click="changeFilter(areaId, '5Y')"
          class="filter filterToday"
          text
          >5Y</FeatherButton
        >
      </template>
    </FeatherChart>
    <FeatherChart
      :id="`${areaId}-xxl`"
      title="Simple Area Chart (xxl)"
      size="xxl"
      :data="areaData as FeatherChartFlexibleData"
      :options="areaOptions"
      type="area"
      :axes="axes"
      @more="more"
      @refresh="refresh"
    >
      <template #filter>
        <FeatherButton
          @click="changeFilter(areaId, `1W`)"
          class="filter filterToday"
          text
          >1W</FeatherButton
        >
        <FeatherButton
          @click="changeFilter(areaId, '5Y')"
          class="filter filterToday"
          text
          >5Y</FeatherButton
        >
      </template>
    </FeatherChart>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { FeatherChart } from "./../src";
import { FeatherButton } from "@featherds/button";
import {
  FeatherChartAreaData,
  FeatherChartAxes,
  // FeatherChartData,
  FeatherChartFlexibleData,
  FeatherChartOptions,
} from "./../src/components/types";

import { areaDataset1, areaDataset2 } from "./demo-data";

const areaId = "area";

const axes: FeatherChartAxes = {
  x: "date",
  y: "value",
};
const areaOptions: FeatherChartOptions = {
  units: "gallons",
  ariaSummary: "This chart shows stuff.",
  margin: {
    top: 33,
    right: 10,
    bottom: 33,
    left: 50,
  },
  xAxis: {
    tickPadding: 6,
    tickRotation: 350,
    fontSize: 0.875,
  },
  yAxis: {
    tickPadding: 6,
    tickRotation: 0,
    fontSize: 0.875,
  },
};

// DATA
const areaData = reactive({} as FeatherChartAreaData);
Object.assign(areaData, areaDataset1);
console.log(areaData);

// HANDLE EVENTS
const more = (chartId: string, data: FeatherChartAreaData) => {
  console.log(`capture more filter event for ${chartId}`, data.data);
  const copy = JSON.parse(JSON.stringify(data));
  areaData.data.splice(0, areaData.data.length);
  Object.assign(areaData, copy);
};

const refresh = (chartId: string, data: FeatherChartAreaData) => {
  console.log(`capture refresh event for ${chartId}`, data);
  const copy = JSON.parse(JSON.stringify(data)) as FeatherChartAreaData;
  areaData.data.splice(0, areaData.data.length);
  Object.assign(areaData, copy);
};

const changeFilter = (chartId: string, span: string) => {
  console.log(`${chartId} captured change filter event for ${span}`);

  let newData: FeatherChartAreaData = {} as FeatherChartAreaData;

  switch (span) {
    case "1W":
      newData = JSON.parse(JSON.stringify(areaDataset1));
      Object.assign(areaData, newData);
      break;

    case "5Y":
      newData = JSON.parse(JSON.stringify(areaDataset2));
      Object.assign(areaData, newData);
      break;
  }
};
</script>
