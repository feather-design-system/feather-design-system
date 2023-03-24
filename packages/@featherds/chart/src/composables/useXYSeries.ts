/*
 * Composable for handling XY series data in a chart
 * Provides reactive properties for the chart's data, scales, and axes.
 * Supports both line and area charts.
 * Normalizes and filters the data for consistent rendering.
 * Handles date, string, and number types for the x-axis.
 */

import { computed, type Ref } from "vue";
import {
  inferXType,
  normalizeData,
  filterValid,
  makeLineAreaXScale,
  makeYScale,
  type XType,
  type NormRow,
  type Row,
} from "../utils/data";

export interface UseXYSeriesOptions {
  xTypeOverride?: XType;
  parseDate?: (v: string) => Date | null;
}

export const useXYSeries = (
  rows: Ref<Row[]>,
  axes: Ref<{ x: string; y: string }>,
  width: Ref<number>,
  height: Ref<number>,
  opts: UseXYSeriesOptions = {}
) => {
  const xType = computed<XType>(
    () =>
      opts.xTypeOverride ??
      inferXType(rows.value ?? [], axes.value.x, opts.parseDate)
  );

  const normalized = computed<NormRow[]>(() =>
    normalizeData(
      rows.value ?? [],
      axes.value.x,
      axes.value.y,
      xType.value,
      opts.parseDate
    )
  );

  const data = computed<NormRow[]>(() =>
    filterValid(normalized.value, xType.value)
  );

  const xScale = computed(() =>
    makeLineAreaXScale(xType.value, data.value, [0, width.value])
  );
  const yScale = computed(() => makeYScale(data.value, [height.value, 0]));

  return { xType, data, xScale, yScale };
};
