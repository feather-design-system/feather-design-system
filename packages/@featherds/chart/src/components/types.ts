export interface FeatherChartInterface {
  setChartType: (type: FeatherChartType) => void;
}

export type FeatherChartType =
  | "area"
  | "bar"
  | "dendrogram"
  | "donut"
  | "force-directed"
  | "horizontal-bar"
  | "line"
  | "pie"
  | "polar"
  | "radial"
  | "tree-diagram"
  | "vertical-bar";

export type FeatherChartDimensions = {
  control: { width: number; height: number };
  chart: { width: number; height: number };
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};

export type FeatherChartOptions = {
  units: string;
  ariaSummary?: string;
  colorScheme?: Array<string>;
  class?: string;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  xAxis?: {
    tickPadding?: number;
    tickRotation?: number;
  };
  yAxis?: {
    tickPadding?: number;
    tickRotation?: number;
  };
};

export interface FeatherChartAxes {
  x: string;
  y: string;
}

export enum ZoomLevel {
  ZOOM_IN_2 = "zoom-in-2",
  ZOOM_IN_1 = "zoom-in-1",
  ZOOM_NONE = "zoom-none",
  ZOOM_OUT_1 = "zoom-out-1",
  ZOOM_OUT_2 = "zoom-out-2",
}

// export type WithData = { data: Array<any> };
// export type WithNodes = { nodes: Array<any> };
// export type WithLinks = { links: Array<any> };

// type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
//   U[keyof U];

// export type FeatherChartFlexibleData = AtLeastOne<
//   WithData | WithNodes | WithLinks
// >;

export type FeatherChartFlexibleData = { data: Object | Array<Object> };

export type FeatherChartData = {
  data: Array<Object>;
};
export type FeatherChartHierarchicalData = {};

export type FeatherChartAreaData = {
  data: Array<Object>;
};

export type FeatherChartBarData = {
  data: Array<Object>;
};

export type FeatherChartDendrogramData = {
  data: Object;
};

export type FeatherChartTreeDiagramData = {
  data: Object;
};

export type FeatherChartLineData = {
  data: Array<Object>;
};
export type FeatherChartRadialData = {
  data: Object;
};

export type FeatherChartForceDirectedData = {
  data: {
    nodes: Array<{ id: string; group: number }>;
    links: Array<{ source: string; target: string; value: number }>;
  };
};

// export type FeatherChartDataType =
//   | FeatherChartData
//   | FeatherChartHierarchicalData;

// export type FeatherChartDataType = FeatherChartData;

export type FeatherChartShirtSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export type FeatherChartD3Options = {
  units: string;
  ariaSummary?: string;
  class?: "color1" | "color2";
};

export type FeatherChartD3Dimensions = {
  height: number; // hug; probably should remove this.
  width: number; // impacted by shirt size
  control: { width: number; height: number };
  chart: { width: number; height: number };
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};
