import { PopoverPlacement } from "../types";

export const calculatePlacement = (
  triggerBox: DOMRect,
  tooltipBox: DOMRect,
  preferred: PopoverPlacement,
  arrowHeight = 9
) => {
  //Check if the trigger element is hidden off the screen
  //if so just return a known placement value
  //scroll off the top
  if (triggerBox.top < 0) {
    return PopoverPlacement.bottom;
  }
  //scroll off bottom
  if (triggerBox.bottom > window.innerHeight) {
    return PopoverPlacement.top;
  }

  //scroll off the left
  if (triggerBox.left < 0) {
    return PopoverPlacement.right;
  }
  //scroll off right
  if (triggerBox.right > window.innerWidth) {
    return PopoverPlacement.left;
  }

  const triggerBottom = window.innerHeight - triggerBox.bottom;
  const triggerRight = window.innerWidth - triggerBox.right;
  //can the tooltip fit top or bottom
  const allowedX = [] as PopoverPlacement[];
  if (triggerBox.top >= tooltipBox.height + arrowHeight) {
    allowedX.push(PopoverPlacement.top);
  }
  if (triggerBottom >= tooltipBox.height + arrowHeight) {
    allowedX.push(PopoverPlacement.bottom);
  }

  //can the tooltip fit top or bottom
  const allowedY = [] as PopoverPlacement[];
  if (triggerRight >= tooltipBox.width + arrowHeight) {
    allowedY.push(PopoverPlacement.right);
  }
  if (triggerBox.left >= tooltipBox.width + arrowHeight) {
    allowedY.push(PopoverPlacement.left);
  }

  let allowedPositions = [...allowedY, ...allowedX];

  //if top/bottom is selected put allowedX first
  if (
    preferred === PopoverPlacement.top ||
    preferred === PopoverPlacement.bottom
  ) {
    allowedPositions = [...allowedX, ...allowedY];
  }
  //is the selected value there
  if (allowedPositions.indexOf(preferred) > -1) {
    //use it
    return preferred;
  } else if (allowedPositions.length) {
    //select first allowed option
    return allowedPositions[0];
  }
  return preferred;
};
