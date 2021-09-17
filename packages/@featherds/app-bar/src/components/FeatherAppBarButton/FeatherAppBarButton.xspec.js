import { mount } from "@vue/test-utils";
import FeatherAppBarButton from "./FeatherAppBarButton.vue";

const getWrapper = function (options) {
  return mount(FeatherAppBarButton, options);
};

describe("FeatherAppBarButton.vue", () => {
  it("should render a menu button", () => {
    const wrapper = getWrapper();
    expect(wrapper.classes("btn-menu")).toBe(true);
  });
  it("should render a selected menu button", () => {
    const wrapper = getWrapper({
      propsData: {
        selected: true,
      },
    });
    expect(wrapper.classes("btn-menu")).toBe(true);
    expect(wrapper.classes("selected")).toBe(true);
  });

  it("should give the button the correct attributes", () => {
    const wrapper = getWrapper();
    expect(wrapper.attributes("aria-haspopup")).toBe("menu");
    expect(wrapper.attributes("aria-expanded")).toBe("false");
    wrapper.setProps({
      selected: true,
    });
    expect(wrapper.attributes("aria-expanded")).toBe("true");
    wrapper.setProps({
      selected: false,
    });
    expect(wrapper.attributes("aria-expanded")).toBe("false");
    expect(wrapper.attributes("aria-expanded")).toBe("true");
  });
});
