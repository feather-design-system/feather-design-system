import { mount } from "@vue/test-utils";
import FeatherRadioGroup from "./FeatherRadioGroup.vue";
import FeatherRadio from "../FeatherRadio/FeatherRadio.vue";

import axe from "@featherds/utils/test/axe";
import { getCalls } from "@featherds/utils/test/calls";
import { h, nextTick } from "vue";
import * as id from "@featherds/utils/id";
import { Code } from "@featherds/utils/keys";
import { vi, expect, describe, it } from "vitest";
vi.spyOn(id, "getSafeId").mockImplementation((x) => x);

const selector = "[role='radiogroup']";
const getWrapper = function (options: Record<string, unknown> = {}) {
  const props = (options.props as Record<string, unknown>) || {};
  options.props = {
    ...props,
    label: "Unit Test Radio Group",
  };
  return mount(FeatherRadioGroup, options);
};

const getRadio = (value: number | string, disabled: boolean) => ({
  render() {
    return h(
      FeatherRadio,
      {
        value: value,
        disabled: disabled,
      },
      {
        default: () => "Test Radio",
      }
    );
  },
});

describe("FeatherRadioGroup.vue", () => {
  it("should set id and name", () => {
    const wrapper = getWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should stack vertically", () => {
    const wrapper = getWrapper({
      props: {
        hint: "TEST HINT",
        vertical: true,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
  it("should have hint text", () => {
    const wrapper = getWrapper({
      props: {
        hint: "TEST HINT",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should have error text", async () => {
    const wrapper = getWrapper();
    await wrapper.setProps({
      error: "TEST HINT",
    });
    await nextTick();
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should select non null or undefined falsey value", async () => {
    const slots = {
      default: [getRadio(0, false), getRadio(1, false)],
    };
    const wrapper = getWrapper({
      slots,
      propsData: { modelValue: 0 },
    });
    await nextTick();
    await nextTick();
    expect(
      wrapper.findAll("[role='radio']")[0].attributes("aria-checked")
    ).toBe("true");
  });

  it("should set first property on first radio if none match the value", async () => {
    const slots = {
      default: [getRadio(1, false), getRadio(2, false)],
    };
    const wrapper = getWrapper({
      slots,
      props: { modelValue: -1 },
    });
    await nextTick();
    await nextTick();
    expect(wrapper.findAll("[role='radio']")[0].attributes("tabindex")).toBe(
      "0"
    );
  });
  it("should set first property on first radio not disabled if none match the value", async () => {
    const slots = {
      default: [getRadio(1, true), getRadio(2, false)],
    };
    const wrapper = getWrapper({
      slots,
      props: { modelValue: -1 },
    });
    await nextTick();
    await nextTick();
    expect(wrapper.findAll("[role='radio']")[1].attributes("tabindex")).toBe(
      "0"
    );
  });
  it("should set select first radio that matches initial value", async () => {
    const slots = {
      default: [getRadio(1, false), getRadio("2", false)],
    };
    const wrapper = getWrapper({
      slots,
      props: { modelValue: "2" },
    });
    await nextTick();
    await nextTick();
    await nextTick();
    expect(
      wrapper.findAll("[role='radio']")[1].attributes("aria-checked")
    ).toBe("true");
  });
  it("should emit input on check", async () => {
    const slots = {
      default: [getRadio(1, false), getRadio(2, false)],
    };
    const wrapper = getWrapper({
      slots,
      props: { modelValue: 2 },
    });
    await wrapper.find("[role='radio']").trigger("click");
    expect(getCalls<[number]>(wrapper, "update:modelValue")[0][0]).toBe(1);
  });

  it("should select clicked radio button", async () => {
    const slots = {
      default: [getRadio(1, false), getRadio(2, false)],
    };
    const wrapper = getWrapper({
      slots,
      props: { modelValue: -1 },
    });
    await nextTick();
    await nextTick();
    await wrapper.find("[role='radio']").trigger("click");
    expect(getCalls<[number]>(wrapper, "update:modelValue")[0][0]).toBe(1);
  });

  it("should select radio button when modelValue is updated", async () => {
    const slots = {
      default: [getRadio(1, false), getRadio(2, false)],
    };
    const wrapper = getWrapper({
      slots,
      propsData: { modelValue: 1 },
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.setProps({
      modelValue: 2,
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(
      wrapper.findAll("[role='radio']")[1].attributes("aria-checked")
    ).toBe("true");
  });
  it("should not select a disabled clicked radio button", async () => {
    const slots = {
      default: [getRadio(1, true), getRadio(2, false)],
    };
    const wrapper = getWrapper({
      slots,
      props: { modelValue: -1 },
    });
    await nextTick();
    await nextTick();
    await wrapper.find("[role='radio']").trigger("click");
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });
  it("should select current radio when space or enter is pressed", async () => {
    const testSelection = async (code: Code) => {
      const slots = {
        default: [getRadio(1, false), getRadio(2, false)],
      };
      const wrapper = getWrapper({
        slots,
        props: { modelValue: -1 },
      });
      await nextTick();
      await nextTick();
      const radio = wrapper.find(selector);
      await radio.trigger("keydown", { code });
      expect(getCalls<[number]>(wrapper, "update:modelValue")[0][0]).toBe(1);
    };
    await testSelection(Code.ENTER);
    await testSelection(Code.SPACE);
  });
  it("should select next enabled radio when right or down is pressed", async () => {
    const testNext = async (code: Code) => {
      const slots = {
        default: [getRadio(1, false), getRadio(2, true), getRadio(3, false)],
      };
      const wrapper = getWrapper({
        slots,
        props: { modelValue: 1 },
      });
      await nextTick();
      await nextTick();
      const radio = wrapper.find(selector);
      await radio.trigger("keydown", { code });
      expect(getCalls<[number]>(wrapper, "update:modelValue")[0][0]).toBe(3);
    };
    await testNext(Code.DOWN);
    await testNext(Code.RIGHT);
  });
  it("should select first enabled radio when right or down is pressed at the end of the group", async () => {
    const testNext = async (code: Code) => {
      const slots = {
        default: [getRadio(1, true), getRadio(2, false), getRadio(3, false)],
      };
      const wrapper = getWrapper({
        slots,
        props: { modelValue: 3 },
      });
      await nextTick();
      await nextTick();
      const radio = wrapper.find(selector);
      await radio.trigger("keydown", { code });
      expect(getCalls<[number]>(wrapper, "update:modelValue")[0][0]).toBe(2);
    };
    await testNext(Code.DOWN);
    await testNext(Code.RIGHT);
  });
  it("should select previous enabled radio when left or up is pressed", async () => {
    const testPrev = async (code: Code) => {
      const slots = {
        default: [getRadio(1, false), getRadio(2, true), getRadio(3, false)],
      };
      const wrapper = getWrapper({
        slots,
        props: { modelValue: 3 },
      });

      await nextTick();
      await nextTick();
      const radio = wrapper.find(selector);
      await radio.trigger("keydown", { code });
      expect(getCalls<[number]>(wrapper, "update:modelValue")[0][0]).toBe(1);
    };
    await testPrev(Code.LEFT);
    await testPrev(Code.UP);
  });
  it("should select last enabled radio when left or up is pressed at the start of the group", async () => {
    const testPrev = async (code: Code) => {
      const slots = {
        default: [
          getRadio(1, false),
          getRadio(0, false),
          getRadio(2, false),
          getRadio(3, true),
        ],
      };
      const wrapper = getWrapper({
        slots,
        props: { modelValue: 1 },
      });

      await nextTick();
      await nextTick();
      const radio = await wrapper.find(selector);
      await radio.trigger("keydown", { code });
      expect(getCalls<[number]>(wrapper, "update:modelValue")[0][0]).toBe(2);
    };
    await testPrev(Code.LEFT);
    await testPrev(Code.UP);
  });
  describe("a11y", () => {
    it("should be accessible ", async () => {
      const slots = {
        default: [getRadio(1, false)],
      };
      const wrapper = getWrapper({
        slots,
        props: { modelValue: 1 },
      });
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
  });
});
