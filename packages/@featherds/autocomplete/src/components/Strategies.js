const createStrategy = (component, type) => {
  if (type.toLowerCase() === TYPES.multi) {
    const setSelectionLimit = (results) => {
      if (
        component.selectionLimit &&
        results.length >= component.selectionLimit
      ) {
        component.selectionLimitReached = true;
      } else {
        component.selectionLimitReached = false;
      }
    };
    return {
      getInitialText() {
        return "";
      },
      handleModelValueChange(v) {
        if (v && v.length) {
          setSelectionLimit(v);
        }
      },
      hasValue(v) {
        return !!(v && v.length);
      },
      selectItem(item) {
        if (
          component.modelValue &&
          component.modelValue.filter(
            (x) => x[component.textProp] === item[component.textProp]
          ).length
        ) {
          return;
        }
        const result = component.modelValue
          ? [...component.modelValue, item]
          : [item];
        component.$emit("update:modelValue", result);
        setSelectionLimit(result);
      },
      removeItem(item) {
        const index = component.modelValue.indexOf(item);
        if (index > -1) {
          const result = component.modelValue.slice(0);
          result.splice(index, 1);
          component.$emit("update:modelValue", result);
          setSelectionLimit(result);
          component.$refs.input.focus();
        }
      },
      clickedItem() {
        component.query = "";
        component.emitSearch();
      },
      handleInputBlur() {},
    };
  }
  if (type.toLowerCase() === TYPES.single) {
    return {
      getInitialText() {
        return component.modelValue
          ? component.modelValue[component.textProp]
          : "";
      },
      handleModelValueChange() {
        //set query to display new value
        component.query = this.getInitialText();
      },
      hasValue(v) {
        return !!v;
      },
      selectItem(item) {
        component.active.row = -1;
        component.forceCloseResults = true;
        if (item && item._new && component.allowNew) {
          component.$emit("new", item._new);
        } else {
          component.$emit("update:modelValue", item);
        }
      },
      removeItem() {},
      clickedItem() {
        component.forceCloseResults = true;
      },
      handleInputBlur() {
        //select active index
        if (component.active.row > -1) {
          const item = component.internalResults[component.active.row];
          if (item && item._new && component.allowNew) {
            component.$emit("new", item._new);
          } else {
            component.$emit("update:modelValue", item);
          }
        }
      },
    };
  }
};

const TYPES = {
  multi: "multi",
  single: "single",
};

export { createStrategy, TYPES };
