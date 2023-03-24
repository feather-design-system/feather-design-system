<template>
  <div class="demo">
    <FeatherChart
      :id="vbId"
      type="vertical-bar"
      :title="vbarTitle"
      :data="verticalBarData as FeatherChartFlexibleData"
      size="md"
      :options="options"
      :axes="axes"
      @type="changeType"
      @more-event="more"
      @refresh-event="refresh"
    >
      <template #filter>
        <FeatherButton @click="changeFilter(vbId, 'BOS')" class="filter" text
          >BOS</FeatherButton
        >
        <FeatherButton @click="changeFilter(vbId, 'PHI')" class="filter" text
          >PHI</FeatherButton
        >
      </template>
    </FeatherChart>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { FeatherChart } from "./../src";
import { FeatherButton } from "@featherds/button";
import {
  FeatherChartAxes,
  FeatherChartBarData,
  FeatherChartFlexibleData,
  FeatherChartOptions,
} from "./../src/components/types";
import { vbarstackeddata1, vbarstackeddata2 } from "./demo-data";

const axes: FeatherChartAxes = {
  x: "year",
  y: "",
};
const options: FeatherChartOptions = {
  units: "units",
  ariaSummary: "This chart shows stuff.",
  margin: {
    top: 33,
    right: 33,
    bottom: 33,
    left: 33,
  },
  xAxis: {
    tickPadding: 3,
    tickRotation: 25,
  },
  yAxis: {
    tickPadding: 3,
    tickRotation: -15,
  },
};

const vbId = "verticalbar1";

let vbarTitle = "Vertical Bar Chart";

// DATA
const verticalBarData = reactive({} as FeatherChartBarData);
Object.assign(verticalBarData, vbarstackeddata1);

// HANDLE EVENTS
const more = (chartId: string, data: FeatherChartBarData) => {
  console.log(`capture more filter event for ${chartId}`, data);
  const copy = JSON.parse(
    JSON.stringify(vbarstackeddata2)
  ) as FeatherChartBarData;
  verticalBarData.data.splice(0, verticalBarData.data.length);
  Object.assign(verticalBarData, copy);
};

const refresh = (chartId: string, data: FeatherChartBarData) => {
  console.log("refresh", chartId, data);
  const copy = JSON.parse(JSON.stringify(data)) as FeatherChartBarData;
  verticalBarData.data.splice(0, verticalBarData.data.length);
  Object.assign(verticalBarData, copy);
};

const changeFilter = (chartId: string, span: string) => {
  console.log(`${chartId} captured change filter event for ${span}`);

  let newData: FeatherChartBarData = {} as FeatherChartBarData;

  switch (span) {
    case "BOS":
      newData = JSON.parse(JSON.stringify(vbarstackeddata1));
      Object.assign(verticalBarData, newData);
      break;
    case "PHI":
      newData = JSON.parse(JSON.stringify(vbarstackeddata2));
      Object.assign(verticalBarData, newData);
      break;
  }
};

const changeType = (id: string, span: string) => {
  console.log(`${id} captured change type event for ${span}`);
  verticalBarData.data.splice(0, verticalBarData.data.length);
  Object.assign(verticalBarData.data, vbarstackeddata1);
  console.log(verticalBarData);
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
.demo {
  display: inline;
}
</style>
