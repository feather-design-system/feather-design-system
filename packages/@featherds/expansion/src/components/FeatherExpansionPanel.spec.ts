import FeatherExpansionPanel from "./FeatherExpansionPanel.vue";
import { mount } from "@vue/test-utils";

import axe from "@featherds/utils/test/axe";
import { getCalls } from "@featherds/utils/test/calls";
import * as id from "@featherds/utils/id";
jest.spyOn(id, "getSafeId").mockImplementation((x) => x);

const getWrapper = function () {
  const options = {
    slots,
    props: {
      title,
    },
  };
  return mount(FeatherExpansionPanel, options);
};
const title = "TITLE";
const slots = {
  default: "<p>I AM TEXT</p>",
};
describe("FeatherExpansionPanel.vue", () => {
  it("should toggle expanded value when button is clicked", async () => {
    const wrapper = getWrapper();
    const button = wrapper.find(
      "[data-ref-id='feather-expansion-header-button']"
    );
    await button.trigger("click");
    expect(button.attributes("aria-expanded")).toBe("true");
    expect(getCalls<[boolean]>(wrapper, "update:modelValue")[0][0]).toBe(true);
    await button.trigger("click");
    expect(button.attributes("aria-expanded")).toBe("false");
    expect(getCalls<[boolean]>(wrapper, "update:modelValue")[1][0]).toBe(false);
  });

  it("should not toggle expanded when disabled", async () => {
    const wrapper = getWrapper();
    await wrapper.setProps({ disabled: true });
    const button = wrapper.find(
      "[data-ref-id='feather-expansion-header-button']"
    );
    await button.trigger("click");
    expect(button.attributes("aria-expanded")).toBe("false");
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render content when expanded", async () => {
    const wrapper = getWrapper();
    await wrapper.setProps({ modelValue: true });

    expect(
      wrapper.find("[data-ref-id='feather-expansion-content']").isVisible()
    ).toBe(true);
  });
  it("should render loading", async () => {
    const wrapper = getWrapper();
    await wrapper.setProps({ modelValue: true, loading: true });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should have correct HTML structure", () => {
    const wrapper = getWrapper();

    expect(wrapper.element).toMatchSnapshot();
  });

  it("should be accessible", async () => {
    const wrapper = getWrapper();
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
