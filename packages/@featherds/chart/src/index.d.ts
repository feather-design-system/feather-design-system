import { DefineComponent } from "vue";
export const FeatherChart: DefineComponent<
  typeof import("./components/FeatherChart.vue").props
>;
export const FeatherChartJS: DefineComponent<
  typeof import("./components/FeatherChartJS.vue").props
>;
export const FeatherChartD3: DefineComponent<
  typeof import("./components/FeatherChartD3.vue").props
>;
