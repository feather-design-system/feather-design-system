// Note: introduced new types
export type Tooltip = {
  height: number;
  width: number;
};

export type Trigger = {
  height: number;
  width: number;
  left: number;
  top: number;
};

export enum PopoverPlacement {
  top = "top",
  bottom = "bottom",
  left = "left",
  right = "right",
}

export enum PointerAlignment {
  center = "center",
  left = "left",
  right = "right",
}
