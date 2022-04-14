import { TooltipPlacement } from "../types";

export const calculatePlacement = (
  triggerBox: DOMRect,
  tooltipBox: DOMRect,
  preferred: TooltipPlacement,
  arrowHeight = 7
) => {
  const triggerBottom = window.innerHeight - triggerBox.bottom;
  const triggerRight = window.innerWidth - triggerBox.right;
  //can the tooltip fit top or bottom
  const allowedX = [] as TooltipPlacement[];
  if (triggerBox.top >= tooltipBox.height + arrowHeight) {
    allowedX.push(TooltipPlacement.top);
  }
  if (triggerBottom >= tooltipBox.height + arrowHeight) {
    allowedX.push(TooltipPlacement.bottom);
  }

  //can the tooltip fit top or bottom
  const allowedY = [] as TooltipPlacement[];
  if (triggerRight >= tooltipBox.width + arrowHeight) {
    allowedY.push(TooltipPlacement.right);
  }
  if (triggerBox.left >= tooltipBox.width + arrowHeight) {
    allowedY.push(TooltipPlacement.left);
  }

  let allowedPositions = [...allowedY, ...allowedX];

  //if top/bottom is selected put allowedX first
  if (
    preferred === TooltipPlacement.top ||
    preferred === TooltipPlacement.bottom
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
