export enum BadgeTypes {
  info = "info",
  error = "error",
}

export interface IBadge {
  type: BadgeTypes;
  title: string;
}
