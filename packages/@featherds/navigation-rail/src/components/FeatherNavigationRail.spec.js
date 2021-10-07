import FeatherNavigationRail from "./FeatherNavigationRail.vue";
import { shallowMount } from "@vue/test-utils";

const getWrapper = function (options) {
  return shallowMount(FeatherNavigationRail, options);
};

describe("FeatherNavigationRail.vue", () => {
  it("should render the component open when initial value is true", () => {
    const wrapper = getWrapper({
      propsData: {
        modelValue: true,
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should render the component closed when initial value is false", () => {
    const wrapper = getWrapper({
      propsData: {
        modelValue: false,
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should toggle state when chevron clicked", async () => {
    const wrapper = getWrapper({
      propsData: {
        modelValue: false,
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
    await wrapper.find(".expand-link").trigger("click");
    expect(wrapper.wrapperElement).toMatchSnapshot();
    expect(wrapper.emitted("update:modelValue")[0][0]).toBe(true);
  });
});
