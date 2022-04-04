import { ObjectDirective } from "vue";

export default {
  beforeMount: function (el, binding) {
    const bindingObj = binding as unknown as Record<
      string,
      (e: MouseEvent) => void
    >;
    bindingObj._listener = (e: MouseEvent) => {
      if (!hasClickableParent(el, e)) {
        binding.value(e);
      }
    };
    el.addEventListener("click", bindingObj._listener);
  },
  unmounted: function (el, binding) {
    const bindingObj = binding as unknown as Record<
      string,
      (e: MouseEvent) => void
    >;
    el.removeEventListener("click", bindingObj._listener);
  },
} as ObjectDirective<HTMLElement, (e: MouseEvent) => void>;

const hasClickableParent = (el: HTMLElement, event: MouseEvent) => {
  let current = event.target as HTMLElement;
  const checkEls = [];
  while (current !== el) {
    checkEls.push(current);
    current = current.parentElement as HTMLElement;
  }
  return checkEls.some((element) => {
    if (["A", "BUTTON"].indexOf(element.tagName) > -1) {
      return true;
    }
    if (
      ["link", "button", "checkbox"].indexOf(
        element.getAttribute("role") as string
      ) > -1
    ) {
      return true;
    }

    return false;
  });
};
