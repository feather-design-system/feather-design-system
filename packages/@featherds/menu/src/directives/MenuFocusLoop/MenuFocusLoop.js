export default {
  mounted(el, binding) {
    el.addEventListener("keydown", binding.dir.contentKeyPressed);
  },
  unmounted(el, binding) {
    el.removeEventListener("keydown", binding.dir.contentKeyPressed);
  },
  contentKeyPressed(e) {
    const focusableELements = e.currentTarget.querySelectorAll("li a");
    let index = [].indexOf.call(focusableELements, e.target);
    if (index < 0) {
      return;
    }
    switch (e.keyCode) {
      case 40: // down
        index++;
        if (index === focusableELements.length) {
          index = 0;
        }
        break;
      case 38: // up
        index--;
        if (index === -1) {
          index = focusableELements.length - 1;
        }
        break;
      default:
        return;
    }
    e.preventDefault(); // stop page scroll;
    // we have gotten this far let's focus the element.
    focusableELements[index].focus();
  },
};
