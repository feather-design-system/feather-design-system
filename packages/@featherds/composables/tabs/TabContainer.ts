import {
  ref,
  toRef,
  watch,
  provide,
  ExtractPropTypes,
  SetupContext,
  Ref,
} from "vue";
import { getSafeId } from "@featherds/utils/id";
import { Code } from "@featherds/utils/keys";

const model = {
  prop: "modelValue",
  event: "update:modelValue",
};
const emits = {
  "update:modelValue": (_value: number | undefined) => true,
};
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

export interface ITabVM {
  el: HTMLElement;
  focus: () => void;
  disabled: boolean;
  selected: Ref<boolean>;
  id: Ref<string | undefined>;
  controls: Ref<string | undefined>;
  index: number;
}

interface ITab {
  el: HTMLElement;
  focus: () => void;
  disabled: boolean;
  selected: boolean;
  id: string | undefined;
  controls: string | undefined;
  index: number;
}

export interface ITabPanelVM {
  el: HTMLElement | undefined;
  selected: Ref<boolean>;
  id: Ref<string | undefined>;
  tab: Ref<string | undefined>;
  index: number;
}

interface ITabPanel {
  el: HTMLElement | undefined;
  selected: boolean;
  id: string | undefined;
  tab: string | undefined;
  index: number;
}

export interface ITabPair {
  tab?: ITab;
  panel?: ITabPanel;
}

const useTabContainer = (
  props: ExtractPropTypes<typeof stockProps>,
  context: SetupContext<typeof emits>
) => {
  const value = toRef(props, "modelValue");
  const localSelected = ref(props.modelValue);
  const pairs: Ref<ITabPair[]> = ref([]);
  watch(value, (v) => {
    activateIndex(v);
  });

  const handleClick = (evt: MouseEvent) => {
    evt.preventDefault();
    pairs.value.some((pair, i) => {
      if (pair.tab && pair.tab.el.contains(evt.target as Node)) {
        selectIndex(i);
        activateIndex(i);
        return true;
      }
      return false;
    });
  };

  const handleKey = (evt: KeyboardEvent) => {
    const isModifiedKeyPress = (e: KeyboardEvent) => {
      return e.shiftKey || e.ctrlKey || e.metaKey || e.altKey;
    };

    if (isModifiedKeyPress(evt)) {
      return;
    }
    const code = evt.code;
    const stop = (e: Event) => {
      e.stopPropagation();
      e.preventDefault();
    };
    const notDisabledPairs = pairs.value.filter(
      (pair) => pair.tab && !pair.tab.disabled
    );
    const focusedIndex = pairs.value.findIndex(
      (pair) => pair.tab && pair.tab.el.contains(document.activeElement)
    );
    let index = focusedIndex !== -1 ? focusedIndex : localSelected.value;
    const nextKeys = [<string>Code.RIGHT];
    const prevKeys = [<string>Code.LEFT];
    const selectKeys = [<string>Code.ENTER, <string>Code.SPACE];
    if (props.vertical) {
      nextKeys.push(<string>Code.DOWN);
      prevKeys.push(<string>Code.UP);
    }

    if (nextKeys.includes(code)) {
      index++;
      if (index >= notDisabledPairs.length) {
        index = 0;
      }
      stop(evt);
      selectIndex(pairs.value.indexOf(notDisabledPairs[index]));
    } else if (prevKeys.includes(code)) {
      index--;
      if (index < 0) {
        index = notDisabledPairs.length - 1;
      }
      stop(evt);
      selectIndex(pairs.value.indexOf(notDisabledPairs[index]));
    }
    if (selectKeys.includes(code)) {
      activateIndex(index);
    }
  };

  const selectIndex = (index: number) => {
    pairs.value.forEach(function (pair, i) {
      if (index === i && pair.tab) {
        pair.tab.focus();
      }
    });
  };

  const activateIndex = (index: number) => {
    const selected = pairs.value[index];
    //couldnt find selected or tab is disabled
    if (!selected || (selected.tab && selected.tab.disabled)) {
      return;
    }

    pairs.value.forEach((pair, i) => {
      if (pair.tab) {
        pair.tab.selected = index === i;
      }
      if (pair.panel) {
        pair.panel.selected = index === i;
      }
    });
    localSelected.value = index;
    context.emit("update:modelValue", index);
  };

  const registerTab = (tabVM: ITabVM) => {
    const index = tabVM.index;
    if (index > -1) {
      pairs.value[index] = { ...pairs.value[index], tab: tabVM as any as ITab };
      pairs.value = [...pairs.value];
      linkIds();
    }
  };
  provide("registerTab", registerTab);

  const registerPanel = (tabPanelVM: ITabPanelVM) => {
    const index = tabPanelVM.index;
    if (index > -1) {
      pairs.value[index] = {
        ...pairs.value[index],
        panel: tabPanelVM as any as ITabPanel,
      };
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
