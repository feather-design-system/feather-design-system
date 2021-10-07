import FeatherButton from "./FeatherButton.vue";
import { mount } from "@vue/test-utils";
import axe from "@featherds/utils/test/axe";
const getWrapper = function (opts) {
  return mount(FeatherButton, opts);
};

const hasClass = (el, cl) => {
  expect(el.classList.contains("btn-primary")).toBe("btn-primary" === cl);
  expect(el.classList.contains("btn-secondary")).toBe("btn-secondary" === cl);
  expect(el.classList.contains("btn-text")).toBe("btn-text" === cl);
};

describe("FeatherButton.vue", () => {
  it("should render a button", () => {
    const props = {
      primary: true,
    };
    const wrapper = getWrapper({ props });
    expect(wrapper.element.tagName).toBe("BUTTON");
    const attrs = wrapper.attributes();
    expect(attrs["type"]).toBe("button");
  });
  it("should render a submit button", () => {
    const props = {
      primary: true,
    };
    const attrs = { type: "submit" };
    const wrapper = getWrapper({ props, attrs });
    expect(wrapper.element.tagName).toBe("BUTTON");
    const type = wrapper.attributes("type");
    expect(type).toBe("submit");
  });
  it("should render an anchor", () => {
    const props = {
      primary: true,
      asAnchor: true,
    };
    const wrapper = getWrapper({ props });
    expect(wrapper.element.tagName).toBe("A");
    const attrs = wrapper.attributes();
    expect(attrs["role"]).toBe("button");
  });
  it("should have correct primary class", () => {
    const props = {
      primary: true,
    };
    const wrapper = getWrapper({ props });
    expect(wrapper.element.classList.contains("btn")).toBe(true);
    hasClass(wrapper.element, "btn-primary");
  });
  xit("should have correct fab button classes", () => {
    const props = {
      fab: true,
    };
    const wrapper = getWrapper({ props });
    expect(wrapper.element.classList.contains("btn")).toBe(true);
    expect(wrapper.element.classList.contains("btn-fab")).toBe(true);
    expect(wrapper.element.classList.contains("btn-icon")).toBe(true);
    hasClass(wrapper.element, "btn-primary");
  });
  it("should have correct secondary class", () => {
    const props = {
      secondary: true,
    };
    const wrapper = getWrapper({ props });
    expect(wrapper.element.classList.contains("btn")).toBe(true);
    hasClass(wrapper.element, "btn-secondary");
  });
  it("should have correct text class", () => {
    const props = {
      text: true,
    };
    const wrapper = getWrapper({ props });
    expect(wrapper.element.classList.contains("btn")).toBe(true);
    hasClass(wrapper.element, "btn-text");
  });
  it("should have correct link class", () => {
    const props = {
      link: true,
    };
    const wrapper = getWrapper({ props });
    expect(wrapper.element.classList.contains("btn")).toBe(true);
    hasClass(wrapper.element, "btn-link");
  });
  it("should display icon with default slot text as title and aria-label ", () => {
    const props = {
      icon: "label",
      primary: true,
    };
    const slots = {
      default: { template: "<i id='icon'/>" },
    };
    const wrapper = getWrapper({ props, slots });
    const attr = wrapper.attributes();
    expect(wrapper.element.classList.contains("btn-icon")).toBe(true);
    expect(attr["title"]).toBe("label");
    expect(attr["aria-label"]).toBe("label");
    expect(wrapper.find("#icon")).toBeDefined();
  });
  it("should set disabled attribute", () => {
    const props = {
      primary: true,
      disabled: true,
    };
    const slots = {
      default: { template: "<i id='icon'/>" },
    };
    const wrapper = getWrapper({ props, slots });
    const attr = wrapper.attributes();
    expect(attr["aria-disabled"]).toBe("true");
  });
  it("should emit disabled-click event", () => {
    const props = {
      primary: true,
      disabled: true,
    };
    const slots = {
      default: { template: "<i id='icon'/>" },
    };
    const attrs = {
      onDisabledClick: jest.fn(() => {}),
      onClick: jest.fn(() => {}),
    };
    const wrapper = getWrapper({ props, slots, attrs });
    wrapper.trigger("click");
    expect(attrs.onDisabledClick).toHaveBeenCalled();
    expect(attrs.onClick).not.toHaveBeenCalled();
  });
  describe("a11y", () => {
    it("should be accesible with just primary button", async () => {
      const props = {
        primary: true,
      };
      const slots = {
        default: { template: "<span>Test</span>" },
      };
      const wrapper = getWrapper({ slots, props });
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
    it("should be accesible with just primary button as anchor", async () => {
      const props = {
        primary: true,
        asAnchor: true,
      };
      const slots = {
        default: { template: "<span>Test</span>" },
      };
      const wrapper = getWrapper({ slots, props });
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
    it("should be accessible with just primary icon button", async () => {
      const props = {
        primary: true,
        icon: "Test",
      };
      const slots = {
        default: { template: "<svg id='icon'/>" },
      };
      const wrapper = getWrapper({ slots, props });
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
    it("should be accessible with just primary icon button as anchor", async () => {
      const props = {
        primary: true,
        icon: "Test",
        asAnchor: true,
      };
      const slots = {
        default: { template: "<svg id='icon'/>" },
      };
      const wrapper = getWrapper({ slots, props });
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
    it("should be accessible with disabled primary button", async () => {
      const props = {
        primary: true,
        disabled: true,
      };
      const slots = {
        default: { template: "<span>Test</span>" },
      };
      const wrapper = getWrapper({ slots, props });
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
    it("should be accessible with disabled primary button as anchor", async () => {
      const props = {
        primary: true,
        disabled: true,
        asAnchor: true,
      };
      const slots = {
        default: { template: "<span>Test</span>" },
      };
      const wrapper = getWrapper({ slots, props });
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
    it("should be accessible with text and icon in primary button", async () => {
      const props = {
        primary: true,
      };
      const slots = {
        default: { template: "<span>Test</span>" },
        icon: { template: "<svg id='icon'/>" },
      };
      const wrapper = getWrapper({ slots, props });
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
    it("should be accessible with text and icon in primary button as anchor", async () => {
      const props = {
        primary: true,
        asAnchor: true,
      };
      const slots = {
        default: { template: "<span>Test</span>" },
        icon: { template: "<svg id='icon'/>" },
      };
      const wrapper = getWrapper({ slots, props });
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
  });
});
