import { ref, inject, computed, onMounted } from "vue";

const stockProps = {
  id: {
    type: String,
  },
  tab: {
    type: String,
  },
};

const useTabPanel = (props) => {
  const selected = ref(false);
  const panel = ref();
  const _tab = ref(props.tab);
  const _id = ref(props.id);

  const register = inject("registerPanel");
  let thisEl, parent, index;
  onMounted(() => {
    thisEl = panel.value;
    parent = thisEl && thisEl.parentNode ? thisEl.parentNode : [];
    index = thisEl
      ? Array.prototype.indexOf.call(parent.children, thisEl)
      : null;
    register({
      selected,
      id: _id,
      tab: _tab,
      el: panel.value,
      index: index,
    });
  });

  const attrs = computed(() => {
    return {
      role: "tabpanel",
      id: _id.value,
      ref: "panel",
      tabindex: "0",
      "aria-expanded": selected.value ? "true" : "false",
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
