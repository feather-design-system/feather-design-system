export type ShirtSize = "xs" | "sm" | "md" | "lg" | "xl";

export type FeatherChartType = "bar";

export type FeatherBarChartData = {
  labels: Array<string>;
  datasets: Array<{
    label: string;
    data: Array<string | number>;
    backgroundColor?: string;
  }>;
};

export type FeatherBarChartOptions = {
  responsive?: boolean;
  maintainAspectRation?: boolean;
};

export type FeatherD3Dimensions = {
  height: number;
  width: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }
};

export type FeatherD3Options = {
  units: string;
  class?: "color1" | "color2";
};


// Data can be any array of objects returned from an API or local JSON
export type FeatherD3Data = Array<unknown>;

export interface ICoordinateAxes {
  x: string,
  y: string
}
