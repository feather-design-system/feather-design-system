// TODO:  Should this file be named code.ts under keyboard subdirectory?
// TODO:  @featherds/utils/keyboard/codes.ts

/**
 * KeyboardEvent.code enum
 */
const CODES = {
  PAGEUP: "PageUp",
  PAGEDOWN: "PageDown",
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  HOME: "Home",
  END: "End",
  ENTER: "Enter",
  SPACE: "Space",
  ESCAPE: "Escape",
  BACKSPACE: "Backspace",
  DELETE: "Delete",
};

// TODO:  MODIFIERS is only used in unit tests to simulate key modifiers
// TODO:  Should this be moved to @featherds\utils\test\keyboard\modifiers.ts?
/**
 * KeyboardEvent modifier enum
 */
const MODIFIERS = {
  ALT: "altKey",
  CTRL: "ctrlKey",
  META: "metaKey",
  SHIFT: "shiftKey",
};

export { CODES, MODIFIERS };
