import { ref, toRef, watch, provide } from "vue";
import { getSafeId } from "@featherds/utils/id";
import { KEYCODES } from "@featherds/utils/keys";

const model = {
  prop: "modelValue",
  event: "update:modelValue",
};
const emits = ["update:modelValue"];
const stockProps = {
  modelValue: {
    type: Number,
    default: 0,
  },
  vertical: {
    type: Boolean,
    default: true,
  },
};

const useTabContainer = (props, context) => {
  const value = toRef(props, "modelValue");
  const localSelected = ref(props.modelValue);
  const pairs = ref([]);
  watch(value, (v) => {
    activateIndex(v);
  });

  const handleClick = (evt) => {
    evt.preventDefault();
    pairs.value.some((pair, i) => {
      if (pair.tab.el.contains(evt.target)) {
        selectIndex(i);
        activateIndex(i);
        return true;
      }
      return false;
    });
  };

  const handleKey = (evt) => {
    const isModifiedKeyPress = (e) => {
      return e.shiftKey || e.ctrlKey || e.metaKey || e.altKey;
    };

    if (isModifiedKeyPress(evt)) {
      return;
    }
    const key = evt.keyCode;
    const stop = (e) => {
      e.stopPropagation();
      e.preventDefault();
    };
    const notDisabledPairs = pairs.value.filter((pair) => !pair.tab.disabled);
    const focusedIndex = pairs.value.findIndex((pair) =>
      pair.tab.el.contains(document.activeElement)
    );
    let index = focusedIndex !== -1 ? focusedIndex : localSelected.value;
    const nextKeys = [KEYCODES.RIGHT];
    const prevKeys = [KEYCODES.LEFT];
    const selectKeys = [KEYCODES.ENTER, KEYCODES.SPACE];
    if (props.vertical) {
      nextKeys.push(KEYCODES.DOWN);
      prevKeys.push(KEYCODES.UP);
    }

    if (nextKeys.indexOf(key) > -1) {
      index++;
      if (index >= notDisabledPairs.length) {
        index = 0;
      }
      stop(evt);
      selectIndex(pairs.value.indexOf(notDisabledPairs[index]));
    } else if (prevKeys.indexOf(key) > -1) {
      index--;
      if (index < 0) {
        index = notDisabledPairs.length - 1;
      }
      stop(evt);
      selectIndex(pairs.value.indexOf(notDisabledPairs[index]));
    }
    if (selectKeys.indexOf(key) > -1) {
      activateIndex(index);
    }
  };

  const selectIndex = (index) => {
    pairs.value.forEach(function (pair, i) {
      if (index === i) {
        pair.tab.focus();
      }
    });
  };

  const activateIndex = (index) => {
    const selected = pairs.value[index];
    //couldnt find selected or tab is disabled
    if (!selected || selected.tab.disabled) {
      return;
    }

    pairs.value.forEach((pair, i) => {
      pair.tab.selected = index === i;
      if (pair.panel) {
        pair.panel.selected = index === i;
      }
    });
    localSelected.value = index;
    context.emit("update:modelValue", index);
  };

  const registerTab = (tabVM) => {
    const index = tabVM.index;
    if (index > -1) {
      pairs.value[index] = { ...pairs.value[index], tab: tabVM };
      pairs.value = [...pairs.value];
      linkIds();
    }
  };
  provide("registerTab", registerTab);

  const registerPanel = (tabPanelVM) => {
    const index = tabPanelVM.index;
    if (index > -1) {
      pairs.value[index] = { ...pairs.value[index], panel: tabPanelVM };
      pairs.value = [...pairs.value];
      linkIds();
    }
  };

  provide("registerPanel", registerPanel);

  const linkIds = () => {
    pairs.value.forEach(({ tab, panel }, index) => {
      if (panel && tab) {
        const tabId = tab.id || getSafeId("tab");
        const panelId = tab.controls || getSafeId("panel");
        tab.controls = panelId;
        tab.id = tabId;
        panel.tab = tabId;
        panel.id = panelId;
      }
      if (index === localSelected.value) {
        if (panel) {
          panel.selected = true;
        }
        if (tab) {
          tab.selected = true;
        }
      }
    });
  };

  const listeners = {
    click: handleClick,
    keydown: handleKey,
  };
  const attrs = {
    role: "tablist",
  };

  return {
    listeners,
    attrs,
    selected: localSelected,
    pairs, //feather tab container watches this
  };
};

export { useTabContainer, stockProps, model, emits };
