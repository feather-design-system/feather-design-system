import { Component } from "vue";
import { FeatherIcon } from "@featherds/icon";

export type Panel = {
  id: string;
  title?: string;
  component?: Component;
  icon?: typeof FeatherIcon;
  // icon?: typeof FeatherIcon;
  content?: string;
  open?: boolean;
};
