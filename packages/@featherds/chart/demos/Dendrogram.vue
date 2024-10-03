<template>
  <div class="demo">
    <template id="icon-resources">
      <FeatherIcon id="view-icon" :icon="View" />
      <FeatherIcon id="router-icon" :icon="Router" />
      <FeatherIcon id="person-icon" :icon="Person" />
      <FeatherIcon id="server-icon" :icon="Server" />
      <!-- <FeatherIcon id="default-icon" :icon="Unconnected" /> -->
      <FeatherIcon id="default-icon" :icon="ContactSupport" />
    </template>

    <FeatherChart
      :id="dendroId"
      title="Dendrogram"
      size="sm"
      :data="hierarchicalData"
      type="dendrogram"
      :axes="dendroAxes"
      :options="dendroOptions"
      @type="changeType"
      @more-event="more"
      @refresh-event="refresh"
    >
      <!-- @filter="changeFilter" -->
      <template #filter>
        <FeatherButton @click="changeFilter(dendroId, '1')" class="filter" text
          >View 1</FeatherButton
        >
        <FeatherButton @click="changeFilter(dendroId, '2')" class="filter" text
          >View 2</FeatherButton
        >
        <FeatherButton @click="changeFilter(dendroId, '3')" class="filter" text
          >View 3</FeatherButton
        >
      </template>
    </FeatherChart>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { FeatherChart } from "./../src";
import { FeatherButton } from "@featherds/button";
import { FeatherIcon } from "@featherds/icon";
import {
  FeatherChartAxes,
  // FeatherChartData,
  FeatherChartDendrogramData,
  FeatherChartOptions,
} from "./../src/components/types";

import Person from "@featherds/icon/action/Person";
import View from "@featherds/icon/action/View";
import Router from "@featherds/icon/hardware/Router";
import Server from "@featherds/icon/hardware/Server";
// import Unconnected from "@featherds/icon/notification/Unconnected";
import ContactSupport from "@featherds/icon/action/ContactSupport";

import { dendroData1, dendroData2, dendroData3 } from "./demo-data";

const dendroId = "dendro";

const dendroAxes: FeatherChartAxes = {
  x: "year",
  y: "",
};
const dendroOptions: FeatherChartOptions = {
  units: "units",
  ariaSummary: "This chart shows stuff.",
  margin: {
    top: 33,
    right: 33,
    bottom: 33,
    left: 33,
  },
  xAxis: {
    tickPadding: 0,
    tickRotation: 0,
  },
  yAxis: {
    tickPadding: 0,
    tickRotation: 0,
  },
};

// DATA
const hierarchicalData = reactive({} as FeatherChartDendrogramData);
Object.assign(hierarchicalData, dendroData1);

// HANDLE EVENTS
const more = (chartId: string, data: FeatherChartDendrogramData) => {
  console.log(`capture more filter event for ${chartId}`, data);
  const copy = JSON.parse(JSON.stringify(data));
  Object.assign(hierarchicalData, copy);
};

const refresh = (chartId: string, data: FeatherChartDendrogramData) => {
  console.log(`captured refresh event for ${chartId}`, data);
  const copy = JSON.parse(JSON.stringify(data));
  Object.assign(hierarchicalData, copy);
};

const changeFilter = (chartId: string, span: string) => {
  console.log(`${chartId} captured change filter event for ${span}`);

  switch (span) {
    case "1":
      Object.assign(hierarchicalData, dendroData1);
      break;
    case "2":
      Object.assign(hierarchicalData, dendroData2);
      break;
    case "3":
      Object.assign(hierarchicalData, dendroData3);
      break;
  }
};

const changeType = (id: string, span: string) => {
  console.log(`${id} captured change type event for ${span}`);
  // hierarchicalData.data.splice(0, hierarchicalData.data.length);
  Object.assign(hierarchicalData, dendroData3);
};
</script>

<style lang="scss" scoped>
.demo {
  display: inline;
}
</style>
