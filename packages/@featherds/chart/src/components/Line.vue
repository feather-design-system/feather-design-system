<template>
  <svg
    :id="id"
    :width="dimensions.chart.width"
    :height="dimensions.chart.height"
    :class="classes"
  ></svg>
</template>
<script lang="ts" setup>
import {
  PropType,
  computed,
  inject,
  onMounted,
  toRefs,
  watchEffect,
} from "vue";
import { select } from "d3-selection";
import { line } from "d3-shape";
import { axisBottom, axisLeft, axisRight } from "d3-axis";
// import { extent, max } from "d3-array";
import { transition } from "d3-transition";
import { easePolyInOut } from "d3-ease";
import {
  FeatherChartAxes,
  FeatherChartDimensions,
  FeatherChartLineData,
  FeatherChartOptions,
} from "./types";
import { useXYSeries } from "../composables/useXYSeries";
import type { Row, NormRow } from "../utils/data";
import { setDynamicScope } from "./chartUtils";

const props = defineProps({
  id: { type: String, required: true },
  size: { type: String, required: true },
  title: { type: String, required: false },
  type: { type: String, required: true },
  data: { type: Object as PropType<FeatherChartLineData>, required: true },
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

const { axes, data, dimensions, id, options, type } = toRefs(props);

const position = inject("position") as { x: number; y: number };
const container = inject("container") as { width: number; height: number };

if (!options.value.margin) throw new Error("margin not set");

const rowsRef = computed<Row[]>(() => {
  const rawData = data.value.data;
  return (rawData as Row[]) ?? [];
});

const axesRef = computed(() => ({
  x: axes.value.x,
  y: axes.value.y,
}));

interface SeriesObject {
  name: string;
  data: Row[];
  yKey: string;
}
const seriesData = computed((): SeriesObject[] => {
  const rawData = data.value.data;
  if (!Array.isArray(rawData) || rawData.length === 0) {
    return [];
  }

  const firstRow = rawData[0];
  const xKey = axes.value.x;

  const seriesKeys = Object.keys(
    (firstRow ?? {}) as Record<string, unknown>
  ).filter((key) => key !== xKey);

  // If we only have one series key, return it
  if (seriesKeys.length <= 1) {
    const rows = Array.isArray(rawData) ? (rawData as Row[]) : [];
    return [
      {
        name: seriesKeys[0] || "Series 1",
        data: rows,
        yKey: seriesKeys[0] || axes.value.y,
      },
    ];
  }

  // Multiple series in wide format - transform to multiple series
  return seriesKeys.map((seriesKey, index) => ({
    name: seriesKey,
    data: rawData.map((row) => ({
      [xKey]: row[xKey as keyof typeof row],
      [axes.value.y]: row[seriesKey as keyof typeof row], // Map series column to y-axis
    })),
    yKey: axes.value.y,
    color: `var(--feather-categorical${(index % 10) + 1})`, // May want to do this in css
  }));
});

// Process each series through useXYSeries
const processedSeries = computed(() => {
  return seriesData.value.map((series) => {
    const seriesRows = computed(() => series.data as Row[]);
    const { data: normalizedData } = useXYSeries(
      seriesRows,
      axesRef,
      computed(() => container.width),
      computed(() => container.height)
    );

    return {
      name: series.name,
      data: normalizedData.value,
    };
  });
});

// Use the combined data from all series to establish unified scales
const allSeriesData = computed<Row[]>(() => {
  if (seriesData.value.length <= 1) {
    return rowsRef.value;
  }

  // Combine all series data for unified scaling
  return seriesData.value.flatMap((series) => series.data);
});

// Get the scales for an XY series
const { xScale, yScale } = useXYSeries(
  computed(() => allSeriesData.value),
  axesRef,
  computed(() => container.width),
  computed(() => container.height)
);

const draw = () => {
  // Clean up existing
  select(`#${id.value}`).selectChildren().remove();

  position.x = 0;
  position.y = 0;
  console.log(`draw ${type.value}`);
  if (!isValid()) throw new Error("Invalid data");

  // Skip rendering if normalized series is empty
  if (!processedSeries.value.length) {
    return;
  }

  if (!options.value.margin) throw new Error("Margin not set");

  // SCALES
  // xScale and yScale are set in useXYSeries composable

  const svg = select(`#${id.value}`)
    .attr("width", dimensions.value.chart.width)
    .attr("height", dimensions.value.chart.height)
    .attr(
      "viewBox",
      `0 0 ${dimensions.value.chart.width} ${dimensions.value.chart.height}`
    )
    .attr("tabindex", 0)
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
      axisLeft(yScale.value as any)
        .ticks(5)
        .tickSize(6)
        .tickPadding(options.value.yAxis?.tickPadding ?? 0)
    )
    .selectAll("text")
    .attr("transform", `rotate(${options.value.yAxis?.tickRotation ?? 0})`);

  svg
    .append("g")
    .classed("yAxis", true)
    .attr("transform", `translate(${container.width}, 0)`)
    .call(
      axisRight(yScale.value as any)
        .ticks(5)
        .tickSize(6)
        .tickPadding(options.value.yAxis?.tickPadding ?? 0)
    )
    .selectAll("text")
    .attr("transform", `rotate(${options.value.yAxis?.tickRotation ?? 0})`);

  // Setup line generator
  const lineGenerator = line<NormRow>()
    .x((d) => {
      const xs = xScale.value as any; // time/linear/point
      return xs(d.x as any) ?? 0;
    })
    .y((d) => yScale.value(d.y));

  processedSeries.value.forEach((s, index) => {
    if (s.data.length === 0) return;
    svg
      .append("path")
      .classed("line", true)
      .datum(s.data)
      .attr("data-series", (index + 1) % 10)
      .attr("fill", "none")
      .attr("pathLength", 1)
      .attr("d", lineGenerator as any);
  });

  transition(svg as any)
    .duration(1000)
    .ease(easePolyInOut)
    .attr("opacity", 1);

  setDynamicScope(`#${id.value}`);
};

const isValid = () => {
  return true;
};

const classes = computed(() => {
  return {
    "feather-line-svg": true,
  };
});

defineExpose({ draw });

watchEffect(() => {
  if (data.value.data.length > 0) {
    console.log("Let's draw()'");
    draw();
  }
});

onMounted(() => {
  draw();
});
</script>
<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
.feather-line-svg {
  display: block;
  max-width: 100%;
  height: auto;

  .line {
    stroke: var(vars.$categorical1);
    stroke-width: 2;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: line-draw 3s ease-in-out forwards;

    &[data-series="1"] {
      stroke: var(vars.$categorical1);
    }
    &[data-series="2"] {
      stroke: var(vars.$categorical2);
    }
    &[data-series="3"] {
      stroke: var(vars.$categorical3);
    }
    &[data-series="4"] {
      stroke: var(vars.$categorical4);
    }
    &[data-series="5"] {
      stroke: var(vars.$categorical5);
    }
    &[data-series="6"] {
      stroke: var(vars.$categorical6);
    }
    &[data-series="7"] {
      stroke: var(vars.$categorical7);
    }
    &[data-series="8"] {
      stroke: var(vars.$categorical8);
    }
    &[data-series="9"] {
      stroke: var(vars.$categorical9);
    }
    &[data-series="0"] {
      stroke: var(vars.$categorical10);
    }
  }
}

@keyframes line-draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
