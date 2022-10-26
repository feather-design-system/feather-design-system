import { useHideBodyOverflow, useHideRelativeOverflow } from "./HideOverflow";
import { mount } from "@vue/test-utils";
import { ref, nextTick } from "vue";
import { expect, describe, it } from "vitest";
const createWrapper = (setup) => {
  return mount({
    template: `<div></div>`,
    setup,
  });
};

describe("Hide Overflow composables", () => {
  describe("Body Overflow", () => {
    it("should set body overflow to hidden when visible is true", async () => {
      const visible = ref(false);
      const wrapper = createWrapper(() => {
        useHideBodyOverflow(visible);
      });
      visible.value = true;
      await nextTick();
      await nextTick();

      expect(document.body.style.overflow).toBe("hidden");
    });
    it("should reset body overflow to hidden when visible is false", async () => {
      const visible = ref(true);
      const original = document.body.style.overflow;
      const wrapper = createWrapper(() => {
        useHideBodyOverflow(visible);
      });
      visible.value = false;
      await nextTick();
      expect(document.body.style.overflow).toBe(original);
    });
    it("should reset body overflow to hidden when unmounting", async () => {
      const visible = ref(true);
      const original = document.body.style.overflow;
      const wrapper = createWrapper(() => {
        useHideBodyOverflow(visible);
      });
      wrapper.unmount();
      await nextTick();
      expect(document.body.style.overflow).toBe(original);
    });
  });
});
