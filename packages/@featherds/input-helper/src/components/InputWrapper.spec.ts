import InputWrapper from "./InputWrapper.vue";
import { mount } from "@vue/test-utils";
import "../../test/MutationObserver";
import { reactive } from "vue";
import { expect, describe, it } from "vitest";

const provide = (opts: unknown) => {
  return {
    wrapperOptions: reactive({
      label: "test",
      error: undefined,
      clear: "",
      background: false,
      disabled: false,
      inline: false,
      hideLabel: false,
      ...(opts as Record<string, unknown>),
    }),
  };
};
const getWrapper = function (options: Record<string, unknown> = {}) {
  const props = (options.props as Record<string, unknown>) || {};
  options.props = {
    ...props,
    for: "test",
  };
  const provideOptions = provide(options.provide);
  options.global = { provide: provideOptions };
  return {
    wrapper: mount(InputWrapper, options),
    options: provideOptions.wrapperOptions,
  };
};

describe("InputWrapper.vue", () => {
  it("should render a normal wrapper", () => {
    const { wrapper } = getWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render a raised label", () => {
    const { wrapper } = getWrapper({
      props: {
        raised: true,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render a focused border & raised label", () => {
    const { wrapper } = getWrapper({
      props: {
        focused: true,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should take into account any prefix elements when not raised", () => {
    const { wrapper } = getWrapper({
      slots: {
        default:
          "<div class='prefix' style='width:10px; display:inline-block;'></div><span>CONTENT</span>",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render in an error state", () => {
    const { wrapper } = getWrapper({
      provide: {
        error: "test",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render in disabled state", async () => {
    const { wrapper, options } = getWrapper({
      provide: {
        disabled: false,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
    options.disabled = true;
    await wrapper.vm.$nextTick();
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render clear icon when clear and show clear is set", () => {
    const { wrapper } = getWrapper({
      props: {
        showClear: true,
      },
      provide: {
        clear: "Clear Text",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render clear and error icons", () => {
    const { wrapper } = getWrapper({
      props: {
        showClear: true,
      },
      provide: {
        error: "Error Text",
        clear: "Clear Text",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should have an label data-ref", () => {
    const { wrapper } = getWrapper({
      provide: {
        label: "label",
      },
    });
    expect(
      wrapper.find("[data-ref-id='feather-form-element-label']").exists()
    ).toBe(true);
  });
  it("should hide the label when hideLabel is true", () => {
    const { wrapper } = getWrapper({
      provide: {
        hideLabel: true,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
