import type { DefineComponent, ExtractPropTypes } from "vue";
import FeatherPanelBar from "./components/FeatherPanelBar.vue";

type FeatherPanelBarProps = ExtractPropTypes<typeof FeatherPanelBar>;
type FeatherPanelBarEmits = typeof FeatherPanelBar.emit;

export const FeatherExpansionPanel: DefineComponent<
  FeatherPanelBarProps,
  {},
  {},
  {},
  {},
  {},
  {},
  FeatherPanelBarEmits
>;
