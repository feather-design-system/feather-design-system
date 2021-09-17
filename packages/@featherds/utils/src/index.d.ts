import { number } from "@featherds/utils/keycodes";

declare module "@featherds/utils/id"{
  export ID;
}

declare module "@featherds/utils/scroll"{
  export Scroll;
}

declare module "@featherds/utils/keys"{
  interface Keys{
    KEYCODES:{
      PAGEUP:number;
      PAGEDOWN:number;
      UP:number;
      DOWN:number;
      LEFT:number;
      RIGHT:number;
      HOME:number;
      END:number;
      ENTER:number;
      SPACE:number;
      ESCAPE:number;
      BACKSPACE:number;
      DELETE:number;
    }
  };
  export Keys;
}

declare module "@featherds/utils/mixin"{
  export  = {translateKey:TranslateMixin};
}



declare interface TranslateMixin{
  props:{
    translationKey:{
      type?:()=>any;
      default?:string;
    };
  };
  methods:{
    translate:(key:string)=>string;
  };
};

declare interface ID{
  getSafeId:(str?:string)=>string;
}


declare interface Scroll{
  toView:(el:HTMLElement, parent:HTMLElement)=>void;
}
