export type DockLocation = "left" | "right" | "none";

export interface DockConfig {
  id: string;
  location: DockLocation;
  isOpen: boolean;
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
}
