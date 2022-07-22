/**
 * KeyboardEvent.code enum
 */
enum Code {
  PAGEUP = "PageUp",
  PAGEDOWN = "PageDown",
  UP = "ArrowUp",
  DOWN = "ArrowDown",
  LEFT = "ArrowLeft",
  RIGHT = "ArrowRight",
  HOME = "Home",
  END = "End",
  ENTER = "Enter",
  SPACE = "Space",
  ESCAPE = "Escape",
  BACKSPACE = "Backspace",
  DELETE = "Delete",
}

/**
 * KeyboardEvent modifier enum
 */
enum Modifier {
  ALT = "altKey",
  CTRL = "ctrlKey",
  META = "metaKey",
  SHIFT = "shiftKey",
}

export { Code, Modifier };
