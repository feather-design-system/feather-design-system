import { nextTick } from "vue";
import axe from "@featherds/utils/test/axe";
import FeatherTextarea from "./FeatherTextarea.vue";
import { mount, config } from "@vue/test-utils";
import * as id from "@featherds/utils/id";
import "@featherds/input-helper/test/MutationObserver";

config.renderStubDefaultSlot = true;

jest.spyOn(id, "getSafeId").mockImplementation((x) => x);

const getWrapper = function (options) {
  return mount(FeatherTextarea, options);
};

describe("FeatherTextarea.vue", () => {
  it("should render an textarea with a label", () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render an textarea with a label and hint text", () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
        hint: "hint text",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render an textarea with a preset value", () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
        hint: "hint text",
        modelValue: "YEET",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render an textarea with raised label when focused", async () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
      },
    });
    await wrapper.find("textarea").trigger("focus");
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render an textarea with raised label when focused and has a value", async () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
        modelValue: "YEET",
      },
    });
    await wrapper.find("textarea").trigger("focus");
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should trigger textarea event when something is typed", () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
      },
    });
    const textarea = wrapper.find("textarea");
    const expected = "TEEST";
    textarea.element.value = expected;
    textarea.trigger("input");
    expect(wrapper.emitted("update:modelValue")[1][0]).toBe(expected);
  });

  it("should render an textarea error", () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
        error: "Error text",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render an textarea error and has focus", async () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
        error: "Error text",
      },
    });
    await wrapper.find("textarea").trigger("focus");
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render an textarea error and has a value", () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
        error: "Error text",
        modelValue: "Test",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render a clear icon when clear has a value and textarea also has a value", () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
        clear: "clear",
        modelValue: "Test",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should not render a clear icon when the textarea doesn't have a value", () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
        clear: "clear",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render a maxlength attribute and character count when maxlength specified", () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
        modelValue: "test",
        maxlength: 5,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should clear textarea when clear-icon is clicked", async () => {
    const wrapper = getWrapper({
      props: {
        label: "label",
        modelValue: "YEET",
        clear: "clear",
      },
    });
    wrapper.vm.handleClear();
    await nextTick();
    expect(wrapper.element).toMatchSnapshot();
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

    await wrapper.find("textarea").trigger("focus");
    expect(fn).toHaveBeenCalled();
    expect(wrapper.element).toMatchSnapshot();
  });

  fit("should allow custom blur events", () => {
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

    wrapper.find("textarea").trigger("blur");

    expect(fn).toHaveBeenCalled();
    expect(wrapper.element).toMatchSnapshot();
  });

  describe("a11y", () => {
    const accessibilityTest = async (options) => {
      const wrapper = mount(FeatherTextarea, options);
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
