export interface FeatherChartInterface {
  setChartType: (type: FeatherChartType) => void;
}

export type FeatherChartType =
  | "area"
  | "bar"
  | "dendrogram"
  | "donut"
  | "horizontal-bar"
  | "line"
  | "pie"
  | "polar"
  | "radial"
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

export type FeatherChartData = Array<unknown>;
export type FeatherChartHierarchicalData = {};

export type FeatherChartDataType =
  | FeatherChartData
  | FeatherChartHierarchicalData;

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
