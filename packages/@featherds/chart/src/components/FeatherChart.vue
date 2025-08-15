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
          :icon="fullScreen ? 'Show Heading' : 'Hide Heading'"
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

    <div class="chart">
      <!-- <div class="draggable-container" :class="{ 'being-dragged': isDragging }"> -->
      <div
        class="draggable-container"
        @wheel.prevent="onWheel"
        @keydown="onKeyDown"
        tabindex="0"
      >
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
          :options="mergedOptions"
          :axes="axes"
        >
        </Component>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  ComponentPublicInstance,
  defineAsyncComponent,
  markRaw,
  onBeforeMount,
  onMounted,
  onUnmounted,
  // PropType,
  provide,
  reactive,
  ref,
  watch,
} from "vue";
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
  FeatherChartType,
  FeatherChartOptions,
  FeatherChartAxes,
  FeatherChartDimensions,
  FeatherChartFlexibleData,
  FeatherChartShirtSize,
  ZoomLevel,
} from "./types";
import { getSizing } from "./Sizing";
import { useWheelZoom } from "@featherds/composables/events/WheelZoom";

// #region EMITS
const emit = defineEmits(["filter", "more", "refresh"]);
// #endregion

// #region PROPS
const props = withDefaults(
  defineProps<{
    id: string;
    size?: FeatherChartShirtSize;
    title?: string;
    type: FeatherChartType;
    data: FeatherChartFlexibleData;
    options?: FeatherChartOptions;
    axes?: FeatherChartAxes;
  }>(),
  {
    size: "md",
    axes: () => ({ x: "", y: "" }),
    options: () => undefined as unknown as FeatherChartOptions,
  }
);

// Must define DEFAULT_OPTIONS here due to "no hoisting in props"
const DEFAULT_OPTIONS: FeatherChartOptions = {
  units: "units",
  colorScheme: undefined,
  margin: { top: 20, right: 20, bottom: 20, left: 20 },
  xAxis: { tickPadding: 6, tickRotation: 345 },
  yAxis: { tickPadding: 6, tickRotation: 0 },
};

const { id, axes, data, options, size, title, type } = reactive(props);

const mergedOptions = computed(() => {
  const userOptions = (options as FeatherChartOptions) || {};
  return {
    ...DEFAULT_OPTIONS,
    ...userOptions,
  };
});
// #endregion
const fullScreen = ref(false);
const position = reactive({ x: 0, y: 0 });

const isZoomable = computed(() => {
  return (
    type === "tree-diagram" ||
    type === "force-directed" ||
    type === "radial" ||
    type === "dendrogram" ||
    type === "area" ||
    type === "horizontal-bar" ||
    type === "vertical-bar"
  );
});

const {
  step,
  scale: zoomScale,
  onWheel,
  onKeyDown,
} = useWheelZoom({
  enabled: isZoomable,
});

const zoomLevel = computed<ZoomLevel>(() => {
  // map step range to your existing ZoomLevel classes (kept for CSS)
  if (step.value <= -2) return ZoomLevel.ZOOM_IN_2;
  if (step.value === -1) return ZoomLevel.ZOOM_IN_1;
  if (step.value === 0) return ZoomLevel.ZOOM_NONE;
  if (step.value === 1) return ZoomLevel.ZOOM_OUT_1;
  return ZoomLevel.ZOOM_OUT_2;
});

interface ChartComponent extends ComponentPublicInstance {
  draw: () => void;
}

const chartRef = ref<ChartComponent | null>(null);

const chartType = ref(type);

const sizing = reactive(
  getSizing(
    size as FeatherChartShirtSize,
    type as FeatherChartType
  ) as FeatherChartDimensions
);

let containerWidth = computed(() => {
  const margin = options.margin || { left: 0, right: 0 };
  return sizing.chart.width - (margin.left + margin.right);
});

let containerHeight = computed(() => {
  const margin = options.margin || { top: 0, bottom: 0 };
  return sizing.chart.height - (margin.top + margin.bottom);
});

const setChartType = (type: FeatherChartType) => {
  chartType.value = type;
};

const updateFullScreen = () => {
  fullScreen.value = !fullScreen.value;
  // if (fullScreen.value) {
  //   sizing.chart.height += 160;
  // } else {
  //   sizing.chart.height -= 160;
  // }

  if (chartRef.value && chartRef.value.draw) {
    chartRef.value.draw();
  }

  emit("refresh", id, data);
};

const controlWidth = computed((): number => {
  return sizing.control.width;
});

const componentMap: Record<string, () => Promise<any>> = {
  area: () => import("./Area.vue"),
  bar: () => import("./Bar.vue"),
  "vertical-bar": () => import("./VerticalBar.vue"),
  dendrogram: () => import("./Dendrogram.vue"),
  "force-directed": () => import("./ForceDirected.vue"),
  "horizontal-bar": () => import("./HorizontalBar.vue"),
  line: () => import("./Line.vue"),
  radial: () => import("./Radial.vue"),
  "tree-diagram": () => import("./TreeDiagram.vue"),
};

const chartComponent = computed(() => {
  const key = chartType.value.toLowerCase();
  const loader = componentMap[key];
  if (!loader) {
    console.error(`Unknown chart type: ${key}`);
    return null;
  }
  return defineAsyncComponent(loader);
});

// #region ACTIONS
const downloadFileName = computed(() => {
  let chartTitle = title || `${chartType.value} chart-data`;
  let fileName = chartTitle.replaceAll(" ", "-").toLowerCase();
  return `${fileName}.json`;
});

const downloadUrl = ref<string>("");

const buildDownloadUrl = () => {
  if (downloadUrl.value) {
    // Revoke the previous URL
    URL.revokeObjectURL(downloadUrl.value);
  }
  // Create a new URL
  try {
    downloadUrl.value = URL.createObjectURL(
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
  } catch (error) {
    console.error("Error creating download URL:", error);
    downloadUrl.value = "";
  }
};

// Build initially and whenever "data" changes
watch(
  () => data,
  () => buildDownloadUrl(),
  { deep: true, immediate: true }
);

const actionRefresh = () => {
  // Emit refresh event and let consumer get latest data.
  emit("refresh", id, data);
};

const actionMore = () => {
  emit("more", id, data);
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

// #region PROVIDE
provide("position", position);
provide("zoomLevel", zoomLevel);
provide("zoomScale", zoomScale);
provide("containerWidth", containerWidth);
provide("containerHeight", containerHeight);
// #endregion

defineExpose({ setChartType });

onBeforeMount(() => {});

onMounted(async () => {});

onUnmounted(() => {
  // Revoke the previous URL - (avoids memory leaks).
  if (downloadUrl.value) URL.revokeObjectURL(downloadUrl.value);
});
</script>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/mixins/typography" as typo;

.feather-chart-container {
  background-color: var(vars.$surface);
  padding: 8px;
  overflow: hidden;
  container-name: chart-container;
  container-type: inline-size;
  width: 100%;

  .feather-chart-title-container {
    @include typo.headline3();
    display: flex;
    flex-direction: row;
    margin: 32px 0 32px 32px;
    margin: 0.5rem 0;

    .feather-chart-title {
      display: inline-flex;
      margin-right: auto;
      color: var(vars.$primary);
      flex: 0 0 auto;
      flex-shrink: 0;
      overflow: auto;
      &.fullscreen {
        position: absolute;
        z-index: 1;
        border-radius: 0.5rem;
        padding-right: 0.5rem;
        background-color: var(vars.$surface);
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
    @include typo.subtitle2();
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
  .chart {
    background-color: var(vars.$surface);
    overflow: hidden;
  }
}

@container chart-container (max-width: 300px) {
  .action-container {
    &::before {
      content: "!";
      position: relative;
      color: red;
    }
  }
}
</style>
