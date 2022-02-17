import { nextTick } from "vue";
import axe from "@featherds/utils/test/axe";
import FeatherInput from "./FeatherInput.vue";
import { mount } from "@vue/test-utils";
import * as id from "@featherds/utils/id";
import "@featherds/input-helper/test/MutationObserver";

jest.spyOn(id, "getSafeId").mockImplementation((x) => x);

const getWrapper = function (options) {
  document.body.innerHTML = "";
  options.attachTo = document.body;
  return mount(FeatherInput, options);
};

describe("FeatherInput.vue", () => {
  it("should render an input with a label", () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should render an input with a label and hint text", () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
        hint: "hint text",
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should render an input with a preset value", () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
        hint: "hint text",
        modelValue: "YEET",
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should render an input with raised label when focused", async () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
      },
    });
    await wrapper.find("input").trigger("focus");
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should render an input with raised label when focused and has a value", async () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
        modelValue: "YEET",
      },
    });
    await wrapper.find("input").trigger("focus");
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });

  it("should trigger input event when something is typed", () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
      },
    });
    const input = wrapper.find("input");
    const expected = "TEEST";
    input.element.value = expected;
    input.trigger("input");
    expect(wrapper.emitted("update:modelValue")[1][0]).toBe(expected);
  });

  it("should render an input error input", () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
        error: "Error text",
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should render an input error input and has focus", async () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
        error: "Error text",
      },
    });
    await wrapper.find("input").trigger("focus");
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should render an input error input and has a value", () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
        error: "Error text",
        modelValue: "Test",
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should render a clear icon when clear has a value and input also has a value", () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
        clear: "clear",
        modelValue: "Test",
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });

  it("should not render a clear icon when the input doesn't have a value", () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
        clear: "clear",
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should render a maxlength attribute and character count when maxlength specified", () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
        modelValue: "test",
        maxlength: 5,
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should clear input when clear-icon is clicked", async () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
        modelValue: "YEET",
        clear: "clear",
      },
    });
    wrapper.vm.handleClear();
    await nextTick();
    expect(wrapper.wrapperElement).toMatchSnapshot();
    expect(wrapper.emitted("update:modelValue")[1][0]).toBe("");
  });

  it("should allow custom focus events", async () => {
    const fn = jest.fn();
    const wrapper = getWrapper({
      props: {
        label: "label",
        modelValue: "YEET",
      },
      attrs: {
        onFocus: fn,
      },
    });

    await wrapper.find("input").trigger("focus");
    expect(fn).toHaveBeenCalled();
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });

  it("should allow custom blur events", () => {
    const fn = jest.fn();
    const wrapper = getWrapper({
      props: {
        label: "label",
        modelValue: "YEET",
      },
      attrs: {
        onBlur: fn,
      },
    });

    wrapper.find("input").element.focus();
    wrapper.find("input").element.blur();
    expect(fn).toHaveBeenCalled();
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  describe("e2e elements, data-refs", () => {
    it("should have an input data-ref", () => {
      const wrapper = getWrapper({
        props: {
          label: "label",
          modelValue: "YEET",
        },
      });
      expect(wrapper.find("[data-ref-id='feather-input']").exists()).toBe(true);
    });

    it("should have a count data-ref", () => {
      const wrapper = getWrapper({
        props: {
          label: "label",
          modelValue: "YEET",
          hint: "HINT",
          maxlength: 5,
        },
      });
      expect(
        wrapper.find("[data-ref-id='feather-form-element-count']").exists()
      ).toBe(true);
    });
  });
  describe("a11y", () => {
    const accessibilityTest = async (options) => {
      const wrapper = mount(FeatherInput, options);
      expect(await axe(wrapper.element)).toHaveNoViolations();
    };
    it("should be accessible", async () => {
      await accessibilityTest({
        props: {
          label: "label",
          modelValue: "YEET",
        },
      });
    });
    it("should be accessible with no label", async () => {
      await accessibilityTest({
        props: {
          label: "label",
          modelValue: "YEET",
          hideLabel: true,
        },
      });
    });
    it("should be accessible with hint", async () => {
      await accessibilityTest({
        props: {
          label: "label",
          modelValue: "YEET",
          hint: "HINTTT",
        },
      });
    });
    it("should be accessible with error", async () => {
      await accessibilityTest({
        props: {
          label: "label",
          modelValue: "YEET",
          error: "Error",
        },
      });
    });
  });
});
