import { ref, inject, computed, onMounted, Ref, ExtractPropTypes } from "vue";
import { ITabVM } from "./TabContainer";

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
} as const;

const useTab = (props: ExtractPropTypes<typeof stockProps>) => {
  const selected = ref(false);
  const tab: Ref<HTMLElement | undefined> = ref();
  const _controls = ref(props.controls);
  const _id = ref(props.id);
  const focus = () => {
    if (tab.value) {
      tab.value.focus();
    }
  };
  const register = inject<(a: ITabVM) => void>("registerTab");
  onMounted(() => {
    if (tab.value && register) {
      const thisEl = tab.value.parentElement;
      const parent =
        thisEl && thisEl.parentElement ? thisEl.parentElement : undefined;
      const childNodes = Array.from(parent ? parent.children : []).filter(
        (el) => el.querySelectorAll("[role=tab]").length
      );
      const index = thisEl ? childNodes.indexOf(thisEl) : -1;
      register({
        el: tab.value,
        focus,
        disabled: props.disabled,
        selected,
        id: _id,
        controls: _controls,
        index: index,
      });
    }
  });

  const attrs = computed(() => {
    return {
      role: "tab",
      ref: "tab",
      tabindex: selected.value ? 0 : -1,
      id: _id.value,
      "aria-selected": selected.value,
      "aria-controls": _controls.value,
      "aria-disabled": props.disabled,
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
