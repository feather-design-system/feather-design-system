declare module "@featherds/table" {
  import { defineComponent, Directive } from "vue";
  const FeatherSortHeader: ReturnType<typeof defineComponent>;
  let RowAction: Directive;
  export { FeatherSortHeader, RowAction };

  export enum SORT {
    ASCENDING = "asc",
    DESCENDING = "desc",
    NONE = "none"
  }
}
