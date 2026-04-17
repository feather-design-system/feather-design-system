import FeatherProgressCircular from "./FeatherProgressCircular.vue";
import { mount } from "@vue/test-utils";
import axe from "@featherds/utils/test/axe";
// import { _setTimeout } from "@featherds/utils/setTimeout";

import { expect, describe, it, vi } from "vitest";

const getWrapper = (opts: Record<string, unknown>) =>
  mount(FeatherProgressCircular, opts);

describe("FeatherProgressCircular.vue", () => {
  describe("Determinate", () => {
    it("should render as html progress tag", () => {
      const props = { value: 0 };
      const wrapper = getWrapper({ props });
      expect(wrapper.find("progress").exists()).toBe(true);
    });
    it("should have container classified as determinate", () => {
      const props = { value: 0 };
      const wrapper = getWrapper({ props });
      expect(wrapper.element).toMatchSnapshot();
    });
    it("should support large size by default", () => {
      const props = { value: 0 };
      const wrapper = getWrapper({ props });
      expect(wrapper.element).toMatchSnapshot();
    });
    it("should render various sizes", async () => {
      const props = { value: 0 };
      const wrapper = getWrapper({ props });
      // const circular = wrapper.find(".feather-progress-circular");

      await wrapper.setProps({ size: "sm" });
      expect(wrapper.element).toMatchSnapshot();

      await wrapper.setProps({ size: "md" });
      expect(wrapper.element).toMatchSnapshot();

      await wrapper.setProps({ size: "lg" });
      expect(wrapper.element).toMatchSnapshot();
    });
    it("should handle errors", async () => {
      const props = {
        error: "",
        showPercentage: false,
        value: 0,
      };
      const slots = {
        error: "",
      };

      const wrapper = getWrapper({ props, slots });

      await wrapper.setProps({ error: "" });
      expect(wrapper.element).toMatchSnapshot();

      await wrapper.setProps({ error: "Error Message." });
      expect(wrapper.element).toMatchSnapshot();
    });
    it("should calculate strokeDashoffset", async () => {
      const props = {
        value: 0,
      };
      const wrapper = getWrapper(props);
      await wrapper.setProps({ value: 0 });
      expect(wrapper.element).toMatchSnapshot();

      await wrapper.setProps({ value: 100 });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
  describe("Indeterminate", () => {
    it("should render as html progress tag", () => {
      const wrapper = getWrapper({});
      expect(wrapper.find("progress").exists()).toBe(true);
    });
    it("should be classified as indeterminate", () => {
      const wrapper = getWrapper({});
      expect(wrapper.element).toMatchSnapshot();
    });
    it("should support large size by default", () => {
      const wrapper = getWrapper({});
      expect(wrapper.element).toMatchSnapshot();
    });
    it("should render various sizes", async () => {
      const wrapper = getWrapper({});

      await wrapper.setProps({ size: "sm" });
      expect(wrapper.element).toMatchSnapshot();

      await wrapper.setProps({ size: "md" });
      expect(wrapper.element).toMatchSnapshot();

      await wrapper.setProps({ size: "lg" });
      expect(wrapper.element).toMatchSnapshot();
    });
    it("should handle errors", async () => {
      const props = {
        error: "",
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
    it("should announce indeterminate message on mount", async () => {
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
