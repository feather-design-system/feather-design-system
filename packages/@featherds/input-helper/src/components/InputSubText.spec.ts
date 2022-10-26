import InputSubText from "./InputSubText.vue";
import { mount } from "@vue/test-utils";
import { expect, describe, it } from "vitest";

const provide = (opts: unknown) => {
  return {
    subTextOptions: {
      ...(opts as Record<string, unknown>),
    },
  };
};
const getWrapper = function (options: Record<string, unknown> = {}) {
  const props = (options.props as Record<string, unknown>) || {};
  options.props = {
    ...props,
    id: "test",
  };
  options.global = {
    provide: provide((options.global as Record<string, unknown>).provide),
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
          inline: false,
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
          inline: false,
        },
      },
    });
    expect(
      wrapper.find("[data-ref-id='feather-form-element-error']").exists()
    ).toBe(true);
  });
});
