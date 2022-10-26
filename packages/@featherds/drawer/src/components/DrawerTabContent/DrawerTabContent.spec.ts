import { mount } from "@vue/test-utils";
import DrawerTabContent from "./DrawerTabContent.vue";
import { vi, expect, describe, it } from "vitest";
const header = "Test";
const content = "CONTENTNTNT";
const getWrapper = function () {
  return mount(DrawerTabContent, {
    slots: {
      default: `<span>${content}</span>`,
    },
    props: {
      header,
    },
    global: {
      provide: {
        registerPanel: vi.fn(),
      },
    },
  });
};

describe("DrawerTabContent.vue", () => {
  it("should render a header", () => {
    const wrapper = getWrapper();
    expect(wrapper.find("div.header").text().trim()).toBe(header);

    expect(wrapper.find("header").exists()).toBe(false);
  });
  it("should render content inside a div", () => {
    const wrapper = getWrapper();
    const drawerContent = wrapper.find(".drawer-tab-content .contents");
    expect(drawerContent.exists()).toBe(true);
    expect(drawerContent.text()).toBe(content);
  });
});
