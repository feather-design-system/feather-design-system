import { nextTick } from "vue";
import axe from "@featherds/utils/test/axe";
import { mount } from "@vue/test-utils";
import FeatherCheckbox from "./FeatherCheckbox.vue";
import * as id from "@featherds/utils/id";
import { getCalls } from "@featherds/utils/test/calls";
import { Code } from "@featherds/utils/keys";
jest.spyOn(id, "getSafeId").mockImplementation((x) => x);

const getWrapper = function (options: Record<string, unknown> = {}) {
  options = {
    ...options,
    ...getSlot(),
    global: {
      provide: {
        registerCheckbox: jest.fn(),
      },
    },
  };
  return mount(FeatherCheckbox, options);
};
const getSlot = () => ({
  slots: {
    default: {
      template: "<span>Hello</span>",
    },
  },
});

describe("FeatherCheckbox.vue", () => {
  it("should have a label", () => {
    const wrapper = getWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should set aria-checked based on property", async () => {
    const wrapper = getWrapper({
      props: {
        modelValue: true,
      },
    });
    expect(wrapper.element).toMatchSnapshot();

    wrapper.setProps({
      modelValue: false,
    });
    await nextTick();
    expect(wrapper.element).toMatchSnapshot();
    wrapper.setProps({
      modelValue: false,
      indeterminate: true,
    });
    await nextTick();
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should not emit input event when disabled", async () => {
    const wrapper = getWrapper({
      props: {
        disabled: true,
      },
    });
    await wrapper.find("[role='checkbox']").trigger("click");
    expect(wrapper.emitted("update:modelValue")).toBeFalsy();
  });
  it("should emit input event when clicked", async () => {
    const wrapper = getWrapper();
    await wrapper.find("[role='checkbox']").trigger("click");
    expect(getCalls<boolean[]>(wrapper, "update:modelValue")[0][0]).toBe(true);
  });
  it("should toggle the value when enter or space is pressed", async () => {
    const testKeydown = async (code: Code, modelValue: boolean) => {
      const wrapper = getWrapper({
        props: { modelValue },
      });
      expect(wrapper.vm.modelValue).toBe(modelValue);
      const input = wrapper.find<HTMLElement>("[role='checkbox']");
      await input.trigger("keydown", { code });
      expect(getCalls<boolean[]>(wrapper, "update:modelValue")[0][0]).toBe(
        !modelValue
      );
    };
    await testKeydown(Code.SPACE, false);
    await testKeydown(Code.ENTER, true);
    await testKeydown(Code.ENTER, false);
    await testKeydown(Code.SPACE, true);
  });
  it("should not display a label when label property is used", () => {
    const label = "test";
    const wrapper = getWrapper({
      props: {
        label,
      },
    });
    expect(wrapper.find("label").exists()).toBe(false);
    expect(wrapper.find("[role='checkbox']").attributes("aria-label")).toBe(
      label
    );
  });
  it("should set tabindex to -1 when noFocus is used", () => {
    const wrapper = getWrapper({
      props: {
        noFocus: true,
      },
    });
    expect(wrapper.find("[role='checkbox']").attributes("tabindex")).toBe("-1");
  });
  describe("indeterminate", () => {
    it("should set value to 'undefined' when indeterminate is set to true", async () => {
      const wrapper = getWrapper({
        props: {
          modelValue: true,
        },
      });
      wrapper.setProps({
        indeterminate: true,
      });
      await nextTick();
      expect(
        getCalls<boolean[]>(wrapper, "update:modelValue")[0][0]
      ).toBeUndefined();
    });
    it("should set value to true when an indeterminate checkbox is clicked", async () => {
      const wrapper = getWrapper({
        props: {
          modelValue: true,
        },
      });
      wrapper.setProps({
        indeterminate: true,
      });
      await nextTick();
      await wrapper.find("[role='checkbox']").trigger("click");
      expect(getCalls<boolean[]>(wrapper, "update:modelValue")[1][0]).toBe(
        true
      );
    });
    it("should emit an indeterminate event when indeterminate is changed via click of checkbox", async () => {
      const wrapper = getWrapper({
        props: {
          modelValue: true,
        },
      });
      wrapper.setProps({
        indeterminate: true,
      });
      await nextTick();
      await wrapper.find("[role='checkbox']").trigger("click");
      expect(getCalls<boolean[]>(wrapper, "indeterminate")[1][0]).toBe(false);
    });
    it("should emit an indeterminate event when indeterminate is set via prop", async () => {
      const wrapper = getWrapper({
        props: {
          modelValue: true,
        },
      });
      wrapper.setProps({
        indeterminate: true,
      });
      await nextTick();
      expect(getCalls<boolean[]>(wrapper, "indeterminate")[0][0]).toBe(true);
    });
  });
  describe("a11y", () => {
    const accessibilityTest = async (options: Record<string, unknown>) => {
      const wrapper = getWrapper(options);
      expect(await axe(wrapper.element)).toHaveNoViolations();
    };
    it("should be accessible when unchecked", async () => {
      await accessibilityTest({});
    });
    it("should be accessible when disabled and unchecked", async () => {
      await accessibilityTest({
        props: {
          disabled: true,
        },
      });
    });
    it("should be accessible when disabled and checked ", async () => {
      await accessibilityTest({
        props: {
          disabled: true,
          modelValue: true,
        },
      });
    });
    it("should be accessible when checked ", async () => {
      await accessibilityTest({
        props: {
          modelValue: true,
        },
      });
    });
  });
});
