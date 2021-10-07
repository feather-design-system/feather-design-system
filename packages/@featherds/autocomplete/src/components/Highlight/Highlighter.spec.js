import Highlighter from "./Highlighter.vue";
import { shallowMount, config } from "@vue/test-utils";

config.renderStubDefaultSlot = true;

const getWrapper = function (options = {}) {
  return shallowMount(Highlighter, options);
};

describe("Highlighter", () => {
  describe("ignore case", () => {
    it("should highlight text in the middle of the string", () => {
      const wrapper = getWrapper({
        props: {
          text: "abcd",
          highlight: "ignore-case",
          query: "bc",
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it("should highlight text at the start of the string", () => {
      const wrapper = getWrapper({
        props: {
          text: "abcd",
          highlight: "ignore-case",
          query: "ab",
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it("should highlight text at the end of the string", () => {
      const wrapper = getWrapper({
        props: {
          text: "abcd",
          highlight: "ignore-case",
          query: "cd",
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it("should not highlight when there isn't a match", () => {
      const wrapper = getWrapper({
        props: {
          text: "abcd",
          highlight: "ignore-case",
          query: "xx",
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it("should highlight reglardless of case", () => {
      const wrapper = getWrapper({
        props: {
          text: "aBCd",
          highlight: "ignore-case",
          query: "bc",
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
  });
  it("should not highlight when turned off", () => {
    const wrapper = getWrapper({
      props: {
        text: "abcd",
        highlight: "off",
        query: "bc",
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
});
