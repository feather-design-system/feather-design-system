/**
 * Sets a dynamic scope ID on a specified parent element and its child elements.
 * The scope ID is determined by finding an attribute that includes "data-v-" on the parent element.
 * This function is the entry point for applying scoped IDs dynamically.
 *
 * @param {string} parentSelector - The CSS selector for the parent element to which the dynamic scope ID will be applied.
 */
export const setDynamicScope = (parentSelector: string) => {
  const parentElement = document.querySelector(parentSelector);
  if (!parentElement) return;

  const scopedId = parentElement
    .getAttributeNames()
    .find((attr) => attr.includes("data-v-"))!;
  if (!scopedId) return;

  scopeDynamicElements(parentElement, scopedId);
};

/**
 * Recursively applies a given scoped ID to an element and all of its child elements.
 * This function is called by `setDynamicScope` and recursively calls itself to ensure
 * that all descendants of the initial element have the scoped ID applied.
 *
 * @param {Element} element - The DOM element to which the scoped ID will be applied.
 * @param {string} scopedId - The scoped ID to apply to the element and its children.
 */
const scopeDynamicElements = (element: Element, scopedId: string) => {
  // Apply the scopedId to the current element
  element.setAttribute(scopedId, "");

  // If the element has child nodes, apply the scopedId to each child recursively
  if (element.hasChildNodes()) {
    Array.from(element.children).forEach((child) => {
      scopeDynamicElements(child, scopedId);
    });
  }
};
