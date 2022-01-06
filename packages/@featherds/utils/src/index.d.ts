declare module "@featherds/utils/id" {
  export function getSafeId(str?: string): string;
}

declare module "@featherds/utils/scroll" {
  export function toView(el: HTMLElement, parent: HTMLElement): void;
}

declare module "@featherds/utils/keys" {
  export interface KEYCODES {
    PAGEUP: number;
    PAGEDOWN: number;
    UP: number;
    DOWN: number;
    LEFT: number;
    RIGHT: number;
    HOME: number;
    END: number;
    ENTER: number;
    SPACE: number;
    ESCAPE: number;
    BACKSPACE: number;
    DELETE: number;
  }
}

declare module "@featherds/utils/mixin" {
  export interface translateKey {
    props: {
      translationKey: {
        type?: () => any;
        default?: string;
      };
    };
    methods: {
      translate: (key: string) => string;
    };
  }
}
