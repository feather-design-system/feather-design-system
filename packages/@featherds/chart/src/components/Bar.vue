<template>
  <div class="chart" :max-width="dimensions.control.width">
    <svg :id="id"></svg>
    <p>Size: {{ size }}</p>
    <!-- <p>ID: {{ id }}</p>
      <p>Type: {{ type }}</p>
      <span>Dimensions: {{ dimensions }}</span>
    <p>Data: {{ data }}</p>
    <p>Options: {{ options }}</p>
    <p>Axes: {{ axes }}</p> -->
  </div>
</template>

<script lang="ts" setup>
// D3 libraries
import { select } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";
import { scaleBand, scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import { transition } from "d3-transition";

import { getValue } from "./Data";

import { PropType, onMounted, reactive, watchEffect } from "vue";
import {
  FeatherChartAxes,
  FeatherChartBarData,
  FeatherChartDimensions,
  FeatherChartOptions,
} from "./types";

const props = defineProps({
  id: { type: String, required: true },
  size: { type: String, required: true },
  title: { type: String, required: false },
  type: { type: String, required: true },
  data: { type: Object as PropType<FeatherChartBarData>, required: true },
  dimensions: {
    type: Object as PropType<FeatherChartDimensions>,
    required: true,
  },
  options: { type: Object as PropType<FeatherChartOptions>, required: true },
  axes: { type: Object as PropType<FeatherChartAxes>, required: true },
});

const { axes, data, dimensions, id, options, type } = reactive(props);

const dm = { ...dimensions };
const containerWidth = dm.chart.width - (dm.margin.left + dm.margin.right);
const containerHeight = dm.chart.height - (dm.margin.top + dm.margin.bottom);

// ACCESSORS
// TODO:  Should we require user to pass these accessor functions?
// NOTE:  USE GETVALUE FUNCTION THAT CAN RETRIEVE VALUE
// FROM DOT NOTATION PATH (i.e. "stats.age" or "state.county.city")
const xAccessor = (d: unknown): string => {
  if (typeof d === "object") {
    // return (d as object)[axes.x as keyof object];
    return getValue(d as object, axes.x) as string;
  }
  throw new Error("Unexpected x accessor");
};

const yAccessor = (d: unknown): number => {
  if (typeof d === "object") {
    // return (d as object)[axes.y as keyof object];
    return getValue(d as object, axes.y) as number;
  }
  throw new Error("Unexpected y accessor");
};

// DRAW
const draw = () => {
  // SCALES
  const xScale = scaleBand()
    .range([0, containerWidth])
    .padding(0.2)
    .domain(data.data.map((d) => xAccessor(d)));

  let [, max] = extent(data.data, (d) => yAccessor(d));
  const yScale = scaleLinear()
    .range([containerHeight, 0])
    .domain([0, max as number]);

  const barAnimation = transition().duration(500);
  const xAnimation = transition().duration(1500);
  const yAnimation = transition().duration(625);

  // if (!options.margin) { throw new Error("margin not set") };

  // Clean up previous drawing (if)
  select(`#${id}`).selectChildren().remove();

  // DRAW SVG
  const svg = select(`#${id}`)
    .attr("width", dimensions.chart.width)
    .attr("height", dimensions.chart.height)
    .attr("tabindex", "0")
    .append("g")
    .attr(
      "transform",
      `translate(${dimensions.margin.left}, ${dimensions.margin.top})`
    );

  // DRAW BARS
  svg
    .selectAll(".bar")
    .data(data.data)
    .join("rect")
    .attr("tabindex", "0")
    .attr("aria-role", "img")
    .attr("aria-label", (d) => {
      return `${xAccessor(d)} ${yAccessor(d)} ${options.units};`;
    })
    .attr(
      "class",
      `${id} categorical1 bar${options.class ? " " + options.class : ""}`
    )
    .attr("x", (d) => xScale(xAccessor(d)) as number)
    .transition(barAnimation)
    .attr("y", (d) => yScale(yAccessor(d)))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => containerHeight - yScale(yAccessor(d)));

  // AXES
  svg
    .append("g")
    .classed("yAxis", true)
    .transition(xAnimation)
    .call(axisLeft(yScale).ticks(6));

  svg
    .append("g")
    .classed("xAxis", true)
    .transition(yAnimation)
    .attr("transform", "translate(0," + containerHeight + ")")
    .call(axisBottom(xScale))
    .selectAll("text")
    .attr("transform", "rotate(-14)");
};

const isValid = () => {
  // validate data is iterable
  if (!Array.isArray(data)) {
    console.log(`Is ${data} an Array?: ${Array.isArray(data)}`);
    throw new Error("Data is not iterable!");
  }

  // AND ensure all required props for the specified chart have been provided.
  console.log(`ensure all necessary props are provided to draw ${type}`);
  return true;
  //  throw new Error("Missing props")
};

watchEffect(() => {
  if (data.data.length > 0) {
    console.log("Let's draw()'");
    draw();
  }
});

onMounted(() => {
  if (isValid()) {
    draw();
  }
});
</script>
