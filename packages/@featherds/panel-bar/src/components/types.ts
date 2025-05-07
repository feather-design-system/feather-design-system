import { Component } from "vue";
import { FeatherIcon } from "@featherds/icon";

export type Panel = {
  id: string;
  title?: string;
  icon?: typeof FeatherIcon;
  content?: string;
  component?: Component;
  componentProps?: Record<string, unknown>;
  open?: boolean;
  onClick?: () => void;
};
