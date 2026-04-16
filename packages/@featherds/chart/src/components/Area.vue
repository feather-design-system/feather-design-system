<template>
  <svg
    :id="id"
    :width="dimensions.chart.width"
    :height="dimensions.chart.height"
    :class="classes"
  ></svg>
</template>
<script lang="ts" setup>
// D3 libraries
import { select } from "d3-selection";
import { area } from "d3-shape";
import { axisBottom, axisLeft } from "d3-axis";
import { timeParse } from "d3-time-format";
import { transition } from "d3-transition";
import { easePolyInOut } from "d3-ease";

import { useXYSeries } from "../composables/useXYSeries";

import {
  PropType,
  computed,
  inject,
  onBeforeMount,
  onMounted,
  toRefs,
  watchEffect,
} from "vue";
import {
  FeatherChartAreaData,
  FeatherChartAxes,
  FeatherChartDimensions,
  FeatherChartOptions,
} from "./types";
// import { setDynamicScope } from "./chartUtils";

const props = defineProps({
  id: { type: String, required: true },
  size: { type: String, required: true },
  title: { type: String, required: false },
  type: { type: String, required: true },
  data: { type: Object as PropType<FeatherChartAreaData>, required: true },
  dimensions: {
    type: Object as PropType<FeatherChartDimensions>,
    required: true,
  },
  options: { type: Object as PropType<FeatherChartOptions>, required: true },
  axes: { type: Object as PropType<FeatherChartAxes>, required: true },
});

const { axes, data, dimensions, id, options } = toRefs(props);

const position = inject("position") as { x: number; y: number };
const container = inject("container") as { width: number; height: number };

if (!options.value.margin) throw new Error("margin not set");

const parseDate = timeParse("%Y-%m-%d");

// DRAW
const draw = () => {
  console.log(`draw: #${id.value} `);
  // CLEAN UP
  select(`#${id.value}`).selectChildren().remove();

  position.x = 0;
  position.y = 0;

  if (!isValid()) throw new Error("Data is not valid");
  // Use shared XY series composable to normalize data and provide scales
  const rowsRef = computed(() => (data.value.data as any[]) ?? []);
  const axesRef = computed(() => ({ x: axes.value.x, y: axes.value.y }));
  const {
    data: seriesData,
    xScale,
    yScale,
  } = useXYSeries(
    rowsRef,
    axesRef,
    computed(() => container.width),
    computed(() => container.height),
    { parseDate }
  );

  const validData = seriesData.value;
  if (!validData || validData.length === 0) {
    // Nothing valid to render
    return;
  }

  if (!options.value.margin) throw new Error("margin not set");

  const svg = select(`#${id.value}`)
    .attr("width", dimensions.value.chart.width)
    .attr("height", dimensions.value.chart.height)
    .attr(
      "viewBox",
      `0 0 ${dimensions.value.chart.width} ${dimensions.value.chart.height}`
    )
    .attr("tabindex", "0")
    .append("g")
    .attr(
      "transform",
      `translate(${options.value.margin.left}, ${options.value.margin.top})`
    );

  svg
    .append("g")
    .classed("xAxis", true)
    .attr("transform", `translate(0, ${container.height})`)
    .call(
      axisBottom(xScale.value as any)
        .ticks(5)
        .tickSize(6)
        .tickPadding(options.value.xAxis?.tickPadding ?? 0)
    )
    .selectAll("text")
    .attr("transform", `rotate(${options.value.xAxis?.tickRotation ?? 0})`);

  svg
    .append("g")
    .classed("yAxis", true)
    .call(
      axisLeft(yScale.value as any).tickPadding(
        options.value.yAxis?.tickPadding ?? 0
      )
    )
    .selectAll("text")
    .attr("transform", `rotate(${options.value.yAxis?.tickRotation ?? 0})`);

  // DATA
  const theArea = area()
    .x((d: any) => (xScale.value as any)(d.x))
    .y0(() => yScale.value(0))
    .y1((d: any) => yScale.value(d.y));

  svg
    .append("path")
    .datum(validData)
    .attr("class", "categorical1 area")
    .attr("stroke", "#000")
    .attr("stroke-width", 0.375)
    .attr("d", theArea as any)
    .attr("opacity", 0)
    .transition()
    .duration(1000)
    .ease(easePolyInOut)
    .attr("opacity", 1);

  transition(svg as any)
    .duration(1000)
    .ease(easePolyInOut)
    .attr("opacity", 1);

  // setDynamicScope(`#${id.value}`);
};

const isValid = () => {
  // validate data is iterable
  if (!Array.isArray(data.value.data)) {
    // console.log(`Is ${data} an Array?: ${Array.isArray(data)}`);
    throw new Error("Data is not iterable!");
  }

  // AND ensure all required props for the specified chart have been provided.
  // TODO: Validate props
  return true;
};

const classes = computed(() => {
  return {
    "feather-area-svg": true,
  };
});

defineExpose({ draw });

watchEffect(() => {
  if (data.value.data) {
    draw();
  }
});

onBeforeMount(() => {});

onMounted(() => {
  draw();
});
</script>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
.feather-area-svg {
  display: block;
  max-width: 100%;
  height: auto;

  :deep(path.area) {
    fill: var(vars.$categorical1);
  }
}
</style>
