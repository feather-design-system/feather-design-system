import CircularIndeterminate from "./CircularIndeterminate.vue";
import { mount } from "@vue/test-utils";
import axe from "@featherds/utils/test/axe";

import { describe, expect, it } from "vitest";

const getWrapper = (opts: Record<string, unknown>) =>
  mount(CircularIndeterminate, opts);

describe("CircularIndeterminate.vue", () => {
  it("should support large size by default", () => {
    const wrapper = getWrapper({});
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should support various sizes", async () => {
    const wrapper = getWrapper({});

    await wrapper.setProps({ size: "sm" });
    expect(wrapper.element).toMatchSnapshot();

    await wrapper.setProps({ size: "md" });
    expect(wrapper.element).toMatchSnapshot();

    await wrapper.setProps({ size: "lg" });
    expect(wrapper.element).toMatchSnapshot();
  });
});
describe("a11y", () => {
  it("should be accessible", async () => {
    const props = {
      title: "ally",
    };
    const wrapper = getWrapper({ props });
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
