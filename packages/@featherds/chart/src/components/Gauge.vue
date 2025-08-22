<!-- <template>
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
// import { line } from "d3-shape";
// import { axisBottom, axisLeft, axisRight } from "d3-axis";
// // import { extent, max } from "d3-array";
import { transition } from "d3-transition";
import { easePolyInOut } from "d3-ease";
import {
  FeatherChartAxes,
  FeatherChartDimensions,
  FeatherChartLineData,
  FeatherChartOptions,
} from "./types";
// import { useXYSeries } from "../composables/useXYSeries";
// import type { Row, NormRow } from "../utils/data";
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

if (!options.value.margin) throw new Error("margin not set");

const containerWidth = computed(() => {
  if (!options.value.margin) throw new Error("margin not set (containerWidth)");
  return (
    dimensions.value.chart.width -
    (options.value.margin.left + options.value.margin.right)
  );
});
const containerHeight = computed(() => {
  if (!options.value.margin)
    throw new Error("margin not set (containerHeight)");
  return (
    dimensions.value.chart.height -
    (options.value.margin.top + options.value.margin.bottom)
  );
});

// DATA

// SCALES

const draw = () => {
  // Clean up existing
  select(`#${id.value}`).selectChildren().remove();

  position.x = 0;
  position.y = 0;

  if (!isValid()) throw new Error("Invalid data");

  // Skip rendering if normalized series is empty
  // if (!processedSeries.value.length) {
  //   return;
  // }

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
    /* TODO: Move to css */
    .attr(
      "transform",
      `translate(${options.value.margin.left}, ${options.value.margin.top})`
    );

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
</style> -->
