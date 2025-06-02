type BaseSidebarProps = {
  id: string;
  items: unknown;
  pushedSelector?: string | string[] | undefined;
  modelValue?: boolean;
  location?: "left" | "right" | "none";
  expandedWidth?: string;
  collapsedWidth?: string;
  labels?: {
    expand: string;
    collapse: string;
  };
};

export type SidebarProps = BaseSidebarProps & {
  mode?: "single" | "multi";
  menuHeader?: boolean;
  menuFooter?: boolean;
  menuTitle?: string;
  menuIcon?: string;
};

export type SidenavProps = BaseSidebarProps & {};
