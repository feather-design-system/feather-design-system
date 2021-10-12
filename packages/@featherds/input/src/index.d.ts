declare module "@featherds/input" {
  import { defineComponent } from "vue";
  const FeatherInput: ReturnType<typeof defineComponent>;
  const ValidationHeader: ReturnType<typeof defineComponent>;
  export { FeatherInput };
}
