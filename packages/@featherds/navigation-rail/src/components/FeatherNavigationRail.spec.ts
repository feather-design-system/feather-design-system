import FeatherNavigationRail from "./FeatherNavigationRail.vue";
import FeatherRailItem from "./FeatherRailItem.vue";
import { shallowMount, mount } from "@vue/test-utils";
import axe from "@featherds/utils/test/axe";
import { getCalls } from "@featherds/utils/test/calls";
import { expect, describe, it } from "vitest";

const getWrapper = function (options: Record<string, unknown>) {
  return shallowMount(FeatherNavigationRail, options);
};

describe("FeatherNavigationRail.vue", () => {
  it("should render the component open when initial value is true", () => {
    const wrapper = getWrapper({
      propsData: {
        modelValue: true,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render the component closed when initial value is false", () => {
    const wrapper = getWrapper({
      propsData: {
        modelValue: false,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should toggle state when chevron clicked", async () => {
    const wrapper = getWrapper({
      propsData: {
        modelValue: false,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
    await wrapper.find(".expand-link").trigger("click");
    expect(wrapper.element).toMatchSnapshot();
    expect(getCalls<[boolean]>(wrapper, "update:modelValue")[0][0]).toBe(true);
  });
  it("should toggle state when chevron trigger by enter", async () => {
    const wrapper = getWrapper({
      propsData: {
        modelValue: false,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
    await wrapper.find(".expand-link").trigger("keydown.enter");
    expect(wrapper.element).toMatchSnapshot();
    expect(getCalls<[boolean]>(wrapper, "update:modelValue")[0][0]).toBe(true);
  });
  it("should toggle state when chevron trigger by space", async () => {
    const wrapper = getWrapper({
      propsData: {
        modelValue: false,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
    await wrapper.find(".expand-link").trigger("keydown.space");
    expect(wrapper.element).toMatchSnapshot();
    expect(getCalls<[boolean]>(wrapper, "update:modelValue")[0][0]).toBe(true);
  });
  it("should be accessible", async () => {
    const wrapper = mount(FeatherNavigationRail, {
      slots: {
        main: `<FeatherRailItem title="App One" href="#" /><FeatherRailItem title="App Two" href="#"/>`,
      },
      global: {
        components: {
          FeatherRailItem,
        },
      },
    });
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
