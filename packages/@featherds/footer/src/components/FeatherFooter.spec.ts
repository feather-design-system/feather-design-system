import FeatherFooter from "./FeatherFooter.vue";
import { mount } from "@vue/test-utils";
import { expect, describe, it } from "vitest";

const copyright = "Test ${year}";
const getWrapper = function (options: Record<string, unknown> = {}) {
  options.props = {
    copyright,
  };
  return mount(FeatherFooter, options);
};

describe("FeatherFooter.vue", () => {
  it("should render copyright with year replaced", () => {
    const wrapper = getWrapper();
    const year = new Date().getFullYear();
    const result = copyright.replace(/\$\{year\}/g, year.toString());
    expect(wrapper.find(".copyright").text()).toBe(result);
  });
});
