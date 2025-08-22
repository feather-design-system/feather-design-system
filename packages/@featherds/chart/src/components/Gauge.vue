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
import { Arc, arc } from "d3-shape";
// import { extent, max } from "d3-array";
import { transition } from "d3-transition";
import { easePolyInOut } from "d3-ease";
import {
  FeatherChartAxes,
  FeatherChartDimensions,
  FeatherChartLineData,
  FeatherChartOptions,
} from "./types";
import { setDynamicScope } from "./chartUtils";
import { scaleLinear } from "d3-scale";

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

type GaugeData = {
  label: string;
  min: number;
  max: number;
  value: number;
  thresholds: {
    warning: number;
    danger: number;
  };
};

const { data, dimensions, id, options, type } = toRefs(props);

const position = inject("position") as { x: number; y: number };
// radius computed inside draw() based on inner drawable area

const gaugeData = computed((): GaugeData => {
  const rawData = data.value.data as GaugeData[] | GaugeData | undefined;
  const first = Array.isArray(rawData) ? rawData[0] : rawData;
  return (
    first ?? {
      label: "Gauge",
      value: 0,
      min: 0,
      max: 0,
      thresholds: { warning: 80, danger: 96 },
    }
  );
});

if (!options.value.margin) throw new Error("margin not set");

const draw = () => {
  // Clean up existing
  select(`#${id.value}`).selectChildren().remove();

  position.x = 0;
  position.y = 0;
  console.log(`draw ${type.value}`);
  if (!isValid()) throw new Error("Invalid data");

  if (!options.value.margin) throw new Error("Margin not set");

  // INNER DIMENSIONS (drawable area after margins)
  const innerWidth =
    dimensions.value.chart.width -
    options.value.margin.left -
    options.value.margin.right;
  const innerHeight =
    dimensions.value.chart.height -
    options.value.margin.top -
    options.value.margin.bottom;

  // Radius based on smallest side of drawable area
  const radius = Math.min(innerWidth, innerHeight) / 2;

  // ANGLE SCALE: map value domain to semi-circle (-90deg to +90deg)
  const angleScale = scaleLinear()
    .domain([gaugeData.value.min, gaugeData.value.max])
    .range([-Math.PI / 2, Math.PI / 2])
    .clamp(true);

  const svg = select(`#${id.value}`)
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

  // Group centered within drawable area
  const gaugeGroup = svg
    .append("g")
    .attr("transform", `translate(${innerWidth / 2}, ${innerHeight / 2})`);

  const backgroundArc = arc()
    .innerRadius(radius * 0.6)
    .outerRadius(radius * 0.8)
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2);

  gaugeGroup
    .append("path")
    .classed("background-arc", true)
    .attr("d", backgroundArc as Arc<any, unknown>);

  const progressArc = arc()
    .innerRadius(radius * 0.6)
    .outerRadius(radius * 0.8)
    .startAngle(-Math.PI / 2)
    .endAngle(angleScale(gaugeData.value.value));

  gaugeGroup
    .append("path")
    .classed("progress-arc", true)
    .attr("d", progressArc as Arc<any, unknown>);

  gaugeGroup
    .append("text")
    .classed("gauge-value", true)
    .attr("text-anchor", "middle")
    .attr("dy", -radius * 0.2)
    .text(gaugeData.value.value);

  gaugeGroup
    .append("text")
    .classed("gauge-label", true)
    .attr("text-anchor", "middle")
    .text(gaugeData.value.label || "Gauge");

  transition(gaugeGroup as any)
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
    "feather-gauge-svg": true,
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
.feather-gauge-svg {
  display: block;
  max-width: 100%;
  height: auto;
  .background-arc {
    fill: var(vars.$shade-3);
  }
  .progress-arc {
    fill: var(vars.$success);
  }

  .gauge-value {
    font-size: 3rem;
  }

  .gauge-label {
    font-size: 1.25rem;
  }
}
</style>
