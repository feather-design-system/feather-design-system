import FeatherProgressLinear from "./FeatherProgressLinear.vue";
import { mount } from "@vue/test-utils";
import axe from "@featherds/utils/test/axe";

import { expect, describe, it, vi } from "vitest";

const getWrapper = (opts: Record<string, unknown>) =>
  mount(FeatherProgressLinear, opts);

describe("FeatherProgressLinear.vue", () => {
  describe("Determinate", () => {
    it("should render with html progress tag", () => {
      const props = {
        id: "progress",
        value: 0,
      };
      const wrapper = getWrapper({ props });
      expect(wrapper.find("progress").exists()).toBe(true);
    });
    it("should be classified as determinate", () => {
      const props = {
        value: 0,
      };
      const wrapper = getWrapper({ props });
      expect(wrapper.element).toMatchSnapshot();
      // const container = wrapper.find(".feather-progress-container");
      // expect(container.classes()).toContain("determinate");
    });
    it("should present textual status when showPercentage is true", async () => {
      const props = {
        showPercentage: true,
        value: 0,
      };
      const wrapper = getWrapper({ props });
      expect(wrapper.element).toMatchSnapshot();

      await wrapper.setProps({ value: 25 });
      expect(wrapper.element).toMatchSnapshot();

      await wrapper.setProps({ value: 50 });
      expect(wrapper.element).toMatchSnapshot();
    });
    it("should NOT show textual status when showPercentage is false", async () => {
      const props = {
        showPercentage: false,
        value: 0,
      };
      const wrapper = getWrapper({ props });
      expect(wrapper.element).toMatchSnapshot();
      await wrapper.setProps({ value: 25 });
      expect(wrapper.element).toMatchSnapshot();
      await wrapper.setProps({ value: 50 });
      expect(wrapper.element).toMatchSnapshot();
    });
    it("should handle errors", async () => {
      const props = {
        error: "Error Message.",
        showPercentage: false,
        value: 0,
      };
      const slots = {
        error: "Error Message.",
      };

      const wrapper = getWrapper({ props, slots });

      await wrapper.setProps({ error: "" });
      expect(wrapper.element).toMatchSnapshot();

      await wrapper.setProps({ error: "Error Message." });
      expect(wrapper.element).toMatchSnapshot();
    });
    it("should transition to completed state", async () => {
      const props = {
        value: 0,
      };
      const wrapper = getWrapper({ props });
      await wrapper.setProps({ value: 50 });
      expect(wrapper.element).toMatchSnapshot();

      await wrapper.setProps({ value: 100 });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
  describe("Indeterminate", () => {
    it("should render with html progress tag", () => {
      const props = {};
      const wrapper = getWrapper({ props });
      expect(wrapper.find("progress").exists()).toBe(true);
    });
    it("should be classified as indeterminate", () => {
      const props = {};
      const wrapper = getWrapper({ props });
      expect(wrapper.element).toMatchSnapshot();
    });
    it("should ignore textual status when showPercentage is true", async () => {
      const props = {
        showPercentage: true,
      };
      const wrapper = getWrapper({ props });
      expect(wrapper.element).toMatchSnapshot();
    });
    it("should handle errors", async () => {
      const props = {
        // error: "Error Message.",
        error: "",
      };
      const slots = {
        // error: "Error Message.",
        error: "",
      };

      const wrapper = getWrapper({ props, slots });
      await wrapper.setProps({ error: "" });
      expect(wrapper.element).toMatchSnapshot();
      await wrapper.setProps({ error: "Error Message." });
      expect(wrapper.element).toMatchSnapshot();
    });
    it("should set label for indeterminate announcement", () => {
      vi.useFakeTimers();
      const wrapper = getWrapper({});
      setTimeout(() => {}, 500);
      vi.runAllTimers();
      vi.useRealTimers();
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
describe("a11y", () => {
  it("should be accessible", async () => {
    const props = {
      title: "a11y",
    };
    const wrapper = getWrapper({ props });
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
