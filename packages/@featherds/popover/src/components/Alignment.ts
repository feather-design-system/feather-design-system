import { PopoverPlacement, PointerAlignment } from "../types";

export const calculateAlignment = (
  placement: PopoverPlacement,
  triggerBox: DOMRect,
  tooltipBox: DOMRect,
  preferred: PointerAlignment,
  arrowOffset = 28
) => {
  let allowedAlignments = [] as PointerAlignment[];
  if (
    placement === PopoverPlacement.top ||
    placement === PopoverPlacement.bottom
  ) {
    allowedAlignments = getTopBottomPreferred(
      triggerBox,
      tooltipBox,
      arrowOffset
    );
  } else {
    allowedAlignments = getLeftRightPreferred(
      triggerBox,
      tooltipBox,
      arrowOffset
    );
  }

  if (allowedAlignments.indexOf(preferred) > -1) {
    return preferred;
  }
  if (allowedAlignments.length) {
    return allowedAlignments[0];
  }
  return preferred;
};

const getTopBottomPreferred = (
  triggerBox: DOMRect,
  tooltipBox: DOMRect,
  arrowOffset = 28
) => {
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
  return allowedAlignments;
};

const getLeftRightPreferred = (
  triggerBox: DOMRect,
  tooltipBox: DOMRect,
  arrowOffset = 28
) => {
  const triggerCenter = triggerBox.top + triggerBox.height / 2;
  const triggerBottom = window.innerHeight - triggerBox.bottom;
  const allowedAlignments = [] as PointerAlignment[];
  const spaceTop = triggerCenter;
  const spaceBottom = triggerBottom + triggerBox.width / 2;
  const tooltipHeightWithArrowOffset = tooltipBox.height - arrowOffset;

  //is there enough space top and bottom of center
  //for half the tooltip, aka is there enough space for center alignment
  const halfTooltip = tooltipBox.height / 2;
  if (spaceTop >= halfTooltip && spaceBottom >= halfTooltip) {
    allowedAlignments.push(PointerAlignment.center);
  }

  //if there is enough space to the bottom of  trigger center
  //for most of the tooltip then alignment left is allowed
  if (spaceBottom >= tooltipHeightWithArrowOffset) {
    allowedAlignments.push(PointerAlignment.left);
  }

  //if there is enough space to the top of the trigger center
  //for most of the tooltip align to the right
  if (spaceTop >= tooltipHeightWithArrowOffset) {
    allowedAlignments.push(PointerAlignment.right);
  }
  return allowedAlignments;
};
