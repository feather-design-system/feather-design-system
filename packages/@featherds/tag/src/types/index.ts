export type TagType =
  | "success"
  | "normal"
  | "error"
  | "critical"
  | "major"
  | "minor"
  | "warning"
  | "indeterminate"
  | "info"
  | "cleared"
  | "ready"
  | "unknown"
  | "up"
  | "down"
  | "initializing"
  | "expired"
  | "allocated"
  | "online"
  | "offline";

export type TagEmphasis = "high" | "medium" | "low";
export interface TagProps {
  type: TagType;
  emphasis?: TagEmphasis;
  text?: string;
}
