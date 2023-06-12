import FeatherToggleButton from "./FeatherToggleButton.vue";
import { mount } from "@vue/test-utils";
import axe from "@featherds/utils/test/axe";

import { expect, describe, it } from "vitest";
import { nextTick } from "vue";

const getWrapper = function (opts: Record<string, unknown>) {
  return mount(FeatherToggleButton, opts);
};

const props = {
  id: "tb",
  buttons: [
    {label: "Chart A"},
    {label: "Chart B"},
    {label: "Chart C"},
  ],
  selected: 0,
};

describe("FeatherToggleButton", async () => {
  it("should have buttons", async () => {
    const wrapper = getWrapper({ props });
    expect(wrapper.find(".toggle-btn").exists()).toBe(true);
  });

  it("should have one selected by default", async () => {

    const wrapper = getWrapper({ props });
    expect(wrapper.findAll(".toggle-btn").length).toBe(3);
    expect(wrapper.findAll(".toggle-btn.selected").length).toBe(1);
    expect(wrapper
      .find(".toggle-btn.selected > .toggle-label")
      .text())
      .toBe("Chart A");
  });

  it("should have one selected when clicking non-selected button ", async () => {

    const wrapper = getWrapper({ props });
    await nextTick();

    wrapper.find("button.toggle-btn:not(.selected)").trigger("click");

    expect(wrapper.emitted()).toBeDefined();
    expect(wrapper.emitted()).toHaveProperty('toggle-button-click');

    const emittedData = wrapper.emitted('toggle-button-click');
    expect(emittedData).toBeDefined();
    if (Array.isArray(emittedData)
        && emittedData.length > 0) {
      expect(emittedData[0][2]).toBe("Chart B");
    }
  });
});

describe("a11y", () => {
  it("should be accessible", async () => {

    const wrapper = getWrapper({ props });
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
