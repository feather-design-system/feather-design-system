import { mount } from "@vue/test-utils";
import FeatherRadio from "./FeatherRadio.vue";
import axe from "@featherds/utils/test/axe";
import * as id from "@featherds/utils/id";
import { nextTick } from "vue";
import { vi, expect, describe, it } from "vitest";
vi.spyOn(id, "getSafeId").mockImplementation((x) => x);

const getWrapper = function (options: Record<string, unknown> = {}) {
  const props = (options.props as Record<string, unknown>) || {};

  options.props = {
    ...props,
    value: true,
  };
  return mount(FeatherRadio, options);
};
const getSlot = () => ({
  slots: {
    default: "Hello",
  },
});
const mockProvide = () => {
  const register = vi.fn();
  const select = vi.fn();
  const blur = vi.fn();
  return {
    provide: {
      register,
      select,
      blur,
    },
  };
};

describe("FeatherRadio.vue", () => {
  it("should call register", () => {
    const { provide } = mockProvide();
    getWrapper({ ...getSlot(), global: { provide } });
    expect(provide.register).toHaveBeenCalled();
  });
  it("should be focusable when first is set even if not checked", async () => {
    const wrapper = getWrapper({ ...getSlot(), global: { ...mockProvide() } });
    wrapper.vm.vm.first = true;
    await nextTick();
    expect(wrapper.vm.tabindex).toBe(0);
  });
  it("should call blur", () => {
    const { provide } = mockProvide();
    const wrapper = getWrapper({ ...getSlot(), global: { provide } });
    (wrapper.vm as unknown as { blur: () => void }).blur();
    expect(provide.blur).toHaveBeenCalled();
  });

  it("should call select from provide", () => {
    const { provide } = mockProvide();
    const value = 1;
    const wrapper = getWrapper({
      ...getSlot(),
      props: {
        value,
      },
      global: { provide },
    });

    wrapper.vm.click();
    expect(provide.select).toHaveBeenCalled();
  });

  it("should select element on click", async () => {
    const value = 1;
    const { provide } = mockProvide();
    const wrapper = getWrapper({
      ...getSlot(),
      props: {
        value,
      },
      global: { provide },
    });

    await wrapper.find("[role='radio']").trigger("click");
    expect(provide.select).toHaveBeenCalled();
  });
  it("should set aria-checked based on data", async () => {
    const wrapper = getWrapper({
      ...getSlot(),
      global: { ...mockProvide() },
    });
    wrapper.vm.vm.checked = true;
    await nextTick();
    expect(wrapper.element).toMatchSnapshot();
    wrapper.vm.vm.checked = false;
    await nextTick();
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should set aria-disabled based on property", async () => {
    const wrapper = getWrapper({
      ...getSlot(),
      props: {
        disabled: true,
      },
      global: { ...mockProvide() },
    });
    expect(wrapper.element).toMatchSnapshot();
    await wrapper.setProps({
      disabled: false,
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  describe("a11y", () => {
    it("be accessible when unchecked and enabled", async () => {
      const wrapper = getWrapper({
        ...getSlot(),
        global: { ...mockProvide() },
      });
      wrapper.vm.vm.checked = false;
      await nextTick();
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
    it("be accessible when checked and enabled", async () => {
      const wrapper = getWrapper({
        ...getSlot(),
        global: { ...mockProvide() },
      });
      wrapper.vm.vm.checked = true;
      await nextTick();
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
    it("be accessible when checked and disabled", async () => {
      const props = { disabled: true };
      const wrapper = getWrapper({
        ...getSlot(),
        props,
        global: { ...mockProvide() },
      });
      wrapper.vm.vm.checked = true;
      await nextTick();
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
    it("be accessible when unchecked and disabled", async () => {
      const props = { disabled: true };
      const wrapper = getWrapper({
        ...getSlot(),
        props,
        global: { ...mockProvide() },
      });
      wrapper.vm.vm.checked = false;
      await nextTick();
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
  });
});
