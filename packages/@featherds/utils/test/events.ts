import { DOMWrapper, VueWrapper } from "@vue/test-utils";

// TODO: Type or interface?
// TODO:  Neither is exactly behaving the way I want
type KeyboardMod = "altKey" | "ctrlKey" | "metaKey" | "shiftKey";
interface IKeyboardMod {
  modifier?: "altKey" | "ctrlKey" | "metaKey" | "shiftKey";
}

// TODO:  No need in current tests, but SHOULD handle multiple modifiers (i.e. CTRL+ALT)
// TODO:  modifier should be an array; invoke local function to set multi/single modifiers

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
  modifier?: KeyboardMod | null,
  event: string = "keydown"
): Promise<void> {
  if (modifier) {
    const modifierKey = <string>modifier;
    return target.trigger(event, { code, [modifierKey]: true });
  }
  return target.trigger(event, { code });
}

export { KeyboardMod, IKeyboardMod, triggerKeyboard };
