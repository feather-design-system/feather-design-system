import { DOMWrapper, VueWrapper } from "@vue/test-utils";

// TODO:  This is not exactly doing what I want
interface IKeyboardMod {
  modifier?: "altKey" | "ctrlKey" | "metaKey" | "shiftKey";
}

/**
 * Trigger a keyboard event
 * @param target HTMLElement that is the target of the keyboard event
 * @param code the KeyboardEvent.code
 * @param modifier optional modifier key
 * @param event defaults to "keydown" event, but can be overridden
 * @returns DOMWrapper<HTMLElement>
 */
// modifier?: "altKey" | "ctrlKey" | "metaKey" | "shiftKey" | null,
function triggerKeyboard(
  target: DOMWrapper<Element> | VueWrapper<any>,
  code: string,
  modifier?: IKeyboardMod | null,
  event: string = "keydown"
): Promise<void> {
  if (modifier) {
    const modifierKey = <string>modifier;
    return target.trigger(event, { code, [modifierKey]: true });
  }
  return target.trigger(event, { code });
}

export { IKeyboardMod, triggerKeyboard };
