import FeatherChipList from "./FeatherChipList.vue";
import FeatherChip from "./FeatherChip.vue";
import { mount } from "@vue/test-utils";
import * as id from "@featherds/utils/id";
import { h, nextTick } from "vue";
jest.spyOn(id, "getSafeId").mockImplementation((x) => x);

import axe from "@featherds/utils/test/axe";

const getRadio = (value, disabled) => getChip(disabled, false, false, value);
const getChip = (disabled = false, del = false, click = false, value) => {
  const test = () => {
    return;
  };
  const on = {};
  if (del) {
    on.onDelete = test;
  }
  if (click) {
    on.onClick = test;
  }
  return h(
    FeatherChip,
    {
      disabled: disabled,
      value: value,
      ...on,
    },
    {
      default: () => "TEST",
    }
  );
};

const getWrapper = (chips, options = {}) => {
  options.props = {
    ...(options.props || {}),
    label: "TEST",
  };
  options.slots = {
    default: () => chips,
  };
  return mount(FeatherChipList, options);
};

describe("Feather Chip List", () => {
  describe("list format", () => {
    it("should render child chips correctly", () => {
      const chips = [getChip(), getChip()];
      const wrapper = getWrapper(chips);
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it("should render child chips with delete correctly", () => {
      const chips = [getChip(false, true), getChip(false, true)];
      const wrapper = getWrapper(chips);
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it("should render child chips with click correctly", () => {
      const chips = [getChip(false, false, true), getChip(false, false, true)];
      const wrapper = getWrapper(chips);
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it("should render child chips with one disabled correctly", () => {
      const chips = [getChip(false), getChip(true)];
      const wrapper = getWrapper(chips);
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it("should be accessible", async () => {
      const chips = [getChip()];
      const wrapper = getWrapper(chips);
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
    it("should be accessible with click", async () => {
      const chips = [getChip(false, false, true)];
      const wrapper = getWrapper(chips);
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
    it("should be accessible with delete", async () => {
      const chips = [getChip(false, true)];
      const wrapper = getWrapper(chips);
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
    it("should be accessible with one disabled", async () => {
      const chips = [getChip(true)];
      const wrapper = getWrapper(chips);
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
  });
  describe("radio format", () => {
    const selector = "[role='radiogroup']";
    it("should render child chips to correctly", async () => {
      const wrapper = getWrapper([getRadio(1, false), getRadio(2, false)], {
        props: { mode: "radio", modelValue: 1 },
      });
      await nextTick();
      await nextTick();

      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it("should set first property on first radio if none match the value", async () => {
      const wrapper = getWrapper([getRadio(1, false), getRadio(2, false)], {
        props: { mode: "radio", modelValue: -1 },
      });
      await nextTick();
      await nextTick();
      expect(wrapper.findAll("[role='radio']")[0].attributes("tabindex")).toBe(
        "0"
      );
    });
    it("should set first property on first radio not disabled if none match the value", async () => {
      const wrapper = getWrapper([getRadio(1, true), getRadio(2, false)], {
        props: { mode: "radio", modelValue: -1 },
      });
      await nextTick();
      await nextTick();
      expect(wrapper.findAll("[role='radio']")[1].attributes("tabindex")).toBe(
        "0"
      );
    });
    it("should set select first radio that matches initial value", async () => {
      const wrapper = getWrapper([getRadio(1, false), getRadio(2, false)], {
        props: { mode: "radio", modelValue: 2 },
      });
      await nextTick();
      await nextTick();
      await nextTick();
      expect(
        wrapper.findAll("[role='radio']")[1].attributes("aria-checked")
      ).toBe("true");
    });
    it("should emit input on check", async () => {
      const wrapper = getWrapper([getRadio(1, false), getRadio(2, false)], {
        props: { mode: "radio", modelValue: 2 },
      });
      await wrapper.find("[role='radio']").trigger("click");
      expect(wrapper.emitted("update:modelValue")[0][0]).toBe(1);
    });

    it("should select clicked radio button", async () => {
      const wrapper = getWrapper([getRadio(1, false), getRadio(2, false)], {
        props: { mode: "radio", modelValue: -1 },
      });
      await nextTick();
      await nextTick();
      await wrapper.find("[role='radio']").trigger("click");
      expect(wrapper.emitted("update:modelValue")[0][0]).toBe(1);
    });
    it("should not select a disabled clicked radio button", async () => {
      const wrapper = getWrapper([getRadio(1, true), getRadio(2, false)], {
        props: { mode: "radio", modelValue: -1 },
      });
      await nextTick();
      await nextTick();
      await wrapper.find("[role='radio']").trigger("click");
      expect(wrapper.emitted("update:modelValue")).toBeUndefined();
    });
    it("should select current radio when space or enter is pressed", async () => {
      const testSelection = async (code) => {
        const wrapper = getWrapper([getRadio(1, false), getRadio(2, false)], {
          props: { mode: "radio", modelValue: -1 },
        });
        await nextTick();
        await nextTick();
        await wrapper.find(selector).trigger(`keydown.${code}`);
        expect(wrapper.emitted("update:modelValue")[0][0]).toBe(1);
      };
      await testSelection("enter");
      await testSelection("space");
    });
    it("should select next enabled radio when right or down is pressed", async () => {
      const testNext = async (code) => {
        const wrapper = getWrapper(
          [getRadio(1, false), getRadio(2, true), getRadio(3, false)],
          {
            props: { mode: "radio", modelValue: 1 },
          }
        );
        await nextTick();
        await nextTick();
        await wrapper.find(selector).trigger(`keydown.${code}`);
        expect(wrapper.emitted("update:modelValue")[0][0]).toBe(3);
      };
      await testNext("down");
      await testNext("right");
    });
    it("should select first enabled radio when right or down is pressed at the end of the group", async () => {
      const testNext = async (code) => {
        const wrapper = getWrapper(
          [getRadio(1, true), getRadio(2, false), getRadio(3, false)],
          {
            props: { mode: "radio", modelValue: 3 },
          }
        );
        await nextTick();
        await nextTick();
        await wrapper.find(selector).trigger(`keydown.${code}`);
        expect(wrapper.emitted("update:modelValue")[0][0]).toBe(2);
      };
      await testNext("down");
      await testNext("right");
    });
    it("should select previous enabled radio when left or up is pressed", async () => {
      const testPrev = async (code) => {
        const wrapper = getWrapper(
          [getRadio(1, false), getRadio(2, true), getRadio(3, false)],
          {
            props: { mode: "radio", modelValue: 3 },
          }
        );

        await nextTick();
        await nextTick();
        await wrapper.find(selector).trigger(`keydown.${code}`);
        expect(wrapper.emitted("update:modelValue")[0][0]).toBe(1);
      };
      await testPrev("left");
      await testPrev("up");
    });
    it("should select last enabled radio when left or up is pressed at the start of the group", async () => {
      const testPrev = async (code) => {
        const wrapper = getWrapper(
          [
            getRadio(1, false),
            getRadio(0, false),
            getRadio(2, false),
            getRadio(3, true),
          ],
          {
            props: { mode: "radio", modelValue: 1 },
          }
        );

        await nextTick();
        await nextTick();
        await wrapper.find(selector).trigger(`keydown.${code}`);
        expect(wrapper.emitted("update:modelValue")[0][0]).toBe(2);
      };
      await testPrev("left");
      await testPrev("up");
    });
  });
});
