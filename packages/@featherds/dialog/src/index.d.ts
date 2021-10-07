declare module "@featherds/dialog" {
  import { defineComponent } from "vue";
  const FeatherDialog: ReturnType<typeof defineComponent>;
  const FocusTrap: ReturnType<typeof defineComponent>;
  const DialogClose: ReturnType<typeof defineComponent>;
  export { FeatherDialog, FocusTrap, DialogClose };
}
