<template>
  <svg
    :id="id"
    :width="dimensions.chart.width"
    :height="dimensions.chart.height"
    :class="classes"
  ></svg>
</template>
<script lang="ts" setup>
import { PropType, computed, inject, onMounted, toRefs, watch } from "vue";
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
// simple numeric interpolator (avoids extra d3-interpolate type dependency)
const interpolateNumber = (a: number, b: number) => (t: number) =>
  a + (b - a) * t;

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
  label?: string;
  min: number;
  max: number;
  value: number;
  // Internal: computed true when the source value is null/undefined/missing/non-finite
  noData?: boolean;
  // Arbitrary named thresholds. If ALL values are between 0 and 1 they will
  // be treated as fractions of the (max-min) range and converted to absolute values.
  // Backwards compatible: warning/danger still recognized for state color.
  thresholds?: Record<string, number>;
};

const { data, dimensions, id, options, type } = toRefs(props);

const position = inject("position") as { x: number; y: number };
// radius computed inside draw() based on inner drawable area

// Normalize incoming data to an array of GaugeData entries
const gauges = computed((): GaugeData[] => {
  const raw = (data.value?.data as any) ?? [];
  if (Array.isArray(raw)) {
    if (raw.length === 0) {
      return [
        {
          label: "Gauge",
          value: 0,
          min: 0,
          max: 100,
          noData: true,
        },
      ];
    }
    return raw.map((g) => {
      const min = typeof g.min === "number" ? g.min : 0;
      const max = typeof g.max === "number" ? g.max : 100;
      const rawVal = (g as any).value;
      const explicitNo = (g as any).noData === true; // legacy override
      const hasNumeric = typeof rawVal === "number" && isFinite(rawVal);
      const isNoData =
        explicitNo || rawVal === undefined || rawVal === null || !hasNumeric;
      return {
        label: g.label ?? g.name ?? "Gauge",
        min,
        max,
        value: isNoData ? min : rawVal,
        noData: isNoData,
        thresholds: g.thresholds ?? undefined,
      } as GaugeData;
    });
  }
  // Single object -> wrap
  if (raw && typeof raw === "object") {
    const g = raw as GaugeData & { name?: string };
    const min = typeof g.min === "number" ? g.min : 0;
    const max = typeof g.max === "number" ? g.max : 100;
    const rawVal = (g as any).value;
    const explicitNo = (g as any).noData === true;
    const hasNumeric = typeof rawVal === "number" && isFinite(rawVal);
    const isNoData =
      explicitNo || rawVal === undefined || rawVal === null || !hasNumeric;
    return [
      {
        label: g.label ?? g.name ?? "Gauge",
        min,
        max,
        value: isNoData ? min : rawVal,
        noData: isNoData,
        thresholds: g.thresholds || (g as any).data?.thresholds || undefined,
      },
    ];
  }
  return [];
});

if (!options.value.margin) throw new Error("margin not set");

// Track previous end angles for smooth transitions
const previousAngles = new Map<string, number>();

const draw = () => {
  // Clean up existing (we re-create but keep previousAngles map for animation)
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

  const count = gauges.value.length || 1;
  const maxPerRow = (options.value as any).gaugeMaxPerRow ?? 5; // optional option, default 5
  const cols = Math.min(maxPerRow, count);
  const rows = Math.ceil(count / cols);
  const hGap = Math.min(24, innerWidth * 0.0); // horizontal gap
  const vGap = Math.min(32, innerHeight * 0.06); // vertical gap
  const totalHGap = hGap * (cols - 1);
  const totalVGap = vGap * (rows - 1);
  const cellWidth = (innerWidth - totalHGap) / cols;
  const cellHeight = (innerHeight - totalVGap) / rows;
  const radius = (Math.min(cellWidth, cellHeight) / 2) * 0.95; // slight padding

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
  // Helper: normalize thresholds (supports singular/plural, fractional/absolute)
  const resolveThresholds = (g: any) => {
    const range = g.max - g.min;
    const src = g.thresholds || {};
    const entries = Object.entries(src as Record<string, number>).filter(
      ([, v]) => typeof v === "number" && !isNaN(v)
    );
    const result: Record<string, number> = {};
    for (const [k, v] of entries) {
      result[k] = v <= 1 && range > 1 ? g.min + range * v : v;
    }
    // Maintain consistent ordering for conventional levels first
    const ordered: Record<string, number> = {};
    ["warning", "error"].forEach((k) => {
      if (result[k] != null) ordered[k] = result[k];
    });
    for (const [k, v] of Object.entries(result)) {
      if (!(k in ordered)) ordered[k] = v;
    }
    return ordered;
  };

  // Render each gauge
  gauges.value.forEach((g, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const cx = col * (cellWidth + hGap) + cellWidth / 2;
    const cy = row * (cellHeight + vGap) + cellHeight / 2;

    // Orientation: default is right-facing semicircle (vertical). If options.gaugeOrientation === 'top', use top semicircle.
    const orient = options.value.gaugeOrientation || "right";
    const startAngle = orient === "top" ? -Math.PI : -Math.PI / 2; // top: left (-180deg); right: up (-90deg)
    const endAngle = orient === "top" ? 0 : Math.PI / 2; // top: right (0deg); right: down (+90deg)
    const angleScale = scaleLinear()
      .domain([g.min, g.max])
      .range([startAngle, endAngle])
      .clamp(true);

    const group = svg
      .append("g")
      .attr("class", "feather-gauge")
      .attr("data-gauge-index", i)
      .attr("transform", `translate(${cx}, ${cy})`);

    const backgroundArc = arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.8)
      .startAngle(startAngle)
      .endAngle(endAngle);

    group
      .append("path")
      .classed("background-arc", true)
      .attr("d", backgroundArc as Arc<any, unknown>);
    const valueAngle = angleScale(g.value);
    const key = g.label || `gauge-${i}`;
    const previous = previousAngles.get(key) ?? startAngle; // start from empty

    const arcBuilder = (end: number) =>
      arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius * 0.8)
        .startAngle(startAngle)
        .endAngle(end);

    const thresholds = resolveThresholds(g);
    const hasAny = Object.keys(thresholds).length > 0 && !g.noData;
    // Determine arc state with conventional names warning/error if present (only if thresholds given)
    let stateClass = "success";
    if (g.noData) {
      stateClass = "no-data";
    } else if (hasAny) {
      if (thresholds.error !== undefined && g.value >= thresholds.error) {
        stateClass = "error";
      } else if (
        thresholds.warning !== undefined &&
        g.value >= thresholds.warning
      ) {
        stateClass = "warning";
      }
    }

    // Threshold tick marks helper (draw after progress arc so they sit on top)
    const addTick = (name: string, valueAt: number) => {
      if (valueAt == null || isNaN(valueAt)) return;
      if (valueAt < g.min || valueAt > g.max) return; // skip out-of-range
      const ang = angleScale(valueAt);
      // d3 arc uses 0 rad at 12 o'clock; our math cos/sin 0 rad is 3 o'clock, so rotate by -PI/2
      const a = ang - Math.PI / 2;
      const isValueTick =
        name === "value" || name === "current" || name === "state";
      // Make the current value tick slightly longer for visibility
      const rInner = radius * (isValueTick ? 0.3 : 0.6);
      const rOuter = radius * (isValueTick ? 0.8 : 0.85);

      const x1 = Math.cos(a) * rInner;
      const y1 = Math.sin(a) * rInner;
      const x2 = Math.cos(a) * rOuter;
      const y2 = Math.sin(a) * rOuter;
      group
        .append("line")
        .attr("class", `tick ${name}`)
        .attr("data-threshold-name", name)
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("role", "presentation");
    };

    const progress = group
      .append("path")
      .classed("progress-arc", true)
      .classed(stateClass, true)
      .attr(
        "d",
        arcBuilder(g.noData ? startAngle : previous) as Arc<any, unknown>
      );

    if (!g.noData) {
      // Animate to new angle
      progress
        .transition()
        .duration(800)
        .ease(easePolyInOut)
        .attrTween("d", () => {
          const interp = interpolateNumber(previous, valueAngle);
          return (t) => (arcBuilder(interp(t)) as any)();
        });
    }

    // Draw threshold ticks AFTER arc so they appear on top visually
    if (!g.noData) {
      if (hasAny) {
        Object.entries(thresholds).forEach(([name, val]) => {
          addTick(name, val);
        });
      }
      // Animated value tick (indicator line): from previous angle to current value angle
      const valueTickInnerR = radius * 0.5;
      const valueTickOuterR = radius * 0.8;
      const coordsForAngle = (ang: number) => {
        const a = ang - Math.PI / 2;
        return {
          x1: Math.cos(a) * valueTickInnerR,
          y1: Math.sin(a) * valueTickInnerR,
          x2: Math.cos(a) * valueTickOuterR,
          y2: Math.sin(a) * valueTickOuterR,
        };
      };
      const prevTick = coordsForAngle(previous);
      const valueTick = group
        .append("line")
        .attr("class", "tick value")
        .attr("data-threshold-name", "value")
        .attr("x1", prevTick.x1)
        .attr("y1", prevTick.y1)
        .attr("x2", prevTick.x2)
        .attr("y2", prevTick.y2)
        .attr("role", "presentation");
      // Animate rotationally along the arc (interpolate angle, derive coords each frame)
      valueTick
        .transition()
        .duration(800)
        .ease(easePolyInOut)
        .tween("value-tick-rotate", function () {
          const lineSel = select(this);
          const interp = interpolateNumber(previous, valueAngle);
          return (t: number) => {
            const a = interp(t);
            const c = coordsForAngle(a);
            lineSel
              .attr("x1", c.x1)
              .attr("y1", c.y1)
              .attr("x2", c.x2)
              .attr("y2", c.y2);
          };
        });

      previousAngles.set(key, valueAngle); // store for next draw

      // Gauge value text (responsive size). Size scales with radius but constrained by digits length.
      const valueStr = `${g.value}`;
      const chars = Math.max(valueStr.length, 1);
      // Normalized heuristic: scale base size by (charsFactor)^-alpha to reduce shrink for longer numbers
      const base = radius * 0.4; // base relative to radius
      const alpha = 0.35; // dampening exponent (0=no change, 1=strong shrink)
      const charsFactor = chars / 2; // treat 2 chars as neutral baseline
      const size = base * Math.pow(charsFactor, -alpha);
      const minPx = Math.min(14, radius * 0.25);
      const maxPx = radius * 0.9;
      const clamped = Math.max(minPx, Math.min(size, maxPx));
      group.style("--gauge-value-size", `${clamped}px`);
      group
        .append("text")
        .classed("gauge-value", true)
        .attr("text-anchor", "middle")
        .attr("dy", -radius * 0.05)
        .text(valueStr);
    } else {
      // No data symbol (circle with slash)
      const symbolR = radius * 0.3;
      const sym = group
        .append("g")
        .attr("class", "no-data-symbol")
        .attr("role", "img")
        .attr("aria-label", "No data");
      sym
        .append("circle")
        .attr("cx", 0)
        .attr("cy", -radius * 0.05)
        .attr("r", symbolR);
      // slash
      const slash = symbolR * 0.9;
      sym
        .append("line")
        .attr("x1", -slash * 0.7)
        .attr("y1", -radius * 0.05 - slash * 0.8)
        .attr("x2", slash * 0.7)
        .attr("y2", -radius * 0.05 + slash * 0.8)
        .attr("vector-effect", "non-scaling-stroke");
      previousAngles.set(key, startAngle); // keep arc empty baseline
    }

    group
      .append("text")
      .classed("gauge-label", true)
      .attr("text-anchor", "middle")
      .attr("dy", radius * 0.3)
      .text(g.label || `Gauge ${i + 1}`);

    transition(group as any)
      .duration(800)
      .ease(easePolyInOut)
      .attr("opacity", 1);
  });

  transition(svg as any)
    .duration(300)
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

// Watch for data changes (post-mount) to animate updates; first render handled in onMounted
watch(
  () => data.value.data,
  (val) => {
    if (val && ((Array.isArray(val) && val.length) || !Array.isArray(val))) {
      draw();
    }
  },
  { deep: true, immediate: false }
);

onMounted(() => {
  draw();
});
</script>
<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/mixins/typography" as typo;
.feather-gauge-svg {
  display: block;
  max-width: 100%;
  height: auto;
  .background-arc {
    fill: var(vars.$shade-2);
  }
  .progress-arc {
    fill: var(vars.$success);
    &.warning {
      fill: var(vars.$minor, orange);
    }
    &.error {
      fill: var(vars.$error, red);
    }
    &.no-data {
      fill: var(vars.$shade-3);
    }
  }

  .tick {
    stroke-linecap: round;
    pointer-events: none;
    filter: drop-shadow(0 1px 1px var(vars.$surface-dark));
    stroke: var(vars.$success, green);
    stroke: var(vars.$state-color-on-neutral);
    stroke-width: 1;
    &.warning {
      stroke-width: 4;
      stroke: var(vars.$minor, orange);
    }
    &.error {
      stroke-width: 4;
      stroke: var(vars.$error, red);
    }
  }
  .gauge-value {
    font-weight: bolder;
    /* Responsive sizing: JS sets --gauge-value-size on each gauge group; fallback keeps it readable */
    font-size: var(--gauge-value-size, 1rem);
    line-height: 1;
    fill: var(vars.$primary-text-on-surface);
  }

  .gauge-label {
    font-size: clamp(1.125rem, 1rem, 1.5%);
    fill: var(vars.$primary-text-on-surface);
  }
  .no-data-symbol {
    circle {
      fill: rgba(255, 255, 255, 0.4);
      stroke: var(vars.$error, red);
      stroke-width: 16;
    }
    line {
      stroke: var(vars.$error, red);
      stroke-width: 16;
    }
  }
}
</style>
