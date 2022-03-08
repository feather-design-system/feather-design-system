import { DefineComponent } from "vue";
export const FeatherAutocomplete: DefineComponent<
  typeof import("./components/types").props,
  {},
  {},
  {},
  {},
  {},
  {},
  typeof import("./components/types").emits
>;
export {
  IAutocompleteItem,
  IAutocompleteItemType,
  IAutocompleteGridColumn,
  AutocompleteTypes,
} from "./components/types";
