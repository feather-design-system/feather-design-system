import FeatherCard from "./FeatherCard.vue";
import { mount } from "@vue/test-utils";
import axe from "@featherds/utils/test/axe";

import { expect, describe, it } from "vitest";

const getWrapper = function (opts: Record<string, unknown>) {
  return mount(FeatherCard, opts);
};

describe("FeatherCard.vue", () => {
  it("should render as anchor html tag when href is specified", () => {
    const props = {
      title: "Anchor Card Title",
      href: "https://www.google.com",
    };
    const wrapper = getWrapper({ props });
    expect(wrapper.element.tagName).toBe("A");
  });

  it("should render as article html tag when href is NOT specified", () => {
    const props = {
      title: "Article Card Title",
    };
    const wrapper = getWrapper({ props });
    expect(wrapper.element.tagName).toBe("ARTICLE");
  });

  it("should render button when passed to actions slot ", () => {
    const props = {
      title: "Article Card With Buttons",
    };
    const slots = {
      actions: "<button>Ok</button>",
    };
    const wrapper = getWrapper({ props, slots });
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("should NOT render actions slot when href specified", () => {
    const props = {
      title: "Anchor Card No Buttons; Even if specified",
      href: "https://www.google.com",
    };
    const slots = {
      actions: "<button>Ok</button>",
    };
    const wrapper = getWrapper({ props, slots });
    expect(wrapper.find("button").exists()).toBe(false);
  });
});

describe("a11y", () => {
  it("should be accessible", async () => {
    const props = {
      title: "ally",
    };
    const wrapper = getWrapper({ props });
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
