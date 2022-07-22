import { Ref } from "vue";
import {
  AutocompleteTypes,
  IAutocompleteItemType,
  IStrategyOptions,
  IAutocompleteResultRender,
} from "./types";

const useStrategy = (
  component: IStrategyOptions,
  resultsRender: IAutocompleteResultRender,
  type: AutocompleteTypes,
  emit: ((
    event: "update:modelValue",
    value: IAutocompleteItemType | IAutocompleteItemType[] | undefined
  ) => void) &
    ((event: "new", value: string) => void) &
    ((event: "search", value: string) => void)
) => {
  if (type.toLowerCase() === AutocompleteTypes.multi) {
    const modelValue = component.modelValue as Ref<IAutocompleteItemType[]>;
    const setSelectionLimit = (results: IAutocompleteItemType[]) => {
      if (
        component.selectionLimit.value &&
        results.length >= component.selectionLimit.value
      ) {
        component.selectionLimitReached.value = true;
      } else {
        component.selectionLimitReached.value = false;
      }
    };
    return {
      getInitialText() {
        return "";
      },
      handleModelValueChange(v: IAutocompleteItemType[]) {
        if (v && v.length) {
          setSelectionLimit(v);
        }
      },
      hasValue() {
        return !!(modelValue.value && modelValue.value.length);
      },
      selectItem(item: IAutocompleteItemType) {
        if (
          modelValue.value &&
          modelValue.value.filter(
            (x) =>
              x[component.textProp.value] === item[component.textProp.value]
          ).length
        ) {
          return;
        }
        const result = modelValue.value ? [...modelValue.value, item] : [item];
        emit("update:modelValue", result);
        setSelectionLimit(result);
      },
      removeItem(item: IAutocompleteItemType) {
        const index = modelValue.value.findIndex((el) => {
          if (item[component.textProp.value] === el[component.textProp.value])
            return true;
        });
        if (index > -1) {
          const result = modelValue.value.slice(0);
          result.splice(index, 1);
          emit("update:modelValue", result);
          setSelectionLimit(result);
          component.input.value.focus();
        }
      },
      clickedItem() {
        component.query.value = "";
        component.emitSearch();
      },
      handleInputBlur() {},
    };
  }

  const modelValue = component.modelValue as Ref<IAutocompleteItemType>;
  return {
    getInitialText() {
      return modelValue.value
        ? (modelValue.value[component.textProp.value] as string)
        : "";
    },
    handleModelValueChange() {
      //set query to display new value
      component.query.value = this.getInitialText();
    },
    hasValue() {
      return !!modelValue.value;
    },
    selectItem(item: IAutocompleteItemType) {
      resultsRender.active.row = -1;
      component.forceCloseResults.value = true;
      if (item && item._new && component.allowNew) {
        emit("new", item._new as string);
      } else {
        emit("update:modelValue", item);
      }
    },
    removeItem() {},
    clickedItem() {
      component.forceCloseResults.value = true;
    },
    handleInputBlur() {
      //select active index
      if (resultsRender.active.row > -1) {
        const item = component.internalResults.value[resultsRender.active.row];
        if (item && item._new && component.allowNew) {
          emit("new", item._new as string);
        } else {
          emit("update:modelValue", item);
        }
      }
    },
  };
};
export { useStrategy };
