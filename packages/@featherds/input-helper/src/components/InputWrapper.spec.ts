import InputWrapper from "./InputWrapper.vue";
import { mount } from "@vue/test-utils";
import "../../test/MutationObserver";
import { ref } from "vue";
import { expect, describe, it } from "vitest";

const provide = (opts: unknown) => {
  return {
    wrapperOptions: {
      label: ref("test"),
      error: ref(undefined),
      clear: ref(""),
      background: ref(false),
      disabled: ref(false),
      inline: ref(false),
      hideLabel: ref(false),
      ...(opts as Record<string, unknown>),
    },
  };
};
const getWrapper = function (options: Record<string, unknown> = {}) {
  const props = (options.props as Record<string, unknown>) || {};
  options.props = {
    ...props,
    for: "test",
  };
  options.global = { provide: provide(options.provide) };
  return mount(InputWrapper, options);
};

describe("InputWrapper.vue", () => {
  it("should render a normal wrapper", () => {
    const wrapper = getWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render a raised label", () => {
    const wrapper = getWrapper({
      props: {
        raised: true,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render a focused border & raised label", () => {
    const wrapper = getWrapper({
      props: {
        focused: true,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should take into account any prefix elements when not raised", () => {
    const wrapper = getWrapper({
      slots: {
        default:
          "<div class='prefix' style='width:10px; display:inline-block;'></div><span>CONTENT</span>",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render in an error state", () => {
    const wrapper = getWrapper({
      provide: {
        error: ref("test"),
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render in disabled state", () => {
    const wrapper = getWrapper({
      provide: {
        disabled: ref(true),
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render clear icon when clear and show clear is set", () => {
    const wrapper = getWrapper({
      props: {
        showClear: true,
      },
      provide: {
        clear: ref("Clear Text"),
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render clear and error icons", () => {
    const wrapper = getWrapper({
      props: {
        showClear: true,
      },
      provide: {
        error: ref("Error Text"),
        clear: ref("Clear Text"),
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should have an label data-ref", () => {
    const wrapper = getWrapper({
      provide: {
        label: ref("label"),
      },
    });
    expect(
      wrapper.find("[data-ref-id='feather-form-element-label']").exists()
    ).toBe(true);
  });
  it("should hide the label when hideLabel is true", () => {
    const wrapper = getWrapper({
      provide: {
        hideLabel: true,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
