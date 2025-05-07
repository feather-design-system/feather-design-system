import type { DefineComponent, ExtractPropTypes } from "vue";
import FeatherPanelBar from "./components/FeatherPanelBar.vue";
import type { Panel } from "./components/types";

export type PanelBarProps = ExtractPropTypes<typeof FeatherPanelBar>;
export type PanelBarEmits = typeof FeatherPanelBar.emit;

export const FeatherPanelBar: DefineComponent<
  PanelBarProps,
  {},
  {},
  {},
  {},
  {},
  {},
  PanelBarEmits
>;

export type { Panel };
