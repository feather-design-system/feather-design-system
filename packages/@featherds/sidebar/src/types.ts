export type SidebarProps = {
  id: string;
  pushedSelector?: string | string[] | undefined;
  modelValue?: boolean;
  location?: "left" | "right" | "none";
  expandedWidth?: string;
  collapsedWidth?: string;
  labels?: {
    expand: string;
    collapse: string;
  };
  items: unknown;
  mode?: "single" | "multi";
  menuHeader?: boolean;
  menuFooter?: boolean;
  menuTitle?: string;
  menuIcon?: string;
};
