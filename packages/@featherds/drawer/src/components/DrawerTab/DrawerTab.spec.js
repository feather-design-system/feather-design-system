import DrawerTab from "./DrawerTab.vue";
import { mount } from "@vue/test-utils";
const label = "LABEL";
const getWrapper = (options = {}) => {
  options.slots = {
    default: { template: "<span>X</span>" },
  };
  options.props = {
    label,
  };
  options.global = {
    provide: {
      registerTab: jest.fn(),
    },
  };
  return mount(DrawerTab, options);
};

describe("DrawerTab.vue", () => {
  describe("mouseEnter", () => {
    it("should set a timeout if there isnt one currently", async () => {
      const wrapper = getWrapper();
      expect(wrapper.vm.showLabelTimeout).toBe(0);
      wrapper.vm.mouseEnter();
      expect(wrapper.vm.showLabelTimeout).not.toBe(0);
    });
    it("should not set a timeout if it is selected", async () => {
      const wrapper = getWrapper();
      expect(wrapper.vm.showLabelTimeout).toBe(0);
      wrapper.vm.selected = true;
      wrapper.vm.mouseEnter();
      expect(wrapper.vm.showLabelTimeout).toBe(0);
    });
    it("should not set a timeout if one already exists", async () => {
      const wrapper = getWrapper();
      expect(wrapper.vm.showLabelTimeout).toBe(0);
      wrapper.vm.showLabelTimeout = 1000;
      wrapper.vm.mouseEnter();
      expect(wrapper.vm.showLabelTimeout).toBe(1000);
    });
    it("should not set a timeout if it is already shown", async () => {
      const wrapper = getWrapper();
      expect(wrapper.vm.showLabelTimeout).toBe(0);
      wrapper.vm.showLabel = true;
      wrapper.vm.mouseEnter();
      expect(wrapper.vm.showLabelTimeout).toBe(0);
    });
  });
  it("should have correct aria attributes", async () => {
    const wrapper = getWrapper();
    //test span with label
    const span = wrapper.find(".tab-label");
    expect(span.attributes()["aria-hidden"]).toBe("true");
  });
  describe("mouseLeave", () => {
    it("should call clear timeout, reset showLabelTimeout and hide label", async () => {
      const wrapper = getWrapper();
      wrapper.vm.showLabelTimeout = 1000;
      spyOn(window, "clearTimeout");
      wrapper.vm.mouseLeave();
      expect(clearTimeout).toHaveBeenCalled();
      expect(wrapper.vm.showLabel).toBe(false);
      expect(wrapper.vm.showLabelTimeout).toBe(0);
    });
  });
});
