import { Component } from "vue";
import { FeatherIcon } from "@featherds/icon";

export type MenuListBase = {
  id: string;
};
export type MenuListHeader = MenuListBase & {
  type: "header";
  title: string;
  onClick?: () => void;
};

export type MenuListItem = MenuListBase & {
  type: "item";
  title: string;
  icon?: typeof FeatherIcon;
  open?: boolean;
  content?: string;
  href?: string;
  target?: string;
  component?: Component;
  componentProps?: Record<string, unknown>;
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
  scrollTarget?: string;
  scrollTargetClass?: string;
};

export type MenuListSeparator = MenuListBase & {
  type: "separator";
};

// Union type combining all the variants
export type MenuListEntry = MenuListHeader | MenuListSeparator | MenuListItem;
