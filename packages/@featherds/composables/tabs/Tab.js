import { ref, inject, computed, onMounted } from "vue";

const stockProps = {
  id: {
    type: String,
  },
  controls: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
};

const useTab = (props) => {
  const selected = ref(false);
  const tab = ref();
  const _controls = ref(props.controls);
  const _id = ref(props.id);
  const focus = () => {
    tab.value.focus();
  };
  const register = inject("registerTab");
  let thisEl, parent, childNodes, index;
  onMounted(() => {
    thisEl = tab.value.parentElement;
    parent = (thisEl && thisEl.parentNode) ? thisEl.parentNode : [];
    childNodes = [].filter.call(parent.children, function (el) {
      return el.querySelectorAll("[role=tab]").length;
    });
    index = thisEl ? [].indexOf.call(childNodes, thisEl) : null;
    register({
      el: tab.value,
      focus,
      disabled: props.disabled,
      selected,
      id: _id,
      controls: _controls,
      index: index,
    });
  });

  const attrs = computed(() => {
    return {
      role: "tab",
      ref: "tab",
      tabindex: selected.value ? 0 : -1,
      id: _id.value,
      "aria-selected": selected.value ? "true" : "false",
      "aria-controls": _controls.value,
      "aria-disabled": props.disabled ? "true" : "false",
      "data-ref-id": "feather-tab",
    };
  });
  return {
    selected,
    attrs,
    tab,
  };
};
export { useTab, stockProps };
