import InputSubText from "./InputSubText.vue";
import { mount } from "@vue/test-utils";
import { ref } from "vue";

const provide = (opts) => {
  return {
    subTextOptions: {
      ...opts,
    },
  };
};
const getWrapper = function (options = {}) {
  options.props = {
    ...options.props,
    id: "test",
  };
  options.global = {
    provide: provide(options.global.provide),
  };
  return mount(InputSubText, options);
};

describe("InputSubText.vue", () => {
  it("should have an hint data-ref", () => {
    const wrapper = getWrapper({
      global: {
        provide: {
          hint: "HINT",
          error: "",
        },
      },
    });
    expect(
      wrapper.find("[data-ref-id='feather-form-element-hint']").exists()
    ).toBe(true);
  });

  it("should have an error data-ref", () => {
    const wrapper = getWrapper({
      global: {
        provide: {
          hint: "",
          error: "HINT",
        },
      },
    });
    expect(
      wrapper.find("[data-ref-id='feather-form-element-error']").exists()
    ).toBe(true);
  });
});
