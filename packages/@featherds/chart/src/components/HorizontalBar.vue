<template>
  <div class="chart" :width="dimensions.chart.width">
    <svg :id="id" :width="containerWidth"></svg>
  </div>
</template>
<script lang="ts" setup>
// D3 libraries
import { select } from "d3-selection";
import { stack } from "d3-shape";
import { axisBottom, axisLeft } from "d3-axis";
import { scaleBand, scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { transition } from "d3-transition";
import { easeLinear } from "d3-ease";

import { getValue } from "./Data";
import { onBeforeMount, onMounted, PropType, reactive, watchEffect } from "vue";
import {
  FeatherChartAxes,
  FeatherChartData,
  FeatherChartDimensions,
  FeatherChartOptions,
} from "./types";

const props = defineProps({
  id: { type: String, required: true },
  size: { type: String, required: true },
  title: { type: String, required: false },
  type: { type: String, required: true },
  data: { type: Object as PropType<FeatherChartData>, required: true },
  dimensions: {
    type: Object as PropType<FeatherChartDimensions>,
    required: true,
  },
  options: {
    type: Object as PropType<FeatherChartOptions>,
    required: true,
  },
  axes: { type: Object as PropType<FeatherChartAxes>, required: true },
});

const { axes, data, dimensions, id, options } = reactive(props);

if (!options.margin) throw new Error("margin not set");

const containerWidth =
  dimensions.chart.width - (options.margin.left + options.margin.right);
const containerHeight =
  dimensions.chart.height - (options.margin.top + options.margin.bottom);

// ACCESSORS
// const xAccessor = (d: unknown): number => {
//   if (typeof d === "object") {
//     // return (d as object)[axes.x as keyof object];
//     return getValue(d as object, axes.x) as number;
//   }
//   throw new Error("Unexpected x accessor");
// };

const yAccessor = (d: any): string => {
  if (typeof d === "object") {
    return getValue(d, axes.y) as string;
  }
  throw new Error("Unexpected y accessor");
};

const yStackedAccessor = (d: any): string => {
  if (typeof d === "object") {
    // "data" comes from the "d3" stack() call
    return getValue(d.data, "data." + axes.y) as string;
  }
  throw new Error("Unexpected y stacked accessor");
};

// DRAW
const draw = () => {
  // DATA
  const keyList = Object.keys((data as any)[0]).filter((d) => d != axes.y);
  const keyGroup = (data as FeatherChartData).map((d) => yAccessor(d));

  const stackedData = stack().keys(keyList)(data as any)!;

  // SCALES
  // @ts-ignore
  const xMax = max(stackedData[stackedData.length - 1], (d) => d[1]);
  const xScale = scaleLinear()
    .domain([0, xMax as any])
    .nice()
    .range([0, containerWidth]);

  const yScale = scaleBand()
    .domain(keyGroup)
    .range([0, containerHeight])
    .padding(0.25);

  if (!options.margin) throw new Error("margin not set");

  // CLEAN UP
  select(`#${id}`).selectChildren().remove();

  // DRAW SVG
  const svg = select(`#${id}`)
    .attr("width", dimensions.chart.width)
    .attr("height", dimensions.chart.height)
    .attr("tabindex", "0")
    .append("g")
    .attr(
      "transform",
      `translate(${options.margin.left},${options.margin.top})`
    );

  // draw bars
  const layers = svg.selectAll("g").data(stackedData).join("g");

  // transition for bars
  const duration = 250;
  const t = transition().duration(duration).ease(easeLinear);

  layers.each(function (_, i) {
    // this refers to the group for a given axes.y
    select(this)
      .selectAll(".bar")
      .data((d: any) => d)
      .join("rect")
      .attr("tabindex", "0")
      .attr("aria-role", "img")
      .attr("aria-label", (d) => {
        // @ts-ignore
        const group = Object.entries((d as any).data)[0][1];
        const num = yAccessor(d)[1];
        const item = Object.keys((d as any).data)[i + 1];
        return `${group} ${num} ${item};`;
      })
      .attr("class", `${id} categorical${i + 1} bar`)
      .attr("x", (d) => xScale((d as any)[0]))
      .attr("y", (d) => {
        return yScale(yStackedAccessor(d)) as any;
      })
      .attr("height", yScale.bandwidth())
      .transition(t)
      .delay(i * duration)
      // i is the index of this group.
      // this will give the bars for each group a different delay
      // so that the groups will be revealed one at a time.
      // using .each() instead of a normal data join is needed
      // so that we have access to what group each bar belongs to.
      .attr("width", (d) => xScale((d as any)[1]) - xScale((d as any)[0]));
  });

  // AXES
  // TODO:  enhance tick rotation for all charts
  const xAxisTickPadding = options.xAxis?.tickPadding || 0;
  const xAxisTickRotation = options.xAxis?.tickRotation || 0;
  const yAxisTickPadding = options.yAxis?.tickPadding || 0;

  svg
    .append("g")
    .classed("xAxis", true)
    .attr("transform", `translate(0,${containerHeight})`)
    .call(
      axisBottom(xScale)
        .ticks(5, "~s")
        .tickSize(-containerHeight)
        .tickPadding(xAxisTickPadding)
    )
    .selectAll("text")
    .attr("transform", `rotate(${xAxisTickRotation})`);
  svg
    .append("g")
    .classed("yAxis", true)
    .call(axisLeft(yScale).tickPadding(yAxisTickPadding))
    .selectAll("text")
    .attr("transform", `rotate(${xAxisTickRotation})`);
};

defineExpose({ draw });

watchEffect(() => {
  if ((data as FeatherChartData).length > 0) {
    draw();
  }
});

onBeforeMount(() => {});

onMounted(() => {
  draw();
});
</script>
