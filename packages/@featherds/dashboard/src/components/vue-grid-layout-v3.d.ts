declare module "vue-grid-layout-v3" {
  import { DefineComponent } from "vue";

  interface GridLayoutItem {
    x: number;
    y: number;
    w: number;
    h: number;
    i: string;
    static?: boolean;
    minW?: number;
    maxW?: number;
    minH?: number;
    maxH?: number;
    moved?: boolean;
    isDraggable?: boolean;
    isResizable?: boolean;
    component?: DefineComponent;
    props?: Record<string, any>[];
    content: string;
  }

  interface GridLayoutProps {
    layout: GridLayoutItem[];
    colNum?: number;
    rowHeight?: number;
    maxRows?: number;
    margin?: [number, number];
    isDraggable?: boolean;
    isResizable?: boolean;
    isMirrored?: boolean;
    autoSize?: boolean;
    verticalCompact?: boolean;
    preventCollision?: boolean;
    useCssTransforms?: boolean;
    responsive?: boolean;
    responsiveLayouts?: Record<string, GridLayoutItem[]>;
    breakpoints?: Record<string, number>;
    cols?: Record<string, number>;
  }

  interface GridItemProps {
    x: number;
    y: number;
    w: number;
    h: number;
    i: string;
    static?: boolean;
    minW?: number;
    maxW?: number;
    minH?: number;
    maxH?: number;
    isDraggable?: boolean;
    isResizable?: boolean;
    dragIgnoreFrom?: string;
    dragAllowFrom?: string;
    resizeIgnoreFrom?: string;
  }

  export const GridLayout: DefineComponent<GridLayoutProps>;
  export const GridItem: DefineComponent<GridItemProps>;
}
