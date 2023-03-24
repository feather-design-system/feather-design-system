<template>
  <div
    class="feather-chart-container"
    :width="`${controlWidth}px`"
    :max-width="`${controlWidth}px`"
  >
    <div class="feather-chart-title-container">
      <div
        v-if="title"
        class="feather-chart-title"
        :class="fullScreen ? 'fullscreen' : ''"
      >
        {{ title }}
      </div>
      <div class="action-container">
        <FeatherButton
          v-if="!fullScreen"
          v-show="size !== 'xs'"
          icon="Download"
          :download="downloadFileName"
          :href="downloadUrl"
          asAnchor
        >
          <FeatherIcon
            :icon="iconDownload"
            class="download action"
          ></FeatherIcon>
        </FeatherButton>
        <FeatherButton v-if="!fullScreen" icon="Refresh" v-show="size !== 'xs'">
          <FeatherIcon
            :icon="iconRefresh"
            class="refresh action"
            @click="actionRefresh()"
          ></FeatherIcon>
        </FeatherButton>
        <FeatherDropdown
          v-if="isZoomable && !fullScreen"
          class="zoom-menu"
          :right="true"
        >
          <template v-slot:trigger="{ attrs, on }">
            <FeatherButton
              text
              icon="Zoom"
              href="#"
              v-bind="attrs"
              v-on="on"
              class="zoom-trigger"
            >
              <FeatherIcon :icon="iconView" />
            </FeatherButton>
          </template>

          <FeatherDropdownItem
            :selected="zoomLevel === ZoomLevel.ZOOM_IN_2"
            @click="zoomLevel = ZoomLevel.ZOOM_IN_2"
            >Zoom In 2</FeatherDropdownItem
          >
          <FeatherDropdownItem
            :selected="zoomLevel === ZoomLevel.ZOOM_IN_1"
            @click="zoomLevel = ZoomLevel.ZOOM_IN_1"
            >Zoom In 1</FeatherDropdownItem
          >
          <FeatherDropdownItem
            :selected="zoomLevel === ZoomLevel.ZOOM_NONE"
            @click="zoomLevel = ZoomLevel.ZOOM_NONE"
            >Default View</FeatherDropdownItem
          >
          <FeatherDropdownItem
            :selected="zoomLevel === ZoomLevel.ZOOM_OUT_1"
            @click="zoomLevel = ZoomLevel.ZOOM_OUT_1"
            >Zoom Out 1</FeatherDropdownItem
          >
          <FeatherDropdownItem
            :selected="zoomLevel === ZoomLevel.ZOOM_OUT_2"
            @click="zoomLevel = ZoomLevel.ZOOM_OUT_2"
            >Zoom Out 2</FeatherDropdownItem
          >
        </FeatherDropdown>

        <FeatherButton v-if="!fullScreen" icon="More">
          <FeatherIcon
            :icon="iconMore"
            class="more action"
            @click="actionMore()"
          ></FeatherIcon>
        </FeatherButton>
        <FeatherButton
          :class="fullScreen ? 'fullscreen' : ''"
          icon="Fullscreen"
          @click="updateFullScreen"
        >
          <FeatherIcon :icon="iconFullscreen"></FeatherIcon>
        </FeatherButton>
      </div>
      <!-- <div class="fullscreen"> -->
      <!-- </div> -->
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div v-if="!fullScreen" class="feather-chart-filter-container">
      <div class="chart-filter" v-show="size != 'xs'">
        <!--TODO:  Rename this slot to  something more specific -->
        <slot name="type"></slot>
      </div>
      <div class="time-filter" v-show="size != 'xs'">
        <slot name="filter"></slot>
      </div>
    </div>

    <div class="feather-chart-legend-container" v-if="showLegend()">
      <div :id="`legend${id}`" class="legend">
        <div class="legend-item">
          <span class="legend-text">X-Axis Title</span>
        </div>
        <div
          v-for="(item, index) in legend"
          :key="index"
          class="legend-item"
          @click="
            emit('legend', `${id}`, item);
            legendItemClick(
              $event,
              `${id}`,
              item,
              `categorical${(index % 4) + 1}`
            );
          "
          @keydown="
            legendItemClick(
              $event,
              `${id}`,
              item,
              `categorical${(index % 4) + 1}`
            )
          "
          tabindex="0"
        >
          <span class="legend-color" :class="`categorical${(index % 4) + 1}`"
            >*</span
          >
          <span class="legend-text">{{ item }} </span>
        </div>
      </div>
    </div>
    <div class="chart">
      <!-- <div class="draggable-container" :class="{ 'being-dragged': isDragging }"> -->
      <div class="draggable-container">
        <!-- :draggable="true"
        @mousedown.shift.prevent="beginDrag"
        @mousemove="continueDrag"
        @mouseup="endDrag"
        @mouseleave="endDrag"
        :style="{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }" -->
        <Component
          ref="chartRef"
          :is="chartComponent"
          :id="id"
          :type="type"
          :title="title"
          :size="size"
          :data="data"
          :dimensions="sizing"
          :options="options"
          :axes="axes"
        >
        </Component>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FeatherButton } from "@featherds/button";
import { FeatherDropdown, FeatherDropdownItem } from "@featherds/dropdown";
import { FeatherIcon } from "@featherds/icon";
import DownloadFile from "@featherds/icon/action/DownloadFile";
import Refresh from "@featherds/icon/navigation/Refresh";
import MoreVert from "@featherds/icon/navigation/MoreVert";
import View from "@featherds/icon/action/View";
import Fullscreen from "@featherds/icon/navigation/Fullscreen";
import FullscreenExit from "@featherds/icon/navigation/FullscreenExit";
import {
  computed,
  defineAsyncComponent,
  markRaw,
  onBeforeMount,
  onMounted,
  onUnmounted,
  PropType,
  provide,
  reactive,
  ref,
} from "vue";
import {
  FeatherChartType,
  FeatherChartOptions,
  FeatherChartAxes,
  FeatherChartDimensions,
  FeatherChartFlexibleData,
  FeatherChartShirtSize,
  ZoomLevel,
} from "./types";
import { getSizing } from "./Sizing";
// import { useDraggable } from "@featherds/composables/events/Drag";

// const { isDragging, position, beginDrag, continueDrag, endDrag } =
//   useDraggable(true);

const fullScreen = ref(false);
const position = reactive({ x: 0, y: 0 });
provide("position", position);

// #region EMITS
const emit = defineEmits([
  "filter",
  "legend",
  "more-event",
  "refresh-event",
  "theme-change-event",
]);
// #endregion

// #region PROPS
const props = defineProps({
  id: { type: String, required: true },
  size: {
    type: String as PropType<FeatherChartShirtSize>,
    required: false,
    default: function () {
      return "md";
    },
  },
  title: { type: String, required: false },
  type: { type: String as PropType<FeatherChartType>, required: true },
  data: { type: {} as PropType<FeatherChartFlexibleData>, required: true },
  options: {
    type: Object as PropType<FeatherChartOptions>,
    required: false,
    default: function () {
      return {
        units: "units",
        colorScheme: undefined,
        margin: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        },
        xAxis: {
          tickPadding: 0,
          tickRotation: 0,
        },
        yAxis: {
          tickPadding: 0,
          tickRotation: 0,
        },
      };
    },
  },
  axes: {
    type: Object as PropType<FeatherChartAxes>,
    required: false,
    default: function () {
      return {
        x: "",
        y: "",
      };
    },
  },
});

const { id, axes, data, options, size, title, type } = reactive(props);
// #endregion

const zoomLevel = ref<ZoomLevel>(ZoomLevel.ZOOM_NONE);
provide("zoomLevel", zoomLevel);
const isZoomable = computed(() => {
  return (
    // type === "tree-diagram" ||
    type === "force-directed" ||
    type === "radial" ||
    type === "dendrogram" ||
    type === "area" ||
    type === "horizontal-bar" ||
    type === "vertical-bar"
  );
});

import { ComponentPublicInstance } from "vue";

interface ChartComponent extends ComponentPublicInstance {
  draw: () => void;
}

const chartRef = ref<ChartComponent | null>(null);

const chartType = ref(type);
const theme = ref(
  document.querySelector("body")?.classList.contains("dark") ? "dark" : "light"
);
provide("theme", theme);

const legend = reactive([] as string[]);
legend.push("legend");
legend.push("under");
legend.push("construction");
legend.push("ok?");
// legend.push("cat5");
// legend.push("cat6");
// legend.push("cat7");
// legend.push("cat8");
// legend.push("cat9");
// legend.push("cat10cat10cat10cat10cat10");

// const chartRef = ref(null);

// const sizing: FeatherChartDimensions = getSizing(
//   size as FeatherChartShirtSize,
//   type as FeatherChartType
// );
const sizing = reactive(
  getSizing(
    size as FeatherChartShirtSize,
    type as FeatherChartType
  ) as FeatherChartDimensions
);

// MUTATION OBSERVER
const body = document.querySelector("body");
let observations = new Set(); // prevent multiple emits
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.target === body && mutation.attributeName === "class") {
      observations.add(`${(mutation.target as HTMLElement).classList.value}`);
    }
  });
  if (Array.from(observations).length > 0) {
    console.log("class changed", observations);
    theme.value = observations.has("dark") ? "dark" : "light";
    observations.clear();
    emit("theme-change-event", id, data);
  }
});

// DEFAULTS
// TODO:  Setting default on props now; shouldn't need this anymore (But still need this for Radial demo???)'
if (!options.xAxis) {
  options.xAxis = {};
  options.xAxis.tickPadding = 10;
  options.xAxis.tickRotation = 0;
}
if (!options.yAxis) {
  options.yAxis = {};
  options.yAxis.tickPadding = 10;
  options.yAxis.tickRotation = 0;
}
if (options.margin == undefined) {
  options.margin = {
    top: 16,
    right: 24,
    bottom: 16,
    left: 32,
  };
}

let containerWidth = computed(() => {
  const margin = options.margin || { left: 0, right: 0 };
  return sizing.chart.width - (margin.left + margin.right);
});

let containerHeight = computed(() => {
  const margin = options.margin || { top: 0, bottom: 0 };
  return sizing.chart.height - (margin.top + margin.bottom);
});
provide(
  "containerWidth",
  containerWidth
  // sizing.chart.width - (options.margin.left + options.margin.right)
);

provide(
  "containerHeight",
  containerHeight
  // sizing.chart.height - (options.margin.top + options.margin.bottom)
);

const setChartType = (type: FeatherChartType) => {
  chartType.value = type;
};

const updateFullScreen = () => {
  fullScreen.value = !fullScreen.value;
  if (fullScreen.value) {
    sizing.chart.height += 160;
  } else {
    sizing.chart.height -= 160;
  }

  if (chartRef.value && chartRef.value.draw) {
    chartRef.value.draw();
  }

  emit("refresh-event", id, data);
};

const controlWidth = computed((): number => {
  return sizing.control.width;
});

const chartComponent = computed(() => {
  // REDRAWS CHART WHEN CHART TYPE CHANGES
  console.log(`chartComponent CHANGED (type = ${chartType.value})`);
  switch (chartType.value.toLowerCase()) {
    case "area":
      return defineAsyncComponent(() => import("./Area.vue"));

    case "bar":
      return defineAsyncComponent(() => import("./Bar.vue"));

    case "vertical-bar":
      return defineAsyncComponent(() => import("./VerticalBar.vue"));

    case "dendrogram":
      return defineAsyncComponent(() => import("./Dendrogram.vue"));

    case "force-directed":
      return defineAsyncComponent(() => import("./ForceDirected.vue"));

    case "horizontal-bar":
      return defineAsyncComponent(() => import("./HorizontalBar.vue"));

    case "line":
      return defineAsyncComponent(() => import("./Line.vue"));

    case "radial":
      return defineAsyncComponent(() => import("./Radial.vue"));

    case "tree-diagram":
      return defineAsyncComponent(() => import("./TreeDiagram.vue"));

    default:
      throw new Error(`Unhandled chart type: "${chartType.value}"`);
  }
});

// #region LEGEND
const legendItemClick = (
  e: Event,
  chartId: string,
  item: string,
  categoricalStyle: string
) => {
  const { target } = e;

  if (e instanceof KeyboardEvent) {
    console.log(`|${e.key}|`);
    if (e.key !== " ") {
      return;
    }
  }

  if (e instanceof MouseEvent || e instanceof KeyboardEvent) {
    console.log("target", target);
    console.log("instance of KeyboardEvent?", e instanceof KeyboardEvent);
    console.log(`ID: ${chartId} ${item} clicked.`);
    console.log(`enable categorical style: ${categoricalStyle}`);

    document
      .querySelectorAll(`:not(.${chartId}.${categoricalStyle})`)
      .forEach((item: Element) => {
        item.classList.remove("selectedLegend");
      });
    document
      .querySelectorAll(`.${chartId}.${categoricalStyle}`)
      .forEach((item: Element) => {
        item.classList.add("selectedLegend");
      });
  }
};

const showLegend = () => {
  return false;
  // return type === "dendrogram" ||
  //   type === "area" ||
  //   type === "radial" ||
  //   type === "force-directed"
  //   ? false
  //   : true;
};
// #endregion

// #region ACTIONS
const downloadFileName = computed(() => {
  let chartTitle = title || "chart-data";
  let fileName = chartTitle.replaceAll(" ", "-").toLowerCase();
  return `${fileName}.txt`;
});

const downloadUrl = computed(() => {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(data)], { type: "application/json" })
  );
  return url;
});

const actionRefresh = () => {
  // Emit refresh event and let consumer get latest data.
  console.log("FeatherChart refresh-event", id, data);
  emit("refresh-event", id, data);
};

const actionMore = () => {
  console.log("FeatherChart more-event", id, data);
  emit("more-event", id, data);
};

// #endregion

// #region ICONS
const iconDownload = computed(() => {
  return markRaw(DownloadFile);
});

const iconRefresh = computed(() => {
  return markRaw(Refresh);
});

const iconMore = computed(() => {
  return markRaw(MoreVert);
});

const iconView = computed(() => {
  return markRaw(View);
});

const iconFullscreen = computed(() => {
  if (fullScreen.value) {
    return markRaw(Fullscreen);
  } else {
    return markRaw(FullscreenExit);
  }
});

// #endregion

defineExpose({ setChartType });

onBeforeMount(() => {});

onMounted(async () => {
  if (body) {
    observer.observe(body, { attributes: true, attributeFilter: ["class"] });
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";

.feather-chart-container {
  display: inline-block;
  background-color: var($surface);
  padding: 8px;
  overflow: hidden;

  .feather-chart-title-container {
    @include headline3();
    display: flex;
    flex-direction: row;
    margin: 32px 0 32px 32px;
    margin: 0.5rem 0;

    .feather-chart-title {
      display: inline-flex;
      margin-right: auto;
      color: var($primary);
      flex: 0 0 auto;
      flex-shrink: 0;
      overflow: auto;
      &.fullscreen {
        position: absolute;
        z-index: 1;
        border-radius: 0.5rem;
        padding-right: 0.5rem;
        background-color: var($surface);
      }
    }

    .action-container {
      display: inline-flex;
      margin-left: auto;
      button {
        margin: 0;
        .action {
          margin: 0;
        }
      }
      svg {
        user-select: none;
      }
      .fullscreen {
        position: absolute;
        transform: translateX(-2.55em);
        padding: 0;
        margin: 0;
        text-align: right;
        z-index: 1;
      }
    }
  }

  .feather-chart-filter-container {
    @include subtitle2();
    position: relative;
    display: flex;
    flex-direction: row;
    margin: 32px 0 32px 32px;
    margin: 0.5rem 0;

    .time-filter {
      margin: 0;
      margin-left: auto;
      white-space: nowrap;
    }
  }

  .feather-chart-legend-container {
    @include subtitle1();
    display: inline-block;
    width: 100%;
    margin: 0 0 8px 32px;

    div.legend {
      display: flex;
      flex-flow: row wrap;

      div.legend-item {
        display: inline-flex;
        flex: 6rem 0 0;
        margin: 0.125em;
        // padding: 1px 3px 1px 3px;
        color: var($primary-text-on-color);
        border-radius: 5px;
        line-height: 1em;
        font-size: 12px;
        overflow: hidden;
        width: fit-content;

        span.legend-color {
          display: inline-block;
          color: transparent;
          height: 10px;
          width: 10px;
          min-width: 10px;
          min-height: 10px;
          border-radius: 50%;
          margin: 0.125em;
          vertical-align: center;
        }

        span.legend-text {
          display: inline-block;
          color: var($primary-text-on-surface);
          padding-left: 4px;
          overflow: hidden;

          :hover {
            content: "*";
          }
        }
      }

      .categorical1 {
        background-color: var($categorical1);
      }

      .categorical2 {
        background-color: var($categorical2);
      }

      .categorical3 {
        background-color: var($categorical3);
      }

      .categorical4 {
        background-color: var($categorical4);
      }

      .categorical5 {
        background-color: var($categorical5);
      }

      .categorical6 {
        background-color: var($categorical6);
      }

      .categorical7 {
        background-color: var($categorical7);
      }

      .categorical8 {
        background-color: var($categorical8);
      }

      .categorical9 {
        background-color: var($categorical9);
      }

      .categorical10 {
        background-color: var($categorical10);
      }
    }
  }
  .chart {
    background-color: var($surface);
    overflow: hidden;
    // dragging moved to indivual chart svgs
    // .draggable-container {
    //   // user-select: none;
    //   // cursor: grab;
    //   // &.being-dragged {
    //   //   border: 1px dashed var(--feather-high-visibility-text-on-surface);
    //   //   background-color: rgba(
    //   //     var(--feather-high-visibility-text-on-surface-r),
    //   //     var(--feather-high-visibility-text-on-surface-g),
    //   //     var(--feather-high-visibility-text-on-surface-b),
    //   //     0.2
    //   //   );
    //   //   cursor: grabbing;
    //   // }
    // }
    // .coordinates {
    //   display: none;
    //   &.being-dragged {
    //     display: inline;
    //   }
    // }
  }
}
</style>

<!-- unscoped to style children charts -->
<!-- <style lang="scss">
@import "@featherds/styles/themes/variables";
.feather-chart-container {
  .chart {
    rect.selectedLegend {
      stroke: var($primary);
      stroke-width: 5px;
    }
  }
}
</style> -->
