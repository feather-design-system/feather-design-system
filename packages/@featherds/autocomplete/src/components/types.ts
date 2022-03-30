import { Ref, PropType } from "vue";
import HighlightProps from "./Highlight/HighlightProps";
import { InputWrapperProps, InputSubTextProps } from "@featherds/input-helper";
interface IAutocompleteItem extends IAutocompleteItemType {
  _new?: string;
  _text: string;
  _pre?: IAutocompleteChipIcon;
}
interface IAutocompleteItemType {
  [k: string]: unknown;
}

interface IAutocompleteGridColumn {
  prop: keyof IAutocompleteItemType;
  title: string;
  align?: "right" | "left" | "center";
}

interface IAutocompleteResultRender {
  reset: () => void;
  handleKeyPress: (
    e: KeyboardEvent,
    internalResults: IAutocompleteItemType[]
  ) => boolean;
  active: {
    row: number;
    col?: number;
  };
  first: () => void;
}

export enum AutocompleteTypes {
  multi = "multi",
  single = "single",
}
interface IStrategyOptions {
  selectionLimit: Ref<number>;
  selectionLimitReached: Ref<boolean>;
  modelValue: Ref<IAutocompleteItemType | IAutocompleteItemType[]>;
  textProp: Ref<string>;
  input: Ref<HTMLInputElement>;
  query: Ref<string>;
  emitSearch: () => void;
  forceCloseResults: Ref<boolean>;
  allowNew: Ref<boolean>;
  internalResults: Ref<IAutocompleteItemType[]>;
}

interface IAutocompleteChipIcon {
  icon: unknown;
  title: string;
}

export type {
  IStrategyOptions,
  IAutocompleteGridColumn,
  IAutocompleteItemType,
  IAutocompleteItem,
  IAutocompleteChipIcon,
  IAutocompleteResultRender,
};

export const LABELS = {
  noResults: "No results found",
  minChar: "Enter ${min} characters to search",
  clear: "Clear value",
  selectionLimit: "Selection limit reached",
  new: "New",
  remove: "Remove",
};
export const props = {
  id: {
    type: String,
  },
  modelValue: {
    type: [Array, Object] as PropType<
      IAutocompleteItemType[] | IAutocompleteItemType
    >,
  },
  results: {
    type: Array as PropType<IAutocompleteItemType[]>,
    default: () => [],
  },
  textProp: {
    type: String as unknown as PropType<keyof IAutocompleteItemType>,
    default: "_text",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  minChar: {
    type: Number,
    default: 0,
  },
  allowNew: {
    type: Boolean,
    default: false,
  },
  selectionLimit: {
    type: Number,
  },
  newMatcher: {
    type: Function,
    default: (
      item: IAutocompleteItemType,
      query: string,
      comp: { textProp: string }
    ) => {
      return (
        (item[comp.textProp] as string).toString().toLowerCase() ===
        query.toLowerCase()
      );
    },
  },
  type: {
    type: String as PropType<keyof typeof AutocompleteTypes>,
    required: true,
    validator: (v: keyof typeof AutocompleteTypes) => {
      // The value must match either
      return !!AutocompleteTypes[v];
    },
  },
  labels: {
    type: Object as PropType<Partial<typeof LABELS>>,
    default() {
      return LABELS;
    },
  },
  gridConfig: {
    type: Array as PropType<IAutocompleteGridColumn[]>,
  },
  schema: {
    type: Object,
    required: false,
  },
  ...HighlightProps,
  ...InputSubTextProps,
  ...InputWrapperProps,
} as const;

export const emits = {
  "update:modelValue": (
    value: IAutocompleteItemType | IAutocompleteItemType[] | undefined
  ) => true,
  new: (value: string) => true,
  search: (value: string) => true,
};
