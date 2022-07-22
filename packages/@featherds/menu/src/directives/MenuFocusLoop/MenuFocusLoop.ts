interface IBindingModifier {
  dir: {
    contentKeyPressed: () => void;
  };
}
import { CODES } from "@featherds/utils/keyboardevents";

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
    // TODO:  NO direct test of this except to check for errors in
    // TODO:  FeatherMegaMenu and DrawerTabContinue
    // switch (e.keyCode) {
    switch (e.code) {
      // case 40: // down
      case CODES.DOWN:
        index++;
        if (index === focusableELements.length) {
          index = 0;
        }
        break;
      // case 38: // up
      case CODES.UP:
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
