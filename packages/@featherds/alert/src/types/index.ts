export type AlertType = "info" | "success" | "warning" | "error";
export type AlertAnchor = "top" | "bottom" | undefined; // being replaced by AlertDockProps.dock

export interface AlertProps {
  message?: string;
  type?: AlertType;
  tag?: string;
  active?: boolean;
  banner?: boolean;
  closeable?: boolean;
  sticky?: boolean;
  anchoredTo?: AlertAnchor;
  onCLose?: () => void;
}

export interface AlertDockProps {
  active?: boolean;
  tag?: string;
  dock: AlertAnchor;
}

export interface DockContext {
  docked: boolean;
  dock: AlertAnchor;
}
