<template>
  <svg
    :id="id"
    :width="dimensions.chart.width"
    :height="dimensions.chart.height"
    class="feather-force-directed-svg"
    :class="zoomLevel"
  ></svg>
</template>

<script setup lang="ts">
import {
  PropType,
  Ref,
  computed,
  inject,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watchEffect,
} from "vue";
import {
  FeatherChartAxes,
  FeatherChartDimensions,
  FeatherChartForceDirectedData,
  FeatherChartOptions,
  ZoomLevel,
} from "./types";

import {
  Simulation,
  SimulationNodeDatum,
  forceCenter,
  forceLink,
  forceManyBody,
  forceRadial,
  forceSimulation,
} from "d3-force";
import { select } from "d3-selection";
import { drag } from "d3-drag";
import { scaleOrdinal } from "d3-scale";

import { setDynamicScope } from "./chartUtils";

let props = defineProps({
  id: { type: String, required: true },
  size: { type: String, required: true },
  title: { type: String, required: false },
  type: { type: String, required: true },
  data: {
    type: Object as PropType<FeatherChartForceDirectedData>,
    required: true,
  },
  dimensions: {
    type: Object as PropType<FeatherChartDimensions>,
    required: true,
  },
  options: { type: Object as PropType<FeatherChartOptions>, required: true },
  axes: { type: Object as PropType<FeatherChartAxes>, required: true },
});

const { data, dimensions, id, options } = reactive(props);

dimensions.control.height = dimensions.control.width;
dimensions.chart.height = dimensions.control.height / 2;

const radialForce = ref(50);

const theme = inject("theme") as Ref<string>;
const position = inject("position") as { x: number; y: number };
const zoomLevel = inject("zoomLevel") as Ref<ZoomLevel>;

if (!options.margin) throw new Error("margin not set");

const containerWidth =
  dimensions.chart.width - (options.margin.left + options.margin.right);
const containerHeight =
  dimensions.chart.height - (options.margin.top + options.margin.bottom);

const color = computed(() => {
  if (options && options.colorScheme) {
    console.log("setting color scheme in Force Directed", options.colorScheme);
    return scaleOrdinal(options.colorScheme);
  }
  return null;
});

const nodes = computed(
  () => data.data.nodes.map((d) => ({ ...d })) as SimulationNodeDatum[]
);
const links = computed(() => data.data.links.map((d) => ({ ...d })));

// SIMULATION
let simulation: Simulation<SimulationNodeDatum, undefined> & {
  nodes?: any;
  links?: any;
} = forceSimulation(nodes.value as SimulationNodeDatum[]);

const deRegisterSimulation = () => {
  if (!simulation) return;

  simulation
    .force("link", null)
    .force("charge", null)
    .force("radial", null)
    .force("center", null)
    .force("x", null);
};
const registerSimulation = () => {
  if (simulation) deRegisterSimulation();
  simulation = forceSimulation(nodes.value)
    .force(
      "link",
      forceLink(links.value).id((d: any) => d.id)
    )
    .force("charge", forceManyBody())
    .force("radial", forceRadial(radialForce.value))
    .force("center", forceCenter(containerWidth / 2, containerHeight / 2))
    .force("x", forceCenter(containerWidth / 2, containerHeight / 2))
    .force("y", forceCenter(containerWidth / 2, containerHeight / 2));
};

registerSimulation();

const dragStarted = (event: any) => {
  if (!event.active && simulation) {
    simulation.alphaTarget(generateRandomNumber(0.1, 2)).restart();
  }
  event.subject.fx = event.subject.x;
  event.subject.fy = event.subject.y;
};

const dragged = (event: any) => {
  if (simulation) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }
};

const dragEnded = (event: any) => {
  if (!event.active && simulation) simulation.alphaTarget(0);
  event.subject.fx = null;
  event.subject.fy = null;
};

const getMetaData = (obj: any) => {
  let pairs = new Array();
  Object.keys(obj).map((key) => {
    if (key !== "id" && key !== "group") {
      pairs.push(`${key.toUpperCase()}: ${obj[key]}`);
    }
  });
  return pairs.join("\n");
};

// #endregion SVG Dragging

// https://observablehq.com/@d3/disjoint-force-directed-graph/2?intent=fork

const draw = () => {
  select(`#${id}`).selectChildren().remove();

  position.x = 0;
  position.y = 0;

  console.log("Drawing in theme: ", theme.value);

  if (!isValid()) throw new Error("Data is not valid");

  // svg
  const svg = select(`#${id}`)
    .attr("width", dimensions.chart.width)
    .attr("height", dimensions.chart.height)
    .attr(
      "viewBox",
      `-32 -32 ${dimensions.chart.width} ${dimensions.chart.height}`
    )
    .attr("style", "max-width: 100%; height: auto;");

  const link = svg
    .append("g")
    .classed("links", true)
    .selectAll("line")
    .data(links.value)
    .join("line")
    .classed("force-directed-link", true);

  const node = svg
    .append("g")
    .classed("circles", true)
    .selectAll("circle")
    .data(nodes.value)
    .join("circle")
    .attr("class", (d) =>
      options.colorScheme
        ? "force-directed-circle"
        : `force-directed-circle categorical${(d as any).group}`
    );

  node
    .append("title")
    .html((d: any) => `Node: ${d.id}\nGroup: ${d.group} \n${getMetaData(d)}`);

  node
    .attr("tabindex", 0)
    .attr("r", 8)
    .attr("cx", (d: any) => d.x)
    .attr("cy", (d: any) => d.y);

  if (color.value != null) {
    // @ts-ignore
    node.attr("fill", (d: any) => color.value(d.group));
  }

  node.call(
    // @ts-ignore
    drag()
      .on("start" as any, dragStarted)
      .on("drag" as any, dragged)
      .on("end" as any, dragEnded)
  );

  simulation.on("tick", () => {
    node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);

    link
      .attr("x1", (d: any) => d.source.x)
      .attr("y1", (d: any) => d.source.y)
      .attr("x2", (d: any) => d.target.x)
      .attr("y2", (d: any) => d.target.y);
  });

  // add vue scoped attribute to dynamic elements
  setDynamicScope(`#${id}`);
};

const generateRandomNumber = (min: number, max: number) => {
  const num = Math.random() * (max - min) + min;
  console.log("random number", num);
  return num;
};

const isValid = () => {
  // add validation here, data, options etc...
  return true;
};

defineExpose({ draw });

watchEffect(() => {
  if (nodes.value && links.value && radialForce.value) {
    console.log("watchEffect");
    if (simulation) {
      simulation.stop();
    }

    draw();

    if (simulation && nodes.value && links.value) {
      simulation.nodes(nodes.value);
      // @ts-ignore
      simulation.force("link").links(links.value);
      // }

      // if (simulation) {
      simulation.alpha(generateRandomNumber(0.1, 2)).restart();
    }
  }
});

onMounted(() => {
  draw();
});

onUnmounted(() => {
  deRegisterSimulation();
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";

.feather-force-directed-svg {
  overflow: visible;
  &.zoom-in-2 {
    transform: scale(2);
  }
  &.zoom-in-1 {
    transform: scale(1.5);
  }
  &.zoom-none {
    transform: scale(1);
  }
  &.zoom-out-1 {
    transform: scale(0.75);
  }
  &.zoom-out-2 {
    transform: scale(0.5);
  }
  g.links {
    line.force-directed-link {
      stroke: var($secondary);
      stroke-width: 1px;
      stroke-opacity: 0.8;
    }
  }
  g.circles > circle.force-directed-circle {
    cursor: pointer;
    stroke: var($primary);
    stroke-width: 1px;
    stroke-opacity: 0.5;
    &:focus {
      outline: 3px solid transparent;
      border-radius: 25px;
    }
    &:focus-visible {
      outline: 3px solid var($secondary);
      outline-style: auto;
      border-radius: 45px;
    }
    &.categorical1 {
      fill: var($categorical1);
    }
    &.categorical2 {
      fill: var($categorical2);
    }
    &.categorical3 {
      fill: var($categorical3);
    }
    &.categorical4 {
      fill: var($categorical4);
    }
    &.categorical5 {
      fill: var($categorical5);
    }
    &.categorical6 {
      fill: var($categorical6);
    }
    &.categorical7 {
      fill: var($categorical7);
    }
    &.categorical8 {
      fill: var($categorical8);
    }
    &.categorical9 {
      fill: var($categorical9);
    }
    &.categorical10,
    &.categorical0 {
      fill: var($categorical10);
    }
  }
}
// }
</style>
