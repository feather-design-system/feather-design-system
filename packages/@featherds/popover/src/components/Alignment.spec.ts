import { PopoverPlacement, PointerAlignment, Tooltip, Trigger } from "../types";
import { calculateAlignment } from "./Alignment";
import { expect, describe, it } from "vitest";

const getLayout = (left = true, center = true, right = true) => {
  const tooltip: Tooltip = {
    height: 100,
    width: 100,
  };
  const trigger: Trigger = {
    height: 20,
    width: 20,
    left: 0,
    top: tooltip.height + 10,
  };

  const screenHeight = trigger.height + tooltip.height + 50; // + 50 for a buffer
  let screenWidth = trigger.width;
  if (center) {
    screenWidth += tooltip.width;
    trigger.left = screenWidth / 2; //center
  } else {
    screenWidth += tooltip.width / 2;
  }
  if (left) {
    screenWidth += tooltip.width / 2;
    trigger.left = !center ? 10 : trigger.left;
  }
  if (right) {
    screenWidth += tooltip.width / 2;
    trigger.left = !center ? screenWidth - 10 : trigger.left;
  }
  if (right && left && center) {
    trigger.left = screenWidth / 2;
  }

  window = Object.assign(window, {
    innerHeight: screenHeight,
    innerWidth: screenWidth,
  });

  return {
    tooltip: getRect(0, 0, tooltip.height, tooltip.width),
    trigger: getRect(trigger.top, trigger.left, trigger.width, trigger.height),
  };
};

const getVerticalLayout = (left = true, center = true, right = true) => {
  const tooltip: Tooltip = {
    height: 100,
    width: 100,
  };
  const trigger: Trigger = {
    height: 20,
    width: 20,
    left: 0,
    top: tooltip.height + 10,
  };

  const screenWidth = trigger.width + tooltip.width + 50; // + 50 for a buffer
  let screenHeight = trigger.height;
  if (center) {
    screenHeight += tooltip.height;
    trigger.top = screenHeight / 2; //center
  } else {
    screenHeight += tooltip.height / 2;
  }
  if (left) {
    screenHeight += tooltip.height / 2;
    trigger.top = !center ? 10 : trigger.top;
  }
  if (right) {
    screenHeight += tooltip.height / 2;
    trigger.top = !center ? screenHeight - 10 : trigger.top;
  }
  if (right && left && center) {
    trigger.top = screenHeight / 2;
  }

  window = Object.assign(window, {
    innerHeight: screenHeight,
    innerWidth: screenWidth,
  });

  return {
    tooltip: getRect(0, 0, tooltip.height, tooltip.width),
    trigger: getRect(trigger.top, trigger.left, trigger.width, trigger.height),
  };
};

const getRect = (top = 0, left = 0, height = 10, width = 10) =>
  ({
    top,
    y: top,
    bottom: top + height,
    left,
    x: left,
    right: left + width,
    height,
    width,
  } as DOMRect);

describe("Alignment", () => {
  describe("top/bottom", () => {
    describe("preferred center", () => {
      it("should align center if there is enough space", () => {
        const { tooltip, trigger } = getLayout(true, true, true);

        expect(
          calculateAlignment(
            PopoverPlacement.top,
            trigger,
            tooltip,
            PointerAlignment.center
          )
        ).toBe(PointerAlignment.center);
      });
      it("should align left if there is enough space", () => {
        const { tooltip, trigger } = getLayout(true, false, false);

        expect(
          calculateAlignment(
            PopoverPlacement.top,
            trigger,
            tooltip,
            PointerAlignment.center
          )
        ).toBe(PointerAlignment.left);
      });

      it("should align right if there is enough space", () => {
        const { tooltip, trigger } = getLayout(false, false, true);
        expect(
          calculateAlignment(
            PopoverPlacement.top,
            trigger,
            tooltip,
            PointerAlignment.center
          )
        ).toBe(PointerAlignment.right);
      });
    });

    describe("preferred left", () => {
      it("should align left if there is enough space", () => {
        const { tooltip, trigger } = getLayout(true, true, true);
        expect(
          calculateAlignment(
            PopoverPlacement.top,
            trigger,
            tooltip,
            PointerAlignment.left
          )
        ).toBe(PointerAlignment.left);
      });
      it("should align center if there is enough space", () => {
        const { tooltip, trigger } = getLayout(false, true, false);
        expect(
          calculateAlignment(
            PopoverPlacement.top,
            trigger,
            tooltip,
            PointerAlignment.left
          )
        ).toBe(PointerAlignment.center);
      });

      it("should align right if there is enough space", () => {
        const { tooltip, trigger } = getLayout(false, false, true);
        expect(
          calculateAlignment(
            PopoverPlacement.top,
            trigger,
            tooltip,
            PointerAlignment.left
          )
        ).toBe(PointerAlignment.right);
      });
    });

    describe("preferred right", () => {
      it("should align right if there is enough space", () => {
        const { tooltip, trigger } = getLayout(true, true, true);
        expect(
          calculateAlignment(
            PopoverPlacement.top,
            trigger,
            tooltip,
            PointerAlignment.right
          )
        ).toBe(PointerAlignment.right);
      });
      it("should align center if there is enough space", () => {
        const { tooltip, trigger } = getLayout(true, true, false);
        expect(
          calculateAlignment(
            PopoverPlacement.top,
            trigger,
            tooltip,
            PointerAlignment.right
          )
        ).toBe(PointerAlignment.center);
      });

      it("should align left if there is enough space", () => {
        const { tooltip, trigger } = getLayout(true, false, false);
        expect(
          calculateAlignment(
            PopoverPlacement.top,
            trigger,
            tooltip,
            PointerAlignment.right
          )
        ).toBe(PointerAlignment.left);
      });
    });
  });
  describe("right/left", () => {
    describe("preferred center", () => {
      it("should align center if there is enough space", () => {
        const { tooltip, trigger } = getVerticalLayout(true, true, true);

        expect(
          calculateAlignment(
            PopoverPlacement.left,
            trigger,
            tooltip,
            PointerAlignment.center
          )
        ).toBe(PointerAlignment.center);
      });
      it("should align left if there is enough space", () => {
        const { tooltip, trigger } = getVerticalLayout(true, false, false);

        expect(
          calculateAlignment(
            PopoverPlacement.left,
            trigger,
            tooltip,
            PointerAlignment.center
          )
        ).toBe(PointerAlignment.left);
      });

      it("should align right if there is enough space", () => {
        const { tooltip, trigger } = getVerticalLayout(false, false, true);
        expect(
          calculateAlignment(
            PopoverPlacement.left,
            trigger,
            tooltip,
            PointerAlignment.center
          )
        ).toBe(PointerAlignment.right);
      });
    });

    describe("preferred left", () => {
      it("should align left if there is enough space", () => {
        const { tooltip, trigger } = getVerticalLayout(true, true, true);
        expect(
          calculateAlignment(
            PopoverPlacement.left,
            trigger,
            tooltip,
            PointerAlignment.left
          )
        ).toBe(PointerAlignment.left);
      });
      it("should align center if there is enough space", () => {
        const { tooltip, trigger } = getVerticalLayout(false, true, false);
        expect(
          calculateAlignment(
            PopoverPlacement.left,
            trigger,
            tooltip,
            PointerAlignment.left
          )
        ).toBe(PointerAlignment.center);
      });

      it("should align right if there is enough space", () => {
        const { tooltip, trigger } = getVerticalLayout(false, false, true);
        expect(
          calculateAlignment(
            PopoverPlacement.left,
            trigger,
            tooltip,
            PointerAlignment.left
          )
        ).toBe(PointerAlignment.right);
      });
    });

    describe("preferred right", () => {
      it("should align right if there is enough space", () => {
        const { tooltip, trigger } = getVerticalLayout(true, true, true);
        expect(
          calculateAlignment(
            PopoverPlacement.right,
            trigger,
            tooltip,
            PointerAlignment.right
          )
        ).toBe(PointerAlignment.right);
      });
      it("should align center if there is enough space", () => {
        const { tooltip, trigger } = getVerticalLayout(true, true, false);
        expect(
          calculateAlignment(
            PopoverPlacement.right,
            trigger,
            tooltip,
            PointerAlignment.right
          )
        ).toBe(PointerAlignment.center);
      });

      it("should align left if there is enough space", () => {
        const { tooltip, trigger } = getVerticalLayout(true, false, false);
        expect(
          calculateAlignment(
            PopoverPlacement.right,
            trigger,
            tooltip,
            PointerAlignment.right
          )
        ).toBe(PointerAlignment.left);
      });
    });
  });
});
