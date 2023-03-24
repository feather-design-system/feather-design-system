<template>
  <div class="demo">
    <FeatherChart
      :id="vbId"
      type="vertical-bar"
      :title="vbarTitle"
      :data="verticalBarData"
      size="md"
      :options="options"
      :axes="axes"
      @type="changeType"
      @more="more"
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
  FeatherChartData,
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
const verticalBarData = reactive([] as FeatherChartData);
Object.assign(verticalBarData, vbarstackeddata1);

// HANDLE EVENTS
const more = (chartId: string) => {
  console.log(`capture more filter event for ${chartId}`);
  verticalBarData.splice(0, verticalBarData.length);
  Object.assign(verticalBarData, vbarstackeddata1);
};
const changeFilter = (chartId: string, span: string) => {
  console.log(`${chartId} captured change filter event for ${span}`);

  switch (span) {
    case "BOS":
      verticalBarData.splice(0, verticalBarData.length);
      Object.assign(verticalBarData, vbarstackeddata1);
      break;
    case "PHI":
      verticalBarData.splice(0, verticalBarData.length);
      Object.assign(verticalBarData, vbarstackeddata2);
      break;
  }
};

const changeType = (id: string, span: string) => {
  console.log(`${id} captured change type event for ${span}`);
  verticalBarData.splice(0, verticalBarData.length);
  Object.assign(verticalBarData, vbarstackeddata1);
  console.log(verticalBarData);
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
.demo {
  display: inline;
}
</style>
