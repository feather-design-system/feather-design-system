import FeatherRailGroup from "./FeatherRailGroup.vue";
import { shallowMount } from "@vue/test-utils";

const getWrapper = function (options) {
  return shallowMount(FeatherRailGroup, options);
};

describe("FeatherRailGroup.vue", () => {
  it("should render the component open with a label", () => {
    const wrapper = getWrapper({
      propsData: {
        label: "Test",
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
});
