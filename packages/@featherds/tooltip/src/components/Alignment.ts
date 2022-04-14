import { TooltipPlacement, TooltipAlignment } from "../types";

export const calculateAlignment = (
  placement: TooltipPlacement,
  triggerBox: DOMRect,
  tooltipBox: DOMRect,
  preferred: TooltipAlignment,
  arrowOffset = 24
) => {
  if (
    placement === TooltipPlacement.left ||
    placement === TooltipPlacement.right
  ) {
    return TooltipAlignment.center;
  }

  const triggerCenter = triggerBox.left + triggerBox.width / 2;
  const triggerRight = window.innerWidth - triggerBox.right;
  const allowedAlignments = [] as TooltipAlignment[];
  const spaceLeft = triggerCenter;
  const spaceRight = triggerRight + triggerBox.width / 2;
  const tooltipWidthWithArrowOffset = tooltipBox.width - arrowOffset;

  //is there enough space left and right of center
  //for half the tooltip, aka is there enough space for center alignment
  const halfTooltip = tooltipBox.width / 2;
  if (spaceLeft >= halfTooltip && spaceRight >= halfTooltip) {
    allowedAlignments.push(TooltipAlignment.center);
  }

  //if there is enough space to the right of  trigger center
  //for most of the tooltip then alignment left is allowed
  if (spaceRight >= tooltipWidthWithArrowOffset) {
    allowedAlignments.push(TooltipAlignment.left);
  }

  //if there is enough space to the left of the trigger center
  //for most of the tooltip align to the right
  if (spaceLeft >= tooltipWidthWithArrowOffset) {
    allowedAlignments.push(TooltipAlignment.right);
  }

  if (allowedAlignments.indexOf(preferred) > -1) {
    return preferred;
  }
  if (allowedAlignments.length) {
    return allowedAlignments[0];
  }
  return preferred;
};
