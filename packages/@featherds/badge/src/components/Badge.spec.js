import Badge from "./Badge.vue";
import TYPES from "../types/Types";
import { shallowMount } from "@vue/test-utils";

const getWrapper = function (options) {
  return shallowMount(Badge, options);
};

describe("Badge.vue", () => {
  it("should render correct type with title", async () => {
    const wrapper = getWrapper({
      props: {
        type: TYPES.ERROR,
        title: "TEST",
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
    await wrapper.setProps({
      type: TYPES.INFO,
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should render siblings modifier", async () => {
    const wrapper = getWrapper({
      props: {
        type: TYPES.ERROR,
        title: "TEST",
        siblings: true,
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
});
