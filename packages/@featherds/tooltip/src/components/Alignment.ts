import { TooltipPlacement, PointerAlignment } from "../types";

export const calculateAlignment = (
  placement: TooltipPlacement,
  triggerBox: DOMRect,
  tooltipBox: DOMRect,
  preferred: PointerAlignment,
  arrowOffset = 28
) => {
  if (
    placement === TooltipPlacement.left ||
    placement === TooltipPlacement.right
  ) {
    return PointerAlignment.center;
  }

  const triggerCenter = triggerBox.left + triggerBox.width / 2;
  const triggerRight = window.innerWidth - triggerBox.right;
  const allowedAlignments = [] as PointerAlignment[];
  const spaceLeft = triggerCenter;
  const spaceRight = triggerRight + triggerBox.width / 2;
  const tooltipWidthWithArrowOffset = tooltipBox.width - arrowOffset;

  //is there enough space left and right of center
  //for half the tooltip, aka is there enough space for center alignment
  const halfTooltip = tooltipBox.width / 2;
  if (spaceLeft >= halfTooltip && spaceRight >= halfTooltip) {
    allowedAlignments.push(PointerAlignment.center);
  }

  //if there is enough space to the right of  trigger center
  //for most of the tooltip then alignment left is allowed
  if (spaceRight >= tooltipWidthWithArrowOffset) {
    allowedAlignments.push(PointerAlignment.left);
  }

  //if there is enough space to the left of the trigger center
  //for most of the tooltip align to the right
  if (spaceLeft >= tooltipWidthWithArrowOffset) {
    allowedAlignments.push(PointerAlignment.right);
  }

  if (allowedAlignments.indexOf(preferred) > -1) {
    return preferred;
  }
  if (allowedAlignments.length) {
    return allowedAlignments[0];
  }
  return preferred;
};
