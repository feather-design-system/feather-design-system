declare module "@featherds/chips" {
  import { DefineComponent } from "vue";
  const FeatherChip: DefineComponent<
    typeof import("./components/FeatherChip.vue").props
  >;
  const FeatherChipList: DefineComponent<
    typeof import("./components/FeatherChipList.vue").props
  >;
  const BaseChip: DefineComponent<
    typeof import("./components/base/Chip.vue").props
  >;
  const BaseChipLabel: DefineComponent;
  const BaseChipPreIcon: DefineComponent;
  export {
    FeatherChip,
    FeatherChipList,
    BaseChip,
    BaseChipLabel,
    BaseChipPreIcon,
  };
}
