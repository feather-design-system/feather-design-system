declare module "@featherds/dropdown" {
  import { defineComponent } from "vue";
  const FeatherDropdown: ReturnType<typeof defineComponent>;
  const FeatherDropdownItem: ReturnType<typeof defineComponent>;
  export { FeatherDropdown, FeatherDropdownItem };
}
