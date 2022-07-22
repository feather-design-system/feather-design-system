interface IBindingModifier {
  dir: {
    contentKeyPressed: () => void;
  };
}
import { Code } from "@featherds/utils/keys";

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
    switch (e.code) {
      case Code.DOWN:
        index++;
        if (index === focusableELements.length) {
          index = 0;
        }
        break;
      case Code.UP:
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
