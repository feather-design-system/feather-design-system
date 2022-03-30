import { ref, inject, computed, onMounted, Ref, ExtractPropTypes } from "vue";
import { ITabPanelVM } from "./TabContainer";

const stockProps = {
  id: {
    type: String,
  },
  tab: {
    type: String,
  },
} as const;

const useTabPanel = (props: ExtractPropTypes<typeof stockProps>) => {
  const selected = ref(false);
  const panel: Ref<HTMLElement | undefined> = ref();
  const _tab = ref(props.tab);
  const _id = ref(props.id);

  const register = inject<(a: ITabPanelVM) => void>("registerPanel");
  onMounted(() => {
    if (register) {
      const thisEl = panel.value;
      const parent =
        thisEl && thisEl.parentElement ? thisEl.parentElement : undefined;
      const index = thisEl
        ? Array.from(parent ? parent.children : []).indexOf(thisEl)
        : -1;
      register({
        selected,
        id: _id,
        tab: _tab,
        el: panel.value,
        index: index,
      });
    }
  });

  const attrs = computed(() => {
    return {
      role: "tabpanel",
      id: _id.value,
      ref: "panel",
      tabindex: "0",
      "aria-expanded": selected.value,
      "aria-labelledby": _tab.value,
      "data-ref-id": "feather-tab-panel",
    };
  });

  return {
    selected,
    attrs,
    panel,
  };
};
export { useTabPanel, stockProps };
