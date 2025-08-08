import type { DefineComponent, ExtractPropTypes } from "vue";
import FeatherDashboardComponent from "./components/FeatherDashboard.vue";

export type DashboardProps = ExtractPropTypes<typeof FeatherDashboardComponent>;
export type DashboardEmits = typeof FeatherDashboardComponent.emit;

export const FeatherDashboard: DefineComponent<
  DashboardProps,
  {},
  {},
  {},
  {},
  {},
  {},
  DashboardEmits
>;
