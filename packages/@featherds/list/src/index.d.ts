declare module "@featherds/list" {
  import { defineComponent } from "vue";
  const FeatherList: ReturnType<typeof defineComponent>;
  const FeatherListItem: ReturnType<typeof defineComponent>;
  const FeatherListHeader: ReturnType<typeof defineComponent>;
  const FeatherListSeparator: ReturnType<typeof defineComponent>;
  export {
    FeatherList,
    FeatherListItem,
    FeatherListHeader,
    FeatherListSeparator,
  };
}
