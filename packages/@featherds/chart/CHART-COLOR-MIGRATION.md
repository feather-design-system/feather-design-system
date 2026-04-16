# Chart Color System: Migration from setDynamicScope to D3 Attributes

## Problem

All chart components (Area, Line, VerticalBar, HorizontalBar, ForceDirected, Radial,
Gauge, Dendrogram, TreeDiagram) use scoped SCSS to style D3-created SVG children:

```scss
/* e.g. VerticalBar.vue */
.feather-vertical-bar-svg {
  rect.categorical1 {
    fill: var(vars.$categorical1);
  }
}
```

Vue's scoped CSS works by compiling selectors to include a `data-v-xxxxxxxx` attribute
fingerprint, e.g.:

```css
.feather-vertical-bar-svg[data-v-abc123] rect.categorical1[data-v-abc123] { ... }
```

D3 creates SVG child elements at **runtime**, outside of Vue's template compiler.
Those nodes do **not** receive Vue's `data-v-*` attribute automatically, so the
scoped rules never match them.

### The Workaround: `setDynamicScope`

`chartUtils.ts` exports `setDynamicScope`, which:
1. Queries the parent SVG element from the DOM.
2. Reads the `data-v-*` attribute Vue placed on the root element.
3. Recursively copies that attribute onto every D3-created child element.

```ts
// chartUtils.ts
export const setDynamicScope = (parentSelector: string) => {
  const parentElement = document.querySelector(parentSelector);
  const scopedId = parentElement
    .getAttributeNames()
    .find((attr) => attr.includes("data-v-"))!;
  scopeDynamicElements(parentElement, scopedId);
};
```

Every chart component calls this at the end of `draw()`:

```ts
setDynamicScope(`#${id.value}`);
```

### Why This Is Brittle

- The `data-v-*` hash is build-time generated and can differ across builds.
- A CDN serving a stale CSS file alongside a new JS bundle means the hash mismatches
  and all scoped chart styles silently disappear in production.
- It mutates the live DOM on every redraw, adding unnecessary overhead.
- It is completely invisible to the consumer — there is no API for color control.


## Existing Good Pattern: ForceDirected

`ForceDirected.vue` already solves this correctly for consumer-controlled colors:

```ts
// ForceDirected.vue
const color = computed(() => {
  if (options && options.value.colorScheme) {
    return scaleOrdinal(options.value.colorScheme);   // consumer palette
  }
  return null;
});
```

Then in `draw()`:

```ts
node.attr("class", (d) =>
  options.value.colorScheme
    ? "force-directed-circle"
    : `force-directed-circle categorical${(d as any).group}`   // theme fallback
);

if (color.value != null) {
  node.attr("fill", (d: any) => color.value(d.group));  // D3 attr, not CSS
}
```

Color is resolved and set as a **D3 attribute** directly on the node, so no scoped
CSS or runtime DOM patching is needed.

`Area.vue` has already been partially migrated — scoped selector updated to `:deep()`:

```scss
/* Area.vue — current state */
.feather-area-svg {
  :deep(path.area) {
    fill: var(vars.$categorical1);
  }
}
```

This is a safe interim fix but color is still not consumer-controllable.


## Recommended Fix

### 1. Add `FeatherChartColors` to `types.ts`

```ts
export type FeatherChartColors = {
  /** Ordered palette; replaces colorScheme. Falls back to --feather-categoricalN. */
  palette?: string[];
  /** Per-role overrides */
  areaFill?: string;
  areaStroke?: string;
  lineStroke?: string;
  barFill?: string;
  opacity?: number;
  /** Full control: return a color string or undefined to fall through to palette */
  colorAccessor?: (d: any, index: number, seriesIndex?: number) => string | undefined;
};

export type FeatherChartOptions = {
  units: string;
  ariaSummary?: string;
  colorScheme?: Array<string>;   // kept for backward compat → maps to colors.palette
  colors?: FeatherChartColors;
  class?: string;
  gaugeOrientation?: "right" | "top";
  margin?: { top: number; right: number; bottom: number; left: number };
  xAxis?: FeatherChartAxisOptions;
  yAxis?: FeatherChartAxisOptions;
};
```

### 2. Add `resolveChartColor` to `chartUtils.ts`

```ts
const DEFAULT_PALETTE = Array.from(
  { length: 10 },
  (_, i) => `var(--feather-categorical${i + 1})`
);

export const resolveChartColor = ({
  options,
  datum,
  index,
  seriesIndex = 0,
  role,
}: {
  options?: FeatherChartOptions;
  datum?: any;
  index: number;
  seriesIndex?: number;
  role?: keyof Pick<FeatherChartColors, "areaFill" | "areaStroke" | "lineStroke" | "barFill">;
}): string => {
  const colors = options?.colors;

  const fromAccessor = colors?.colorAccessor?.(datum, index, seriesIndex);
  if (fromAccessor) return fromAccessor;

  if (role && colors?.[role]) return colors[role]!;

  const palette = colors?.palette ?? options?.colorScheme ?? DEFAULT_PALETTE;
  return palette[index % palette.length];
};
```

### 3. Apply in D3 `draw()` — not in CSS

Replace class-based color with direct attribute:

```ts
// Area.vue — after migration
svg
  .append("path")
  .datum(validData)
  .attr("class", "area")
  .attr("fill", resolveChartColor({ options: options.value, index: 0, role: "areaFill" }))
  .attr("stroke", resolveChartColor({ options: options.value, index: 0, role: "areaStroke" }))
  ...
```

```ts
// VerticalBar.vue — per series
rects.attr("fill", (d, i) =>
  resolveChartColor({ options: options.value, datum: d, index: seriesIndex, role: "barFill" })
);
```

### 4. CSS: interaction states only

After migration, scoped CSS per component should only cover hover/focus:

```scss
.feather-area-svg {
  display: block;
  max-width: 100%;
  height: auto;

  :deep(path.area) {
    /* fill is set by D3 attr — no fill rule needed here */
    &:hover { opacity: 0.8; }
  }
}
```


## Migration Checklist

| Component         | `:deep()` selectors (interim only) | `resolveChartColor` in draw (final) | Remove `setDynamicScope` |
|-------------------|:----------------------------------:|:-----------------------------------:|:------------------------:|
| Area              | ✅ interim fix                     | ⬜                                   | ⬜ (commented out)       |
| Line              | ⬜                                 | ⬜                                   | ⬜                       |
| VerticalBar       | ⬜                  | ⬜                           | ⬜                       |
| HorizontalBar     | ⬜                  | ⬜                           | ⬜                       |
| ForceDirected     | ⬜                  | ✅ partial (colorScheme)     | ⬜                       |
| Radial            | ⬜                  | ⬜                           | ⬜                       |
| Gauge             | ⬜                  | ⬜                           | ⬜                       |
| Dendrogram        | ⬜                  | ⬜                           | ⬜                       |
| TreeDiagram       | ⬜                  | ⬜                           | ⬜                       |

Once all rows are complete, `setDynamicScope` and `scopeDynamicElements` can be
deleted from `chartUtils.ts`.
