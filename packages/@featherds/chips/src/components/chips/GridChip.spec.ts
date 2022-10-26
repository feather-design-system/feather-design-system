import GridChip from "./GridChip.vue";
import { mount } from "@vue/test-utils";
import * as id from "@featherds/utils/id";
import { vi, expect, describe, it } from "vitest";
vi.spyOn(id, "getSafeId").mockImplementation((x) => x);

const getWrapper = function (options = {}, addIcon = false) {
  options = {
    ...options,
    ...getSlots(addIcon),
  };

  return mount(GridChip, options);
};
const getSlots = (withIcon = false) => {
  const slots = {
    slots: {
      default: "Test",
    },
  } as {
    slots: {
      default: string;
      icon?: { template: string };
    };
  };
  if (withIcon) {
    slots.slots.icon = { template: "<span>*</span>" };
  }
  return slots;
};

describe("GridChip", () => {
  it("should render a standard chip", () => {
    const wrapper = getWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render a standard chip with icon", () => {
    const wrapper = getWrapper({}, true);
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render a removable chip", async () => {
    const props = {};
    const slots = {};
    const attrs = {
      onDelete: vi.fn(() => {}),
    };
    const wrapper = getWrapper({ props, slots, attrs });
    await wrapper.find(".delete-icon").trigger("click");
    expect(attrs["onDelete"]).toHaveBeenCalled();
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render a disabled chip", () => {
    const props = {
      disabled: true,
    };
    const wrapper = getWrapper({ props });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should emit a click event", async () => {
    const props = {};
    const slots = {};
    const attrs = {
      onClick: vi.fn(() => {}),
    };
    const wrapper = getWrapper({ props, slots, attrs });
    await wrapper.find(".chip-label-button").trigger("click");
    expect(attrs["onClick"]).toHaveBeenCalled();
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render condensed", () => {
    const props = {
      condensed: true,
    };
    const wrapper = getWrapper({ props });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render condensed from a group", () => {
    const provide = {
      condensed: true,
    };
    const wrapper = getWrapper({ provide: provide });
    expect(wrapper.element).toMatchSnapshot();
  });
});
