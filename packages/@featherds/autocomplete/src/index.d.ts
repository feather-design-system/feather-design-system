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
  IAutocompleteItemType,
  IAutocompleteGridColumn,
  AutocompleteTypes,
} from "./components/types";
