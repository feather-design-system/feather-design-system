import Badge from "./Badge.vue";
import { BadgeTypes } from "../types/Types";
import { shallowMount } from "@vue/test-utils";

const getWrapper = function (options: Record<string, unknown>) {
  return shallowMount(Badge, options);
};

describe("Badge.vue", () => {
  it("should render correct type with title", async () => {
    const wrapper = getWrapper({
      props: {
        type: BadgeTypes.error,
        title: "TEST",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
    await wrapper.setProps({
      type: BadgeTypes.info,
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render siblings modifier", async () => {
    const wrapper = getWrapper({
      props: {
        type: BadgeTypes.error,
        title: "TEST",
        siblings: true,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
