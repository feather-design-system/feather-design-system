import { mount } from "@vue/test-utils";
import axe from "@featherds/utils/test/axe";
import FeatherDialog from "./FeatherDialog.vue";
import { getCalls } from "@featherds/utils/test/calls";
import { expect, describe, it } from "vitest";

const slots = {
  default: {
    template: `<div><h1>Dialog content</h1>
  <a id="first" href="something">Test</a>
  <a id="last" href="something">Test</a>
  </div>`,
  },
};

const focusTrap = {
  template: "<div><slot /></div>",
};
const title = "test";
const close = "close";

const getprops = (visible: boolean) => ({
  modelValue: visible,
  labels: {
    title,
    close,
  },
});

const getWrapper = function (options: Record<string, unknown>) {
  const global = (options.global as Object) || {};
  options.global = {
    ...global,
    stubs: {
      "focus-trap": focusTrap,
    },
  };
  return mount(FeatherDialog, options);
};

describe("FeatherDialog.vue", () => {
  it("should show dialog when visible prop changes", async () => {
    const wrapper = getWrapper({ props: getprops(false), slots });
    expect(wrapper.find(".content").exists()).toBe(false);
    await wrapper.setProps({ modelValue: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".content").exists()).toBe(true);
    await wrapper.setProps({ modelValue: false });
    expect(wrapper.find(".content").exists()).toBe(false);
  });

  describe("close()", () => {
    it("should trigger change event with false", () => {
      const wrapper = getWrapper({ props: getprops(true), slots });
      wrapper.vm.close();
      expect(getCalls<[boolean]>(wrapper, "update:modelValue")[0]![0]).toBe(
        false
      );
    });
  });
  describe("close icon", () => {
    it("should close dialog when close is clicked", async () => {
      const wrapper = getWrapper({ props: getprops(true), slots });
      await wrapper.find(".closeButton").trigger("click");
      expect(getCalls<[boolean]>(wrapper, "update:modelValue")[0]![0]).toBe(
        false
      );
    });
    it("should not display a close icon when disabled", async () => {
      const wrapper = getWrapper({ props: getprops(true), slots });
      await wrapper.setProps({ hideClose: true });
      expect(wrapper.find(".closeButton").exists()).toBe(false);
    });
  });

  describe("a11y", () => {
    it("should have no accessibility errors when closed", async () => {
      const wrapper = getWrapper({ props: getprops(false), slots });
      document.body.appendChild(wrapper.element);
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
    it("should have no accessibility errors when open", async () => {
      const wrapper = getWrapper({ props: getprops(true), slots });
      document.body.appendChild(wrapper.element);
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
  });
});
