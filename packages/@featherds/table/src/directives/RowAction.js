export default {
  beforeMount: function (el, binding) {
    binding._listener = (e) => {
      if (!hasClickableParent(el, e)) {
        binding.value(e);
      }
    };
    el.addEventListener("click", binding._listener);
  },
  unmounted: function (el, binding) {
    el.removeEventListener("click", binding._listener);
  },
};

const hasClickableParent = (el, event) => {
  let current = event.target;
  const checkEls = [];
  while (current !== el) {
    checkEls.push(current);
    current = current.parentNode;
  }
  return checkEls.some((element) => {
    if (["A", "BUTTON"].indexOf(element.tagName) > -1) {
      return true;
    }
    if (
      ["link", "button", "checkbox"].indexOf(element.getAttribute("role")) > -1
    ) {
      return true;
    }

    return false;
  });
};
