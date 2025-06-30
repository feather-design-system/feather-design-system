import { computed, type ComputedRef } from "vue";

import { type StatusType } from "../../shared/types";
// TODO: change to
// import type { StatusType } from "@featherds/shared"; // Adjust the import path as necessary

export interface StatusColors {
  bgColor: string;
  bgColorAlpha: string;
  color: string;
  iconColor: string;
}

const COLOR_TYPE_MAP: Record<string, string> = {
  allocated: "cleared",
  critical: "error",
  down: "error",
  expired: "cleared",
  info: "indeterminate",
  initializing: "cleared",
  normal: "success",
  offline: "cleared",
  online: "cleared",
  unknown: "cleared",
  up: "success",
};

const TEXT_COLOR_OVERRIDES: Record<string, string> = {
  // TODO:  Need to replace with the correct color variable
  warning: "categorical8", //closest to #715300
};

const ICON_COLOR_OVERRIDES: Record<string, string> = {
  // TODO:  Need to replace with the correct color variable
  warning: "categorical8", //closest to #715300
};

function getColorVariable(statusValue: string): string {
  return COLOR_TYPE_MAP[statusValue] || statusValue;
}

function getTextColorVariable(statusValue: string): string {
  const baseColor = getColorVariable(statusValue);
  return TEXT_COLOR_OVERRIDES[baseColor] || baseColor;
}

function getIconColorVariable(statusValue: string): string {
  const baseColor = getColorVariable(statusValue);
  return ICON_COLOR_OVERRIDES[baseColor] || baseColor;
}

export function useStatusColors<T extends string = StatusType>(
  status: ComputedRef<T> | T,
  alpha: number = 0.2
): ComputedRef<StatusColors> {
  return computed(() => {
    const statusValue = typeof status === "string" ? status : status.value;
    const colorVariable = getColorVariable(statusValue);
    const textColorVariable = getTextColorVariable(statusValue);
    const iconColorVariable = getIconColorVariable(statusValue);
    const alphaValue = Math.round(alpha * 100);
    return {
      bgColor: `var(--feather-${colorVariable})`,
      bgColorAlpha: `var(--feather-${colorVariable}-alpha-${alphaValue}, color-mix(in srgb, var(--feather-${colorVariable}) ${alphaValue}%, transparent))`,
      color: `var(--feather-${textColorVariable})`,
      iconColor: `var(--feather-${iconColorVariable})`,
    };
  });
}
