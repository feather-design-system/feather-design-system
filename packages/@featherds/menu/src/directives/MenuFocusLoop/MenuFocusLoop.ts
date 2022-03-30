interface IBindingModifier {
  dir: {
    contentKeyPressed: () => void;
  };
}

export default {
  mounted(el: HTMLElement, binding: IBindingModifier) {
    el.addEventListener("keydown", binding.dir.contentKeyPressed);
  },
  unmounted(el: HTMLElement, binding: IBindingModifier) {
    el.removeEventListener("keydown", binding.dir.contentKeyPressed);
  },
  contentKeyPressed(e: KeyboardEvent) {
    const focusableELements = (e.currentTarget as HTMLElement).querySelectorAll(
      "li a"
    );
    let index = ([] as HTMLElement[]).indexOf.call(
      focusableELements,
      e.target as unknown as HTMLElement
    );
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
    (focusableELements[index] as HTMLElement).focus();
  },
};
