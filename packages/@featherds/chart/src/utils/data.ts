import { extent, max } from "d3-array";
import {
  scaleBand,
  scaleLinear,
  scalePoint,
  scaleTime,
  type ScaleBand,
  type ScaleLinear,
  type ScalePoint,
  type ScaleTime,
} from "d3-scale";
import { timeParse } from "d3-time-format";

export type XType = "time" | "number" | "category";
export type Row = Record<string, unknown>;
export type NormRow = { x: Date | number | string; y: number };

const defaultParseDate = timeParse("%Y-%m-%d");

export const isValidDate = (v: unknown): v is Date =>
  v instanceof Date && !isNaN(v.getTime());

export const parseDateString = (
  v: string,
  parse: (s: string) => Date | null = defaultParseDate
): Date | null => {
  const d = parse(v);
  return d && !isNaN(d.getTime()) ? d : null;
};

export const toFiniteNumber = (v: unknown): number =>
  typeof v === "number" ? v : v == null ? NaN : Number(v);

export const distinctStrings = (
  vals: Array<string | null | undefined>
): string[] =>
  Array.from(
    new Set(
      vals.filter((s): s is string => typeof s === "string" && s.length > 0)
    )
  );

export const inferXType = (
  rows: Row[],
  xKey: string,
  parseDate: (v: string) => Date | null = defaultParseDate
): XType => {
  for (const r of rows) {
    if (!r) continue;
    const v = (r as any)[xKey];
    if (v == null) continue;
    if (v instanceof Date && !isNaN(v.getTime())) return "time";
    if (typeof v === "number" && Number.isFinite(v)) return "number";
    if (typeof v === "string") {
      const d = parseDate(v);
      if (d && !isNaN(d.getTime())) return "time";
      const n = Number(v);
      if (Number.isFinite(n)) return "number";
      return "category";
    }
    return "category";
  }
  return "category";
};

export function normalizeData(
  rows: Row[],
  xKey: string,
  yKey: string,
  xType: XType,
  parseDate: (v: string) => Date | null = defaultParseDate
): NormRow[] {
  return rows.map((r) => {
    const xRaw = (r as any)?.[xKey];
    const yRaw = (r as any)?.[yKey];
    let x: Date | number | string;

    if (xType === "time") {
      if (xRaw instanceof Date && !isNaN(xRaw.getTime())) {
        x = xRaw;
      } else if (typeof xRaw === "string") {
        const d = parseDate(xRaw);
        x = d && !isNaN(d.getTime()) ? d : (null as any);
      } else {
        x = null as any;
      }
    } else if (xType === "number") {
      const n = typeof xRaw === "number" ? xRaw : Number(xRaw);
      x = Number.isFinite(n) ? n : (null as any);
    } else {
      x = xRaw != null ? String(xRaw) : (null as any);
    }

    const y =
      typeof yRaw === "number" ? yRaw : yRaw == null ? NaN : Number(yRaw);

    return { x, y };
  });
}

export function filterValid(rows: NormRow[], xType: XType): NormRow[] {
  if (xType === "time") {
    return rows.filter(
      (d) =>
        d.x instanceof Date && !isNaN(d.x.getTime()) && Number.isFinite(d.y)
    );
  }
  if (xType === "number") {
    return rows.filter(
      (d) =>
        typeof d.x === "number" && Number.isFinite(d.x) && Number.isFinite(d.y)
    );
  }
  // category
  return rows.filter(
    (d) => typeof d.x === "string" && d.x.length > 0 && Number.isFinite(d.y)
  );
}

export const makeLineAreaXScale = (
  xType: XType,
  data: NormRow[],
  range: [number, number]
):
  | ScaleTime<number, number>
  | ScaleLinear<number, number>
  | ScalePoint<string> => {
  if (xType === "time") {
    return scaleTime()
      .domain(extent(data, (d) => d.x as Date) as [Date, Date])
      .range(range);
  }
  if (xType === "number") {
    return scaleLinear()
      .domain(extent(data, (d) => d.x as number) as [number, number])
      .nice()
      .range(range);
  }
  const domain = Array.from(new Set(data.map((d) => d.x as string)));
  return scalePoint().domain(domain).range(range).padding(0.5);
};

export const makeYScale = (
  data: NormRow[],
  range: [number, number]
): ScaleLinear<number, number> => {
  const yMax = max(data, (d) => d.y) ?? 0;
  return scaleLinear().domain([0, yMax]).nice().range(range);
};

// Bar-specific helpers
export const makeBandScale = (
  domain: string[],
  range: [number, number],
  padding = 0.2
): ScaleBand<string> => {
  return scaleBand().domain(domain).range(range).padding(padding);
};
