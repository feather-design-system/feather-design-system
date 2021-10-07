declare module "@featherds/badge" {
  import { defineComponent } from "vue";
  const FeatherBadge: ReturnType<typeof defineComponent>;
  const FeatherTextBadge: ReturnType<typeof defineComponent>;

  export { FeatherBadge, FeatherTextBadge };

  export enum TYPES {
    INFO = "info",
    ERROR = "error"
  }
}
