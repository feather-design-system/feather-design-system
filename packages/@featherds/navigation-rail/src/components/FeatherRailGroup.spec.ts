import FeatherRailGroup from "./FeatherRailGroup.vue";
import { shallowMount } from "@vue/test-utils";
import { expect, describe, it } from "vitest";

const getWrapper = function (options: Record<string, unknown>) {
  return shallowMount(FeatherRailGroup, options);
};

describe("FeatherRailGroup.vue", () => {
  it("should render the component open with a label", () => {
    const wrapper = getWrapper({
      propsData: {
        label: "Test",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
