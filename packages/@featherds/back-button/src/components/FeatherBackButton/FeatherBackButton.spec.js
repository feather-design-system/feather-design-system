import FeatherBackButton from "./FeatherBackButton.vue";
import { mount } from "@vue/test-utils";
import "@testing-library/jest-dom";
import axe from "@featherds/utils/test/axe";
const getWrapper = function (options) {
  return mount(FeatherBackButton, options);
};
const getSlot = (text) => ({ template: `<span>${text}</span>` });

describe("FeatherBackButton.vue", () => {
  it("should not render text intially", () => {
    const options = {
      slots: {
        default: getSlot("hello"),
      },
    };
    const wrapper = getWrapper(options);
    expect(wrapper.find(".text").element).not.toBeVisible();
  });
  it("should be visible after long hover", (done) => {
    const options = {
      slots: {
        default: getSlot("hello"),
      },
    };
    const wrapper = getWrapper(options);
    wrapper.trigger("mouseenter");
    setTimeout(() => {
      expect(wrapper.find(".text").isVisible()).toBe(true);
      done();
    }, wrapper.vm.longHover + 50);
  });
  it("should trigger external handlers", async () => {
    const options = {
      slots: {
        default: getSlot("hello"),
      },
      attrs: {
        onClick: jest.fn(),
        onMouseenter: jest.fn(),
      },
    };
    const wrapper = getWrapper(options);
    await wrapper.trigger("mouseenter");
    expect(options.attrs.onMouseenter).toHaveBeenCalled();
    await wrapper.trigger("click");
    expect(options.attrs.onClick).toHaveBeenCalled();
  });
  it("should be accessible with no text displaying", async () => {
    const options = {
      slots: {
        default: getSlot("hello"),
      },
    };
    const wrapper = getWrapper(options);
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
  it("should be accessible with text displaying", async () => {
    const options = {
      slots: {
        default: getSlot("hello"),
      },
    };
    const wrapper = getWrapper(options);
    await wrapper.trigger("mouseenter");
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
