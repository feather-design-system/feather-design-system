export type DockLocation = "left" | "right" | "none";

export interface DockConfig {
  id: string;
  location: DockLocation;
  isOpen: boolean;
  isResizing?: boolean;
}

export interface DockLabels {
  expand: string;
  collapse: string;
}

export interface DockProps {
  id: string;
  modelValue?: boolean;
  location?: DockLocation;
  expandedWidth?: string;
  collapsedWidth?: string;
  pushedSelector?: string | string[] | undefined;
  labels?: DockLabels;
  /** Optional tag to use for the dock root element (e.g. 'div', 'nav') */
  rootTag?: string;
}
