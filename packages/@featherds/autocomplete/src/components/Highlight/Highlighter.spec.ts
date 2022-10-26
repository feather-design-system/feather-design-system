import Highlighter from "./Highlighter.vue";
import { shallowMount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
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
      expect(wrapper.element).toMatchSnapshot();
    });
    it("should highlight text at the start of the string", () => {
      const wrapper = getWrapper({
        props: {
          text: "abcd",
          highlight: "ignore-case",
          query: "ab",
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it("should highlight text at the end of the string", () => {
      const wrapper = getWrapper({
        props: {
          text: "abcd",
          highlight: "ignore-case",
          query: "cd",
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it("should not highlight when there isn't a match", () => {
      const wrapper = getWrapper({
        props: {
          text: "abcd",
          highlight: "ignore-case",
          query: "xx",
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it("should highlight reglardless of case", () => {
      const wrapper = getWrapper({
        props: {
          text: "aBCd",
          highlight: "ignore-case",
          query: "bc",
        },
      });
      expect(wrapper.element).toMatchSnapshot();
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
    expect(wrapper.element).toMatchSnapshot();
  });
});
