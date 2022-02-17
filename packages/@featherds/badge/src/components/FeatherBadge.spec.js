import FeatherBadge from "./FeatherBadge.vue";
import TYPES from "../types/Types";
import { shallowMount } from "@vue/test-utils";

const getWrapper = function (options) {
  return shallowMount(FeatherBadge, options);
};

describe("FeatherBadge.vue", () => {
  it("should render single icon ", () => {
    const badge = {
      type: TYPES.INFO,
      title: "MESSAGE",
    };
    const wrapper = getWrapper({
      props: {
        badges: badge,
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should render multiple icon in correct order", () => {
    const badges = [
      {
        type: TYPES.ERROR,
        title: "MESSAGE",
      },
      {
        type: TYPES.INFO,
        title: "MESSAGE",
      },
    ];
    const wrapper = getWrapper({
      props: {
        badges: badges,
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should render single icon inline", () => {
    const badge = {
      type: TYPES.INFO,
      title: "MESSAGE",
    };
    const wrapper = getWrapper({
      props: {
        badges: badge,
        inline: true,
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should render multiple icon inline in correct order ", () => {
    const badges = [
      {
        type: TYPES.ERROR,
        title: "MESSAGE",
      },
      {
        type: TYPES.INFO,
        title: "MESSAGE",
      },
    ];
    const wrapper = getWrapper({
      props: {
        badges: badges,
        inline: true,
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
});
