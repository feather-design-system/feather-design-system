<template>
  <svg
    :id="id"
    :width="dimensions.chart.width"
    :height="dimensions.chart.height"
    :class="classes"
  ></svg>
</template>
<script lang="ts" setup>
import { select } from "d3-selection";
import { hierarchy, tree } from "d3-hierarchy";
import { LinkRadial, linkRadial } from "d3-shape";
import { transition } from "d3-transition";
import { easeBounce } from "d3-ease";

import {
  PropType,
  computed,
  inject,
  onMounted,
  toRefs,
  watchEffect,
} from "vue";
import {
  FeatherChartAxes,
  FeatherChartDimensions,
  FeatherChartOptions,
  FeatherChartRadialData,
} from "./types";
import { setDynamicScope } from "./chartUtils";

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: false },
  size: { type: String, required: true },
  type: { type: String, required: true },
  data: { type: Object as PropType<FeatherChartRadialData>, required: true },
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

const { data, dimensions, id, options } = toRefs(props);

const position = inject("position") as { x: number; y: number };

if (!options.value.margin) {
  throw new Error("margin not set");
}

dimensions.value.control.height = dimensions.value.control.width;
dimensions.value.chart.height = dimensions.value.control.height;

const containerWidth =
  dimensions.value.chart.width -
  (options.value.margin.left + options.value.margin.right);
const containerHeight =
  dimensions.value.chart.height -
  (options.value.margin.top + options.value.margin.bottom);

const draw = () => {
  select(`#${id.value}`).selectChildren().remove();

  position.x = 0;
  position.y = 0;

  if (!isValid()) throw new Error("Data is not valid");

  // DATA
  const radialData = hierarchy(data.value.data);

  // HMMM:  containerHeight is arbitrary (defaults to 350) and grows to fit content;  but don't know what content is yet.  May need to do this after we join data or make it configurable.
  const diameter = containerHeight * 0.75;
  const radius = diameter / 2;

  const treeFn = tree()
    .size([2 * Math.PI, radius])
    .separation((a, b) => (a.parent == b.parent ? 1 : 2));

  // @ts-ignore
  const treeData = treeFn(radialData);
  const nodes = treeData.descendants();
  const links = treeData.links();

  if (!options.value.margin) {
    throw new Error("margin not set");
  }

  // DRAW SVG
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
      `translate(${options.value.margin.left},${options.value.margin.top})`
    );

  const graphGroup = svg
    .append("g")
    .attr(
      "transform",
      `translate(${containerWidth / 2}, ${containerHeight / 2} )`
    );

  const linkRadialFn = linkRadial()
    .angle((d: any) => d.x)
    .radius((d: any) => d.y) as LinkRadial<any, any, [number, number]>;

  const duration = 1000;
  const animate = transition().duration(duration).ease(easeBounce);

  graphGroup
    .selectAll(".link")
    .data(links)
    .join("path")
    .attr("opacity", "0")
    .transition(animate)
    .attr("opacity", "1")
    .attr("class", "link")
    .attr("d", linkRadialFn);

  const node = graphGroup
    .selectAll(".node")
    .data(nodes)
    .join("g")
    .attr("class", "node")
    .attr("transform", (d) => {
      return `rotate(${(d.x * 180) / Math.PI - 90})translate(${d.y}, 0)`;
    });

  node
    .append("text")
    .classed("node-text", true)
    .attr("dx", (d) => (d.x < Math.PI ? 10 : -10))
    .attr("dy", ".23em")
    .attr("transform", (d) => (d.x < Math.PI ? null : "rotate(180)"))
    .attr("opacity", "0")
    .transition(animate)
    .attr("opacity", "1")
    .attr("text-anchor", (d) => (d.x < Math.PI ? "start" : "end"))
    .text((d: any) => d.data.name);

  node
    .append("circle")
    .attr("tabindex", "0")
    .attr("r", "0")
    // .attr("fill", "none")
    .transition(animate)
    .attr("r", "8");

  setDynamicScope(`#${id.value}`);
};

const isValid = () => {
  // validate data is iterable
  return true;
};

const classes = computed(() => {
  return {
    "feather-radial-svg": true,
  };
});

defineExpose({ draw });

watchEffect(() => {
  if (data.value) {
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
@use "@featherds/styles/mixins/typography" as typo;

.feather-radial-svg {
  display: block;
  max-width: 100%;
  height: auto;
  g {
    g {
      path.link {
        fill: none;
        stroke: var(vars.$shade-3);
      }

      g.node {
        .node-text {
          @include typo.body-large();
          text-align: right;
          line-height: 0.875em;
          fill: var(vars.$primary-text-on-surface);

          text-shadow: -0.5px -0.5px 0 var(vars.$primary-text-on-color),
            0.5px -0.5px 0 var(vars.$primary-text-on-color),
            -0.5px 0.5px 0 var(vars.$primary-text-on-color),
            0.5px 0.5px 0 var(vars.$primary-text-on-color),
            -1px -1px 0 var(vars.$primary-text-on-color),
            1px -1px 0 var(vars.$primary-text-on-color),
            -1px 1px 0 var(vars.$primary-text-on-color),
            1px 1px 0 var(vars.$primary-text-on-color),
            -1.5px -1.5px 0 var(vars.$primary-text-on-color),
            1.5px -1.5px 0 var(vars.$primary-text-on-color),
            -1.5px 1.5px 0 var(vars.$primary-text-on-color),
            1.5px 1.5px 0 var(vars.$primary-text-on-color);
        }

        .node-text:hover {
          height: 5.875em;
          z-index: 1;
          overflow-wrap: break-word;
          text-shadow: 0;
        }

        .left {
          text-align: left;
          direction: ltr;
        }

        .right {
          text-align: right;
          direction: ltr;
        }

        circle {
          fill: var(vars.$surface);
          stroke: var(vars.$primary-text-on-surface);
          stroke-width: 2px;
        }
      }
    }
  }
}
</style>
