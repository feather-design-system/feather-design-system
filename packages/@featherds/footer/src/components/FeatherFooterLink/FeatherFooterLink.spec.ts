import FeatherFooterLink from "./FeatherFooterLink.vue";
import { mount } from "@vue/test-utils";
import { expect, describe, it } from "vitest";

const href = "test";
const getWrapper = function (options: Record<string, unknown> = {}) {
  options.props = {
    href,
  };
  return mount(FeatherFooterLink, options);
};

describe("FeatherFooterLink.vue", () => {
  it("should render copyright with year replaced", () => {
    const defaultSlot = "slot";
    const wrapper = getWrapper({
      slots: {
        default: defaultSlot,
      },
    });
    const anchor = wrapper.find("a");
    expect(anchor.attributes("href")).toBe(href);
    expect(anchor.text()).toBe(defaultSlot);
  });
});
