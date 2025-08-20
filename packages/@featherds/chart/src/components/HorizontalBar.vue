<template>
  <svg
    :id="id"
    :width="dimensions.chart.width"
    :height="dimensions.chart.height"
    class="feather-horizontal-bar-svg"
    :class="zoomLevel"
  ></svg>
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
import {
  inject,
  onBeforeMount,
  onMounted,
  PropType,
  reactive,
  Ref,
  watchEffect,
} from "vue";
import {
  FeatherChartAxes,
  FeatherChartBarData,
  FeatherChartData,
  FeatherChartDimensions,
  FeatherChartOptions,
  ZoomLevel,
} from "./types";
import { setDynamicScope } from "./chartUtils";

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

const position = inject("position") as { x: number; y: number };
const zoomLevel = inject("zoomLevel") as Ref<ZoomLevel>;

if (!options.margin) throw new Error("margin not set");

const containerWidth =
  dimensions.chart.width - (options.margin.left + options.margin.right);
const containerHeight =
  dimensions.chart.height - (options.margin.top + options.margin.bottom);

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
  const keyList = Object.keys((data.data as any)[0]).filter((d) => d != axes.y);
  const keyGroup = (data as FeatherChartBarData).data.map((d) => yAccessor(d));

  const stackedData = stack().keys(keyList)(data.data as any)!;

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

  // CLEAN UP
  select(`#${id}`).selectChildren().remove();

  position.x = 0;
  position.y = 0;

  if (!options.margin) throw new Error("margin not set");
  if (!isValid()) throw new Error("Data is not valid");

  // DRAW SVG
  const svg = select(`#${id}`)
    .attr("width", dimensions.chart.width)
    .attr("height", dimensions.chart.height)
    .attr("viewBox", `0 0 ${dimensions.chart.width} ${dimensions.chart.height}`)
    .attr("style", "max-width: 100%; height: auto;")
    .attr("tabindex", "0")
    .append("g")
    .attr(
      "transform",
      `translate(${options.margin.left},${options.margin.top})`
    );

  // draw bars
  const layers = svg.selectAll("g").data(stackedData).join("g");

  // transition for bars
  const duration = 1000 / keyList.length;
  const t = transition().duration(duration).ease(easeLinear);

  layers.each(function (_, i) {
    // this refers to the group for a given axes.y
    select(this)
      .selectAll(".bar")
      .data((d: any) => d)
      .join("rect")
      .attr("tabindex", "0")
      .attr("role", "img")
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

  svg
    .append("g")
    .classed("xAxis", true)
    .attr("transform", `translate(0,${containerHeight})`)
    .call(
      axisBottom(xScale)
        .ticks(5, "~s")
        .tickSize(-containerHeight)
        .tickPadding(options.xAxis?.tickPadding ?? 0)
    )
    .selectAll("text")
    .attr("transform", `rotate(${options.xAxis?.tickRotation ?? 0})`);
  svg
    .append("g")
    .classed("yAxis", true)
    .call(axisLeft(yScale).tickPadding(options.yAxis?.tickPadding ?? 0))
    .selectAll("text")
    .attr("transform", `rotate(${options.yAxis?.tickRotation ?? 0})`);

  setDynamicScope(`#${id}`);
};

const isValid = () => {
  // add validation here, data, options etc...

  return true;
};

defineExpose({ draw });

watchEffect(() => {
  if ((data as FeatherChartBarData).data) {
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

.feather-horizontal-bar-svg {
  g.xAxis,
  g.yAxis {
    font-size: small;
    padding: 1em;

    .tick {
      line {
        color: var(vars.$shade-4);
      }
    }
  }

  rect.bar {
    fill: var(vars.$primary);
    stroke: transparent;

    &:focus {
      fill-opacity: 0.75;
    }

    &:hover {
      fill-opacity: 0.5;
    }
  }

  rect.categorical1 {
    fill: var(vars.$categorical1);
  }

  rect.categorical2 {
    fill: var(vars.$categorical2);
  }

  rect.categorical3 {
    fill: var(vars.$categorical3);
  }
  rect.categorical4 {
    fill: var(vars.$categorical4);
  }

  rect.categorical5 {
    fill: var(vars.$categorical5);
  }

  rect.categorical6 {
    fill: var(vars.$categorical6);
  }

  rect.categorical7 {
    fill: var(vars.$categorical7);
  }

  rect.categorical8 {
    fill: var(vars.$categorical8);
  }

  rect.categorical9 {
    fill: var(vars.$categorical9);
  }

  rect.categorical10 {
    fill: var(vars.$categorical10);
  }
}
</style>
