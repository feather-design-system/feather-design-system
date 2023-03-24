<!-- https://www.julienverneaut.com/en/articles/fix-violation-added-non-passive-event-listener-scroll-blocking-touchstart-event-error -->
<template>
  <template id="component-icon-resources">
    <FeatherIcon id="icon-expand" :icon="ExpandLess" />
  </template>
  <!-- @mousedown.shift.prevent="beginDrag" -->
  <svg
    :id="id"
    :width="dimensions.chart.width"
    :height="dimensions.chart.height"
    class="feather-tree-diagram-svg"
    :class="`${baseLenClass} ${zoomLevel} ${isDragging ? 'being-dragged' : ''}`"
    :draggable="true"
    @mousedown.prevent="beginDrag($event)"
    @mousemove="continueDrag($event, zoomScale)"
    @mouseup="endDrag"
    @mouseleave="endDrag"
    :style="{
      transform: `translate(${svgPos.x}px, ${svgPos.y}px)`,
    }"
    @wheel="handleWheel"
  ></svg>
  <div class="svg-footer">
    <FeatherButton
      class="modify-chart"
      icon="Increase node size"
      @click="increaseBaseLen"
    >
      <FeatherIcon :icon="KeyboardArrowUp" />
    </FeatherButton>
    <FeatherButton
      class="modify-chart"
      icon="Decrease node size"
      @click="decreaseBaseLen"
    >
      <FeatherIcon :icon="KeyboardArrowDown" />
    </FeatherButton>
    <FeatherButton
      class="modify-chart"
      icon="Increase separation"
      @click="increaseSeparation"
    >
      <FeatherIcon :icon="KeyboardArrowUp" />
    </FeatherButton>
    <FeatherButton
      class="modify-chart"
      icon="Decrease separation"
      @click="decreaseSeparation"
    >
      <FeatherIcon :icon="KeyboardArrowDown" />
    </FeatherButton>
    <FeatherButton id="`${id}-recenter" primary @click="recenter">
      recenter
    </FeatherButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { drag } from "d3-drag";
export default defineComponent({
  name: "TreeDiagram",
});
</script>

<script lang="ts" setup>
import {
  PropType,
  Ref,
  computed,
  inject,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  watchEffect,
} from "vue";
import { select, selectAll } from "d3-selection";
import { hierarchy, HierarchyNode, tree } from "d3-hierarchy";

import {
  FeatherChartAxes,
  FeatherChartTreeDiagramData,
  FeatherChartDimensions,
  FeatherChartOptions,
  ZoomLevel,
} from "./types";
import { setDynamicScope } from "./chartUtils";

import { FeatherButton } from "@featherds/button";
import { FeatherIcon } from "@featherds/icon";
import ExpandLess from "@featherds/icon/navigation/ExpandLess";
import KeyboardArrowUp from "@featherds/icon/hardware/KeyboardArrowUp";
import KeyboardArrowDown from "@featherds/icon/hardware/KeyboardArrowDown";

import { useDraggable } from "@featherds/composables/events/Drag";
const {
  beginDrag,
  continueDrag,
  endDrag,
  isDragging,
  position: svgPos,
} = useDraggable();

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: false },
  size: { type: String, required: true },
  type: { type: String, required: true },
  data: {
    type: Object as PropType<FeatherChartTreeDiagramData>,
    required: true,
  },
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

const { data, dimensions, id, options } = reactive(props);

// const position = inject("position") as { x: number; y: number };
// const position: { x: number; y: number } = { x: 0, y: 0 };

// #region zoom
const zoomLevel = inject("zoomLevel") as Ref<ZoomLevel>;
const wheelDelta = ref(0);

const handleWheel = (event: WheelEvent) => {
  wheelDelta.value += Math.abs(event.deltaY) / event.deltaY;
  switch (wheelDelta.value) {
    case -2:
      zoomLevel.value = ZoomLevel.ZOOM_IN_2;
      break;
    case -1:
      zoomLevel.value = ZoomLevel.ZOOM_IN_1;
      break;
    case 0:
      zoomLevel.value = ZoomLevel.ZOOM_NONE;
      break;
    case 1:
      zoomLevel.value = ZoomLevel.ZOOM_OUT_1;
      break;
    case 2:
      zoomLevel.value = ZoomLevel.ZOOM_OUT_2;
      break;
  }
  if (wheelDelta.value > 2) {
    wheelDelta.value = 2;
  }
  if (wheelDelta.value < -2) {
    wheelDelta.value = -2;
  }
};

const zoomScale = computed(() => {
  switch (zoomLevel.value) {
    case ZoomLevel.ZOOM_IN_2:
      return 2;
    case ZoomLevel.ZOOM_IN_1:
      return 1.5;
    case ZoomLevel.ZOOM_NONE:
      return 1;
    case ZoomLevel.ZOOM_OUT_1:
      return 0.75;
    case ZoomLevel.ZOOM_OUT_2:
      return 0.5;
    default:
      return 1;
  }
});

// #endregion zoom

const defaultNodeClickHandler = (id: string, data: any) => {
  // console warning to remind the developer to provide a handler
  console.warn("handleNodeClicked not provided", id, data);
};

const handleNodeClick = inject("handleNodeClick", defaultNodeClickHandler) as (
  id: string,
  data: any
) => void;

if (!options.margin) {
  throw new Error("margin not set");
}

// TODO:  Need to update all charts to accept these provided values
const containerWidth = inject("containerWidth") as Ref<number>;
const containerHeight = inject("containerHeight") as Ref<number>;

let baseLen = ref(0);
let overrideBaseLen = false;
const baseLenClass = computed(() => {
  switch (true) {
    case baseLen.value >= 45:
      return "baseLen-45";
    case baseLen.value <= 30:
      return "baseLen-30";
    default:
      return "baseLen-45";
  }
});

let separation = ref(3);
const increaseSeparation = () => {
  overrideBaseLen = true;
  separation.value -= 0.25;
  setTimeout(() => {
    overrideBaseLen = false;
  }, 250);
};

const decreaseSeparation = () => {
  overrideBaseLen = true;
  separation.value += 0.25;
  setTimeout(() => {
    overrideBaseLen = false;
  }, 250);
};
const increaseBaseLen = () => {
  overrideBaseLen = true;
  baseLen.value += 5;
  setTimeout(() => {
    overrideBaseLen = false;
  }, 250);
};
const decreaseBaseLen = () => {
  overrideBaseLen = true;
  baseLen.value -= 5;
  setTimeout(() => {
    overrideBaseLen = false;
  }, 250);
};

const collapsedNodes = new Set();
const multiInstanceInitialNodes = new Map();

// let selectedNode: string | null = null;
const selectedNode = ref("");

const drawLine = (d: any) => {
  if (multiInstanceInitialNodes.has(d.data.name)) {
    return originalNodeLine(d);
  }
  return straightLine(d);
};

const originalNodeLine = (d: any) => {
  const origCoord = multiInstanceInitialNodes.get(d.data.name).coord;
  // console.log("origCoord ", origCoord);
  // console.log("d ", { x: d.x, y: d.y });
  return `M${origCoord.x},${origCoord.y - baseLen.value / 2}L${d.parent.x},${
    d.parent.y + baseLen.value / 2
  }`;
};

const straightLine = (d: any) => {
  return `M${d.x},${d.y - baseLen.value / 2}L${d.parent.x},${
    d.parent.y + baseLen.value / 2
  }`;
};

// const line = (
//   start: { x: number; y: number },
//   end: { x: number; y: number }
// ) => {
//   const adj = baseLen.value / 2;
//   return `M${start.x},${start.y - adj}L${end.x},${end.y + adj}`;
// };

// #region node dragging
function dragstarted(event: MouseEvent, _d: any) {
  // @ts-ignore
  if (!event.active) select(this).classed("dragging", true);
}

function dragged(this: any, event: MouseEvent, d: any) {
  d.x = event.x;
  d.y = event.y;

  // move the node
  select(this).attr("transform", `translate(${d.x},${d.y})`);

  // move the links

  // select all links where the current node is the parent
  const nodeAsParentLinks = selectAll(
    `path.link[data-parent="${d.data.name}"]`
  );
  nodeAsParentLinks.each(function (_l: any) {
    const link = select(this);
    if (multiInstanceInitialNodes.has(link.attr("data-name"))) {
      // console.log("as PARENT of multi instance");
      const linkD = link.attr("d");
      let linkM = linkD.split("L")[0];
      link.attr("d", `${linkM}L${d.x},${d.y + baseLen.value / 2}`);
    } else {
      // console.log("as PARENT of single instance");
      link.attr("d", (d) => straightLine(d));
    }
  });

  // select all links where the current node is the child with a single parent
  if (!multiInstanceInitialNodes.has(d.data.name)) {
    const nodeAsChildLinks = selectAll(`path.link[data-name="${d.data.name}"]`);
    nodeAsChildLinks.each(function (_l: any) {
      // console.log("as CHILD");
      select(this).attr("d", (d) => straightLine(d));
    });
  } else {
    // select all links where current node is a child of a multi parents
    const asMultiInstanceChild = selectAll(
      `path.link[data-name="${d.data.name}"]`
    );
    asMultiInstanceChild.each(function (_l: any, index: number) {
      // console.log("as MULTI CHILD");
      let start = { x: d.x, y: d.y };
      let link = select(this);
      switch (index) {
        case 0:
          link.attr(
            "d",
            `M${d.x},${d.y - baseLen.value / 2}L${d.parent.x},${
              d.parent.y + baseLen.value / 2
            }`
          );
          break;
        default:
          const linkD = link.attr("d");
          let linkL = linkD.split("L")[1];
          link.attr("d", `M${start.x},${start.y - baseLen.value / 2}L${linkL}`);
      }
    });
  }
}

function dragended(event: MouseEvent, _d: any) {
  // @ts-ignore
  if (!event.active) select(this).classed("dragging", false);
}

const dragHandler = drag()
  .on("start", dragstarted)
  .on("drag", dragged)
  .on("end", dragended);

// #endregion node dragging

function getNodeWidth(d: any) {
  return isContainer(d) ? baseLen.value * 4 : baseLen.value;
}

function getNodeX(d: any) {
  return isContainer(d) ? -baseLen.value * 2 : (baseLen.value / 2) * -1;
}

function hasCollapsedAncestor(d: any) {
  // let currentNode = cloneDeep(d);
  let currentNode = d;

  while (currentNode.parent) {
    if (collapsedNodes.has(currentNode.parent.data.name)) {
      return true;
    }
    currentNode = currentNode.parent;
  }
  return false;
}

const parentNodeGroup = (el: HTMLElement) => {
  if (el.tagName === "g") return el;
  return el.closest(`g.node-group`);
};

const toggleSelected = (el: HTMLElement) => {
  selectAll(".node-group").classed("selected", false);
  const parent = parentNodeGroup(el);
  if (!parent) return;

  select(parent).classed("selected", true);
};

const toggleCollapsed = (el: HTMLElement, d: any) => {
  const parent = parentNodeGroup(el);
  if (!parent) return;

  select(parent).classed("collapsed", collapsedNodes.has(d.data.name));
};

const hideDescendants = (d: any) => {
  d.children.forEach((child: any) => {
    const hideChild = hasCollapsedAncestor(child);

    select(
      `g.node-group[data-parent="${child.parent.data.name}"][data-name="${child.data.name}"]`
    ).classed("hidden", hideChild);
    select(
      `g path.link[data-parent="${child.parent.data.name}"][data-name="${child.data.name}"]`
    ).classed("hidden", hideChild);

    if (child.children) {
      hideDescendants(child);
    }
  });
};

const checkSharedChildVisibility = (d: any) => {
  if (!d.children) return;
  // check all links to children
  d.children.forEach((child: any) => {
    if (multiInstanceInitialNodes.has(child.data.name)) {
      let hidden = true;

      // find any visible links to the child
      let links = selectAll(`path.link[data-name="${child.data.name}"`);
      links.each(function () {
        const hasHiddenClass = select(this).classed("hidden");
        console.log("hasHiddenClass", hasHiddenClass);
        if (!hasHiddenClass) {
          hidden = false;
        }
      });
      select(`g.node-group[data-name="${child.data.name}"]`).classed(
        "hidden",
        hidden
      );
    }
  });
};

const findMultiInstanceNodes = (d: HierarchyNode<unknown>) => {
  const uniqueNames = new Map();

  const iterate = (node: any) => {
    if (uniqueNames.has(node.data.name)) {
      multiInstanceInitialNodes.set(node.data.name, {
        parent: uniqueNames.get(node.data.name).parent,
        coord: uniqueNames.get(node.data.name).coord,
      });
    } else {
      uniqueNames.set(node.data.name, {
        parent: node.parent ? node.parent.data.name : "",
        coord: { x: node.x, y: node.y },
      });
    }

    if (node.children) {
      node.children.forEach((child: any) => {
        iterate(child);
      });
    }
  };

  iterate(d);
};

// #region status

const isOk = (d: any) => d.data.status === "ok";
const isError = (d: any) => d.data.status === "error";

// #endregion status

// #region filters
const isContainer = (d: any) => d.data.type === "container";

const shouldDrawNode = (d: any) => {
  // if this node only appears once in the tree, draw it
  if (!multiInstanceInitialNodes.has(d.data.name)) return true;
  else if (
    // if this node is a multi instance node and it is the first instance
    d.parent.data.name == multiInstanceInitialNodes.get(d.data.name).parent
  ) {
    return true;
  }
  return false;
};

const hasNonContainerChild = (d: any) => {
  if (!d.children) return false;
  return d.children.some((child: any) => !isContainer(child));
};

// #endregion filters

const removeChildren = () => {
  select(`#${id}`).selectChildren().remove();
};

// #region movement
const moveSvg = (offset: { x: number; y: number }) => {
  const elSvg = document.getElementById(`${id}`)!;
  if (elSvg) {
    const newPos = centerElement(offset);
    svgPos.x = newPos.x;
    svgPos.y = newPos.y;
    elSvg.style.transform = `translate(${svgPos.x}px, ${svgPos.y}px)`;
  }
};

const centerElement = (offset?: {
  x: number;
  y: number;
}): { x: number; y: number } => {
  const centerX = containerWidth.value / 2;
  const centerY = containerHeight.value / 6;
  if (offset) {
    return { x: centerX - offset.x, y: centerY - offset.y };
  }
  return { x: 0, y: 0 };
};

const recenter = () => {
  // reset position
  svgPos.x = 0;
  svgPos.y = 0;

  const svg = document.getElementById(`${id}`)!;
  svg.style.transform = `translate(${svgPos.x}px, ${svgPos.y}px)`;
  svg.classList.remove("zoom-in-2", "zoom-in-1", "zoom-out-1", "zoom-out-2");
  svg.classList.add("zoom-none");
  zoomLevel.value = ZoomLevel.ZOOM_NONE;
};

// #endregion movement

const setBaseLen = (nodes: HierarchyNode<unknown>): number => {
  // determine if node count is greater than 30
  return nodes.descendants().length > 30 ? 30 : 45;
};

// #region data

const childCount = (d: any) => {
  if (!d.children) return 0;
  const error = d.children.filter((child: any) => isError(child)).length;
  return error ? error : d.children.length;
};
// #endregion data

const draw = (offset?: { x: number; y: number } | undefined) => {
  const newPos = centerElement(offset);
  svgPos.x = newPos.x;

  if (!isValid()) throw new Error("Data is not valid");

  // DATA
  const dataset: unknown = data.data;

  const treeLayout = tree()
    .size([containerWidth.value, containerHeight.value])
    .separation((a, b) => (a.parent === b.parent ? 1 : separation.value));

  let nodes = hierarchy(dataset);
  nodes = treeLayout(nodes);

  nodes.each((d: any) => {
    d.x = parseFloat(d.x.toFixed(0));
    d.y = parseFloat(d.y.toFixed(0));
  });

  // determine if node count is greater than 30
  if (!overrideBaseLen) {
    baseLen.value = setBaseLen(nodes);
  }

  // multi instance node tracking
  multiInstanceInitialNodes.clear();
  findMultiInstanceNodes(nodes);

  const svg = select(`#${id}`)
    .attr("width", dimensions.chart.width)
    .attr("height", dimensions.chart.height);

  const g = svg
    .attr("opacity", 0)
    .append("g")
    .attr(
      "transform",
      `translate(${options.margin ? options.margin.left : 0},${
        options.margin ? options.margin.top : 0
      })`
    );

  g.selectAll(".link")

    .data(nodes.descendants().slice(1))
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("data-parent", (d: any) => d.parent.data.name)
    .attr("data-name", (d: any) => d.data.name)
    .attr("d", (d: any) => drawLine(d))
    .classed("error", (d: any) => isError(d));

  // Adds each node as a group
  const node = g
    .selectAll(".node-group")
    .data(nodes.descendants())
    .enter()
    .filter((d: any) => shouldDrawNode(d))
    // if this node only appears once in the tree, draw it
    .append("g")
    // @ts-ignore
    // if this node is a multi instance node and it is the first instance
    .call(dragHandler)
    .attr("class", (d: any) => `node-group ${d.data.type}-type`)
    .attr("data-parent", (d: any) => (d.parent ? d.parent.data.name : ""))
    .attr("data-name", (d: any) => d.data.name)
    .attr("transform", (d: any) => `translate(${d.x},${d.y})`)
    .on("click", function (e: Event, d: any) {
      selectAll(".node-group").classed("selected", false);

      toggleSelected(e.target as HTMLElement);
      selectedNode.value = d.data.name;
      handleNodeClick(`${id}`, d);

      moveSvg({ x: d.x, y: d.y });
    });

  // Add the rect that the user sees as the containers
  node
    .filter((d: any) => isContainer(d))
    .append("rect")
    .classed("node", true)
    .classed("ok", (d: any) => isOk(d))
    .classed("error", (d: any) => isError(d))
    .attr("width", (d: any) => getNodeWidth(d))
    .attr("height", baseLen.value)
    .attr("x", (d: any) => getNodeX(d))
    .attr("y", -baseLen.value / 2)
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("tabindex", 0);

  // add the circle for the nodes that are not containers
  node
    .filter((d: any) => !isContainer(d))
    .append("circle")
    .classed("node", true)
    .classed("ok", (d: any) => isOk(d))
    .classed("error", (d: any) => isError(d))
    .attr("x", (d: any) => getNodeX(d))
    .attr("r", baseLen.value / 2)
    .attr("tabindex", 0);

  // add node text for container nodes
  node
    .filter((d: any) => isContainer(d))
    .append("foreignObject")
    .classed("fo", true)
    .attr("width", (d: any) => getNodeWidth(d))
    .attr("height", baseLen.value)
    .attr("dy", "0.5em")
    .attr("x", (d: any) => getNodeX(d))
    .attr("y", -baseLen.value / 2)
    .append("xhtml:div")
    .attr("class", (d: any) =>
      d.data.name.length > 20 || baseLen.value <= 35 ? "small" : ""
    )
    .classed("text-container", true)
    .append("xhtml:span")
    .text((d: any) => d.data.name);

  // placeholder rect for status icon
  // node
  //   .filter((d: any) => isContainer(d))
  //   .append("rect")
  //   .classed("icon-background", true)
  //   .attr("width", baseLen.value / 2 - 1)
  //   .attr("height", baseLen.value - 2)
  //   .attr("x", -baseLen.value * 2 + 1)
  //   .attr("y", -baseLen.value / 2 + 1)
  //   .attr("rx", 4)
  //   .attr("ry", 4);

  // add a smaller rect to the right of the node to show the expand icon
  node
    .filter((d: any) => isContainer(d))
    .append("rect")

    .classed("icon-background", true)
    .attr("width", baseLen.value / 2 - 1)
    .attr("height", baseLen.value - 2)
    // subtract half baseLen.value to move to the left by the width of the icon
    .attr("x", baseLen.value * 2 - baseLen.value / 2)
    .attr("y", -baseLen.value / 2 + 1)
    .attr("rx", 4)
    .attr("ry", 4)
    .on("click", (event, d: any) => {
      if (collapsedNodes.has(d.data.name)) {
        collapsedNodes.delete(d.data.name);
      } else {
        collapsedNodes.add(d.data.name);
      }
      toggleCollapsed(event.target, d);
      hideDescendants(d);
      checkSharedChildVisibility(d);
    });

  // build the expand icon
  node
    .filter((d: any) => isContainer(d))
    .append("use")
    .attr("href", "#icon-expand")
    .attr("height", baseLen.value / 2)
    .attr("width", baseLen.value / 2)
    .attr("x", baseLen.value * 2 - baseLen.value / 2) // half baseLen.value - baseLen.value / 2 to move left the width of the icon
    .attr("y", -baseLen.value / 4)
    .classed("expand-icon", true);

  // add the text for the nodes
  node
    .filter((d: any) => !isContainer(d))
    .append("foreignObject")
    .classed("fo", true)
    .attr("x", -baseLen.value)
    .attr("y", baseLen.value - baseLen.value / 3)
    .attr("width", baseLen.value * 2)
    .attr("height", 50)
    .append("xhtml:div")
    .classed("node-fo-container", true)
    .append("xhtml:p")
    .classed("node-fo-text", true)
    .text((d: any) => `${d.data.name}`);

  node
    .filter((d: any) => !isContainer(d))
    .append("use")
    .attr("href", (d: any) => "#icon-" + d.data.type)
    .attr("height", baseLen.value / 2)
    .attr("width", baseLen.value / 2)
    .attr("x", -baseLen.value / 4)
    .attr("y", -baseLen.value / 4)
    .classed("node-icon", true);

  // add the badge of children for container nodes
  node
    .filter((d: any) => hasNonContainerChild(d))
    .append("circle")
    .classed("background-surface", true)
    .attr("fill", "var(--feather-surface)")
    .attr("r", baseLen.value / 4)
    .attr("cx", -baseLen.value * 2 + baseLen.value / 2)
    .attr("cy", -baseLen.value + baseLen.value / 2);

  node
    .filter((d: any) => hasNonContainerChild(d))
    .append("circle")
    .classed("badge", true)
    .classed("ok", (d: any) => isOk(d))
    .classed("error", (d: any) => isError(d))
    .attr("r", baseLen.value / 4)
    .attr("cx", -baseLen.value * 2 + baseLen.value / 2)
    .attr("cy", -baseLen.value + baseLen.value / 2);

  node
    .filter((d: any) => hasNonContainerChild(d))
    .append("text")
    .classed("badge-text", true)
    .classed("ok", (d: any) => isOk(d))
    .classed("error", (d: any) => isError(d))
    .attr("dx", -baseLen.value * 2 + baseLen.value / 2)
    .attr("dy", `${-baseLen.value + baseLen.value / 2 + baseLen.value / 8}px`)
    .attr("text-anchor", "middle")
    // .text((d: any) => (d.children ? d.children.length : 0));
    .text((d: any) => childCount(d));

  // selectAll(".node-group.container-type").classed("collapsed", true);
  // selectAll(".node-group.container-type").each((d: any) => {
  //   collapsedNodes.add(d.data.name);
  //   hideDescendants(d);
  // });

  setDynamicScope(`#${id}`);

  setTimeout(() => {
    svg.attr("opacity", 1);
    recenter();
  }, 50);
};

function isValid() {
  // validation rules here.
  if (options.margin == undefined) return false;
  return true;
}

defineExpose({ draw });

watchEffect(() => {
  if (data) {
    removeChildren();
    draw();
  }
});

onBeforeMount(() => {});

onMounted(() => {
  // const elSvg = document.getElementById(`${id}`)!;

  draw();

  // selectAll(".node-group.container-type").classed("collapsed", true);
  // selectAll(".node-group.container-type").each((d: any) => {
  //   collapsedNodes.add(d.data.name);
  //   hideDescendants(d);
  // });

  // setTimeout(() => {
  //   elSvg.style.opacity = "1";
  // }, 1000);
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/themes/utils";

.feather-tree-diagram-svg {
  font-family: var(--feather-header-font-family);
  --stroke-width-alert: 3px;
  border: 1px dashed alpha($primary, 0.01);
  opacity: 1;
  transition-delay: 0.125s;
  transition: opacity 1s ease-in, transform 1s ease-in-out, scale 1s ease;
  &.baseLen-45 {
    text {
      stroke: var($success);
      font-size: medium;
    }
  }
  &.baseLen-30 {
    text {
      stroke: var($success);
      font-size: x-small;
    }
  }
  &:hover {
    cursor: grab;
    border: 1px dashed alpha($primary, 0.05);
  }
  &.being-dragged {
    cursor: grabbing;
    transition: scale 1s ease-in-out;
    border: 1px dashed alpha($primary, 0.5);
  }

  // TODO: Think about moving css zoom functionality to FeatherChart... scale .chart svg
  &.zoom-in-2 {
    scale: 2;
  }
  &.zoom-in-1 {
    scale: 1.5;
  }
  &.zoom-none {
    scale: 1;
  }
  &.zoom-out-1 {
    scale: 0.75;
  }
  &.zoom-out-2 {
    scale: 0.5;
  }

  g {
    .link {
      opacity: 1;
      scale: 1;
      transition: opacity 0.5s ease-in-out, scale 0.25s ease-in-out,
        rotate 0.25s ease-in-out;
      fill: none;
      stroke: var($shade-3);
      stroke-width: 1px;
      &.error {
        stroke: var($error);
        stroke-width: var(--stroke-width-alert);
      }
      &.hidden {
        opacity: 0;
      }
    }
  }

  g.node-group.container-type {
    .fo {
      .text-container {
        height: 100%;
        width: 100%;
        padding: 0 2em;
        line-height: 1.33em;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        &.small {
          font-size: 0.8em;
        }
      }
      &:placeholder-shown {
        display: none;
      }
    }
    .badge {
      fill: var($background);
      stroke-width: 0.125em;
      &.ok {
        stroke: var($success);
      }
      &.error {
        fill: alpha($error, 0.12);
        stroke: var($error);
      }

      stroke: var($success);
    }
    .badge-text {
      &.ok {
        stroke: var($success);
      }

      &.error {
        stroke: var($error);
      }
    }
    .ok-count {
      height: 100%;
      width: 100%;
    }
  }

  g.node-group {
    opacity: 1;
    transition: opacity 0.5s ease-in-out, scale 0.25s ease-in-out,
      rotate 0.25s ease-in-out;
    .node {
      fill: var($background);
      stroke: var($shade-3);
      stroke-width: 2px;

      &focus,
      &:focus-visible {
        outline: none;
        stroke-width: 4px;
        fill: var($surface);
      }

      &.ok {
        stroke: var($success);
        stroke: var($primary);
      }
      &.error {
        stroke: var($error);
      }
      &:hover {
        cursor: pointer;
        fill: var($surface);
        fill-opacity: 0.9;
      }
    }
    &.hidden {
      opacity: 0;
    }
    &:hover {
      background-color: var($shade-3);
      cursor: pointer;
      .fo {
        .node-fo-container {
          color: var($primary-text-on-color);
        }
      }
      &.hidden {
        cursor: grab;
      }
    }
    &:not(:hover) {
      .fo {
        .node-fo-container {
          margin: 0;
          padding: 0;
          .node-fo-text {
            display: none;
          }
        }
      }
    }
    &.selected {
      :focus {
        outline: none;
      }
      .node {
        fill: alpha($primary, 0.2);
        filter: drop-shadow(4px 2px 2px var(--feather-shade-3));
      }
      .fo {
        .text-container {
          background-color: alpha($primary, 0.1);
        }
        .node-fo-container {
          .node-fo-text {
            display: inline-block;
          }
        }
      }
      .icon-background {
        fill: alpha($primary, 0.05);
      }
    }

    &.collapsed {
      .expand-icon {
        transform: rotateX(0.5turn);
        transition-delay: 0.5s;
        transition: all 0.5s ease-in-out;
      }
    }

    .fo {
      .node-fo-container {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var($surface);
        border-radius: 4px;
        padding: 1px;
        position: relative;
        z-index: 1;
        .node-fo-text {
          color: var($primary-text-on-surface);
          line-height: 1.33;
          font-size: 10px;
          text-align: center;
          margin: 0;
          word-wrap: break-word; /* Forces text to wrap */
          overflow: hidden;
        }
      }
    }
    .icon-background {
      fill: var($background);
      cursor: pointer;
    }
    .expand-icon {
      fill: var($primary-text-on-surface);
      transform: rotateZ(0turn);
      transition-delay: 0.25s;
      transition: all 0.25s ease-in-out;
      stroke-width: 1px;
      pointer-events: none;
      cursor: pointer;
    }
    .node-icon {
      user-select: none;
      pointer-events: none;
      cursor: pointer;
    }
  }
}
.svg-footer {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: white;
  z-index: 2;
  :not(.modify-chart) {
    opacity: 1;
  }
  .modify-chart {
    opacity: 0.3;
    &:hover,
    &:focus-visible {
      opacity: 1;
    }
  }
}
</style>
