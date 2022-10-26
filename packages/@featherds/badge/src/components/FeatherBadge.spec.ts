import FeatherBadge from "./FeatherBadge.vue";
import { BadgeTypes } from "../types/Types";
import { shallowMount } from "@vue/test-utils";
import { expect, describe, it } from "vitest";

const getWrapper = function (options: Record<string, unknown>) {
  return shallowMount(FeatherBadge, options);
};

describe("FeatherBadge.vue", () => {
  it("should render single icon ", () => {
    const badge = {
      type: BadgeTypes.info,
      title: "MESSAGE",
    };
    const wrapper = getWrapper({
      props: {
        badges: badge,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render multiple icon in correct order", () => {
    const badges = [
      {
        type: BadgeTypes.error,
        title: "MESSAGE",
      },
      {
        type: BadgeTypes.info,
        title: "MESSAGE",
      },
    ];
    const wrapper = getWrapper({
      props: {
        badges: badges,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render single icon inline", () => {
    const badge = {
      type: BadgeTypes.info,
      title: "MESSAGE",
    };
    const wrapper = getWrapper({
      props: {
        badges: badge,
        inline: true,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render multiple icon inline in correct order ", () => {
    const badges = [
      {
        type: BadgeTypes.error,
        title: "MESSAGE",
      },
      {
        type: BadgeTypes.info,
        title: "MESSAGE",
      },
    ];
    const wrapper = getWrapper({
      props: {
        badges: badges,
        inline: true,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
