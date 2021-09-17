declare module "@featherds/footer" {
  import { defineComponent } from "vue";
  const FeatherFooter: ReturnType<typeof defineComponent>;
  const FeatherFooterLink: ReturnType<typeof defineComponent>;
  const FeatherFooterTelephone: ReturnType<typeof defineComponent>;
  export { FeatherFooter, FeatherFooterTelephone, FeatherFooterLink };
}
