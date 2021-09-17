declare module "@featherds/chips" {
  import { defineComponent } from "vue";
  const FeatherChip: ReturnType<typeof defineComponent>;
  const FeatherChipList: ReturnType<typeof defineComponent>;
  export { FeatherChip, FeatherChipList };
}
