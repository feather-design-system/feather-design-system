<template>
  <div class="demo-container">
    <template id="icon-resources">
      <FeatherIcon id="icon-column" :icon="Text" />
      <FeatherIcon id="icon-database" :icon="AppliancesAlt" />
      <FeatherIcon id="icon-server" :icon="Server" />
      <FeatherIcon id="icon-table" :icon="GridView" />
      <FeatherIcon id="icon-default" :icon="ContactSupport" />
    </template>

    <!-- :axes="treeDiagramAxes" -->
    <FeatherChart
      :id="treeDiagramId"
      title="Tree Diagram"
      size="xl"
      :data="hierarchicalData as FeatherChartFlexibleData"
      type="tree-diagram"
      :options="treeDiagramOptions"
      @type="changeType"
      @more-event="more"
      @refresh-event="refresh"
    >
      <template #content>
        <FeatherExpansionPanel
          :id="`#${treeDiagramId}-node-detail`"
          draggable="true"
          @mousedown.prevent="beginDrag"
          @mousemove="continueDrag"
          @mouseup="endDrag"
          @mouseleave="endDrag"
          :style="{
            transform: `translate(${detailPos.x}px, ${detailPos.y}px)`,
          }"
          title="Details"
          :expanded="true"
          class="details-panel"
        >
          <template #default>
            <div v-html="details" />
          </template>
        </FeatherExpansionPanel>
      </template>
      <template #filter>
        <FeatherButton
          @click="changeFilter(treeDiagramId, '1')"
          class="filter"
          text
          >View 1</FeatherButton
        >
        <FeatherButton
          @click="changeFilter(treeDiagramId, '2')"
          class="filter"
          text
          >View 2</FeatherButton
        >
        <FeatherButton
          @click="changeFilter(treeDiagramId, '3')"
          class="filter"
          text
          >View 3</FeatherButton
        >
      </template>
    </FeatherChart>
  </div>
</template>
<script lang="ts" setup>
import { provide, reactive, ref } from "vue";
import { FeatherChart } from "./../src";
import { FeatherButton } from "@featherds/button";
import { FeatherIcon } from "@featherds/icon";
import { FeatherExpansionPanel } from "@featherds/expansion";
import {
  // FeatherChartAxes,
  FeatherChartFlexibleData,
  // FeatherChartData,
  FeatherChartTreeDiagramData,
  // FeatherChartFlexibleData,
  FeatherChartOptions,
} from "./../src/components/types";

import AppliancesAlt from "@featherds/icon/hardware/AppliancesAlt";
import GridView from "@featherds/icon/navigation/GridView";
import Server from "@featherds/icon/hardware/Server";
import Text from "@featherds/icon/file/Text";
// import Unconnected from "@featherds/icon/notification/Unconnected";
import ContactSupport from "@featherds/icon/action/ContactSupport";

import { useDraggable } from "@featherds/composables/events/Drag";
const {
  position: detailPos,
  beginDrag,
  continueDrag,
  endDrag,
} = useDraggable();

const treeDiagramId = "tree-diagram";
// const treeDiagramAxes: FeatherChartAxes = {
//   x: "",
//   y: "",
// };
const treeDiagramOptions: FeatherChartOptions = {
  units: "units",
  ariaSummary: "This chart shows stuff.",
  margin: {
    top: 40,
    right: 8,
    bottom: 60,
    left: 8,
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

import { treeData, treeData4, treeData3 } from "./demo-data";
const hierarchicalData = reactive({} as FeatherChartTreeDiagramData);
Object.assign(hierarchicalData, treeData);

const details = ref("Details go here");

// HANDLE EVENTS
const more = (chartId: string, data: FeatherChartTreeDiagramData) => {
  console.log(`capture more filter event for ${chartId}`, data);
  const copy = JSON.parse(JSON.stringify(data));
  Object.assign(hierarchicalData, copy);
};

const refresh = (chartId: string, data: FeatherChartTreeDiagramData) => {
  console.log(`captured refresh event for ${chartId}`, data);
  const copy = JSON.parse(JSON.stringify(data));
  Object.assign(hierarchicalData, copy);
};

const changeFilter = (chartId: string, span: string) => {
  console.log(`${chartId} captured change filter event for ${span}`);

  switch (span) {
    case "1":
      Object.assign(hierarchicalData, treeData);
      break;
    case "2":
      Object.assign(hierarchicalData, treeData4);
      break;
    case "3":
      Object.assign(hierarchicalData, treeData3);
      break;
  }
};

const changeType = (id: string, span: string) => {
  console.log(`${id} captured change type event for ${span}`);
  Object.assign(hierarchicalData, treeData);
};

const handleNodeClick = (id: string, d: any) => {
  console.log("Node click received from Demo: ", id, d);

  // const { children, name, parent, status, type } = d.data;
  const { children, name, parent, status, type } = d.data;
  const { depth, height } = d;

  let value = `<b>Node:</b> ${name}\n<b>Type: </b> ${type}\n<b>Parent:</b> ${parent} \n<b>Status:</b> ${status} \n`;
  value += `<b>Depth: </b> ${depth}\n`;
  value += `<b>Height: </b> ${height}\n`;

  if (children) {
    value += `\n<b>Children:</b> ${children.length}`;
    value += `\n<b>Ok:</b> ${children.reduce((totalOk: number, child: any) => {
      return totalOk + (child.status === "ok" ? 1 : 0);
    }, 0)}`;
    value += `\n<b>Error:</b> ${children.reduce(
      (totalErr: number, child: any) => {
        return totalErr + (child.status === "error" ? 1 : 0);
      },
      0
    )}`;
  }
  details.value = value;
};

provide("handleNodeClick", handleNodeClick);

// onMounted(() => {
//   Object.assign(hierarchicalData, treeData);
// });
</script>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";

.demo-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  width: 100%;
}
.details-panel {
  position: absolute;
  z-index: 2;
  @include body-small();
  width: clamp(300px, 20%, 800px);
  white-space: pre-wrap;
  transition: height 1s ease;
}
</style>
