import { DefineComponent } from "vue";

export interface ToggleButton {
  id: String;
  label?: String;
  icon?: DefineComponent;
  disabled?: boolean;
}
