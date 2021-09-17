declare module "@featherds/menu" {
  import { defineComponent, Directive, } from "vue";
  const FeatherMenu: ReturnType<typeof defineComponent>;
  let MenuFocusLoop: Directive;
  export {
    FeatherMenu,
    MenuFocusLoop
  };
}
