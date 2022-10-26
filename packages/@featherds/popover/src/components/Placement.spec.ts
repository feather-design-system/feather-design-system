import { PopoverPlacement } from "../types";
import { calculatePlacement } from "./Placement";
import { expect, describe, it } from "vitest";

//Gives layout with enough space in the areas with true.
//pass true if you want enough space for the tooltip
const getLayout = (top = true, right = true, bottom = true, left = true) => {
  const arrowHeight = 10;
  const tooltip = {
    height: 20,
    width: 20,
  } as Record<string, number>;
  const trigger = {
    height: 100,
    width: 100,
  } as Record<string, number>;

  let screenHeight = trigger.height;
  let screenWidth = trigger.width;
  if (top) {
    screenHeight += tooltip.height + arrowHeight;
    trigger.top = tooltip.height + arrowHeight;
  } else {
    screenHeight += arrowHeight;
    trigger.top = arrowHeight;
  }
  if (bottom) {
    screenHeight += tooltip.height + arrowHeight;
  } else {
    screenHeight += arrowHeight;
  }

  if (left) {
    screenWidth += tooltip.width + arrowHeight;
    trigger.left = tooltip.width + arrowHeight;
  } else {
    screenWidth += arrowHeight;
    trigger.left = arrowHeight;
  }

  if (right) {
    screenWidth += tooltip.width + arrowHeight;
  } else {
    screenWidth += arrowHeight;
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
describe("Placement", () => {
  describe("top", () => {
    it("should position top if there is enough space", () => {
      const { tooltip, trigger } = getLayout(true, true, true, true);
      expect(calculatePlacement(trigger, tooltip, PopoverPlacement.top)).toBe(
        PopoverPlacement.top
      );
    });
    it("should position bottom if there is no space up top", () => {
      const { tooltip, trigger } = getLayout(false, true, true, true);
      expect(calculatePlacement(trigger, tooltip, PopoverPlacement.top)).toBe(
        PopoverPlacement.bottom
      );
    });
    it("should position right if there is no space up top or below", () => {
      const { tooltip, trigger } = getLayout(false, true, false, true);
      expect(calculatePlacement(trigger, tooltip, PopoverPlacement.top)).toBe(
        PopoverPlacement.right
      );
    });
    it("should position left if there is no space up top, below or right", () => {
      const { tooltip, trigger } = getLayout(false, false, false, true);
      expect(calculatePlacement(trigger, tooltip, PopoverPlacement.top)).toBe(
        PopoverPlacement.left
      );
    });
  });

  describe("bottom", () => {
    it("should position bottom if there is enough space", () => {
      const { tooltip, trigger } = getLayout(true, true, true, true);
      expect(
        calculatePlacement(trigger, tooltip, PopoverPlacement.bottom)
      ).toBe(PopoverPlacement.bottom);
    });
    it("should position top if there is no space below", () => {
      const { tooltip, trigger } = getLayout(true, true, false, true);
      expect(
        calculatePlacement(trigger, tooltip, PopoverPlacement.bottom)
      ).toBe(PopoverPlacement.top);
    });
    it("should position right if there is no space up top or below", () => {
      const { tooltip, trigger } = getLayout(false, true, false, true);
      expect(
        calculatePlacement(trigger, tooltip, PopoverPlacement.bottom)
      ).toBe(PopoverPlacement.right);
    });
    it("should position left if there is no space up top, below or right", () => {
      const { tooltip, trigger } = getLayout(false, false, false, true);
      expect(
        calculatePlacement(trigger, tooltip, PopoverPlacement.bottom)
      ).toBe(PopoverPlacement.left);
    });
  });

  describe("left", () => {
    it("should position left if there is enough space", () => {
      const { tooltip, trigger } = getLayout(true, true, true, true);
      expect(calculatePlacement(trigger, tooltip, PopoverPlacement.left)).toBe(
        PopoverPlacement.left
      );
    });
    it("should position right if no space to left", () => {
      const { tooltip, trigger } = getLayout(true, true, true, false);
      expect(calculatePlacement(trigger, tooltip, PopoverPlacement.left)).toBe(
        PopoverPlacement.right
      );
    });
    it("should position top if there is no space left or right", () => {
      const { tooltip, trigger } = getLayout(true, false, true, false);
      expect(calculatePlacement(trigger, tooltip, PopoverPlacement.left)).toBe(
        PopoverPlacement.top
      );
    });
    it("should position bottom if there is no space top, left or right", () => {
      const { tooltip, trigger } = getLayout(false, false, true, false);
      expect(calculatePlacement(trigger, tooltip, PopoverPlacement.left)).toBe(
        PopoverPlacement.bottom
      );
    });
  });

  describe("right", () => {
    it("should position right if there is enough space", () => {
      const { tooltip, trigger } = getLayout(true, true, true, true);
      expect(calculatePlacement(trigger, tooltip, PopoverPlacement.right)).toBe(
        PopoverPlacement.right
      );
    });
    it("should position left if no space to right", () => {
      const { tooltip, trigger } = getLayout(true, false, true, true);
      expect(calculatePlacement(trigger, tooltip, PopoverPlacement.right)).toBe(
        PopoverPlacement.left
      );
    });
    it("should position top if there is no space left or right", () => {
      const { tooltip, trigger } = getLayout(true, false, true, false);
      expect(calculatePlacement(trigger, tooltip, PopoverPlacement.right)).toBe(
        PopoverPlacement.top
      );
    });
    it("should position bottom if there is no space top, left or right", () => {
      const { tooltip, trigger } = getLayout(false, false, true, false);
      expect(calculatePlacement(trigger, tooltip, PopoverPlacement.right)).toBe(
        PopoverPlacement.bottom
      );
    });
  });
});
