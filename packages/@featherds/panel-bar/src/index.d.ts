import { DefineComponent } from "vue";

export type PanelBarProps =
  typeof import("./components/FeatherPanelBar.vue").props;
export type PanelBarEmits =
  typeof import("./components/FeatherPanelBar.vue").emits;

export const FeatherPanelBar: DefineComponent<
  typeof PanelBarProps,
  {},
  {},
  {},
  {},
  {},
  {},
  typeof PanelBarEmits
>;

export type { Panel } from "./components/types";

// import type { DefineComponent, ExtractPropTypes } from "vue";
// // import FeatherPanelBar from "./components/FeatherPanelBar.vue";
// import type { Panel } from "./components/types";

// export type PanelBarProps = ExtractPropTypes<typeof FeatherPanelBar>;
// export type PanelBarEmits = typeof FeatherPanelBar.emits;

// export const FeatherPanelBar: DefineComponent<
//   PanelBarProps,
//   {},
//   {},
//   {},
//   {},
//   {},
//   {},
//   PanelBarEmits
// >;

// export type { Panel };
