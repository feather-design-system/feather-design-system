import FeatherProtectedInput from "./FeatherProtectedInput.vue";
import { mount } from "@vue/test-utils";
import * as id from "@featherds/utils/id";
import "@featherds/input-helper/test/MutationObserver";

jest.spyOn(id, "getSafeId").mockImplementation((x) => x);
const getWrapper = function (options: Record<string, unknown> = {}) {
  options.props = {
    label: "TEST",
  };
  return mount(FeatherProtectedInput, options);
};

describe("FeatherProtectedInput.vue", () => {
  it("should render with show password icon by default", () => {
    const wrapper = getWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should change input type when show password is clicked", async () => {
    const wrapper = getWrapper();
    await wrapper
      .find("[data-ref-id='feather-input-password-icon']")
      .trigger("click");
    expect(wrapper.element).toMatchSnapshot();
  });
});
