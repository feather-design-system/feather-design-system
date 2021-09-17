import { mount, config } from "@vue/test-utils";
import FocusTrap from "./FocusTrap.vue";

config.renderStubDefaultSlot = true;

const slots = {
  default: {
    template: `<div><h1>Drawer content</h1>
  <a id="first" href="something">Test</a>
  <a id="last" href="something">Test</a>
  </div>`,
  },
};

const props = {
  enable: true,
};

const getWrapper = function (options) {
  return mount(FocusTrap, options);
};
describe("FocusTrap.vue", () => {
  let wrapper;
  afterEach(() => {
    if (wrapper && wrapper.unmount) {
      wrapper.unmount();
    }
  });
  it("should add/remove events when enable changes", async () => {
    wrapper = getWrapper({ props: { enable: false }, slots });
    const addEvents = spyOn(wrapper.vm, "addFocusTrapEvents");
    const removeEvents = spyOn(wrapper.vm, "removeFocusTrapEvents");
    await wrapper.setProps({ enable: true });
    expect(addEvents).toHaveBeenCalled();
    await wrapper.setProps({ enable: false });
    expect(removeEvents).toHaveBeenCalled();
  });
  it("should try and focus first descendant when enable changes to true", async () => {
    wrapper = getWrapper({ props: { enable: false }, slots });
    const focusFirst = spyOn(wrapper.vm, "focusFirstDescendant");
    await wrapper.setProps({ enable: true });
    expect(focusFirst).toHaveBeenCalled();
  });
  it("should remove events when unmounted", () => {
    wrapper = getWrapper({ props: { enable: false }, slots });
    const removeEvents = spyOn(wrapper.vm, "removeFocusTrapEvents");
    wrapper.unmount();
    expect(removeEvents).toHaveBeenCalled();
  });
  describe("focus", () => {
    describe("isFocusable", () => {
      it("should return true for focusable elements", () => {
        wrapper = getWrapper({ props, slots });
        const vm = wrapper.vm;
        expect(vm.isFocusable(document.createElement("input"))).toBe(
          true,
          "Input"
        );
        expect(vm.isFocusable(document.createElement("button"))).toBe(
          true,
          "Button"
        );
        expect(vm.isFocusable(document.createElement("select"))).toBe(
          true,
          "Select"
        );
        expect(vm.isFocusable(document.createElement("a"))).toBe(false);
        const a = document.createElement("a");
        a.href = "/hello";
        expect(vm.isFocusable(a)).toBe(true);
        expect(vm.isFocusable(document.createElement("textarea"))).toBe(true);
        expect(vm.isFocusable(document.createElement("div"))).toBe(false);
        const div = document.createElement("div");
        div.tabIndex = 1;
        expect(vm.isFocusable(div)).toBe(true);
        const input = document.createElement("input");
        input.disabled = true;
        expect(vm.isFocusable(input)).toBe(false);
        const anchor = document.createElement("a");
        anchor.href = "/hello";
        anchor.tabIndex = -1;
        expect(vm.isFocusable(anchor)).toBe(false);
        input.disabled = false;
        input.type = "file";
        expect(vm.isFocusable(input)).toBe(false);
      });
    });
    describe("trapFocus", () => {
      it("should set lastFocus to event.target if it's inside content element", () => {
        wrapper = getWrapper({ props, slots, attachTo: document.body });
        const vm = wrapper.vm;
        const first = wrapper.find("#first").element;
        vm.trapFocus({ target: first });
        expect(vm.lastFocus).toBe(first);
      });
      it("should loop focus back to last element", () => {
        wrapper = getWrapper({ props, slots });
        const vm = wrapper.vm;
        document.body.appendChild(wrapper.element);
        //focus first element
        const first = wrapper.find("#first").element;
        vm.lastFocus = first;
        const last = wrapper.find("#last").element;
        //try to focus something outside of element
        vm.trapFocus({ target: document.body });
        //should set focus to last
        expect(vm.lastFocus).toBe(last);
        document.body.removeChild(wrapper.element);
      });
    });
    describe("focusFirstDescendant", () => {
      it("should focus first focusable item and return true", () => {
        wrapper = getWrapper({ props, slots });
        const vm = wrapper.vm;
        document.body.appendChild(wrapper.element);
        expect(vm.focusFirstDescendant(vm.$refs.content)).toBe(true);
        expect(document.activeElement.id).toBe("first");
        document.body.removeChild(wrapper.element);
      });
      it("should return false if nothing was focused", () => {
        wrapper = getWrapper({ props, slots });
        const vm = wrapper.vm;
        document.body.appendChild(wrapper.element);
        expect(vm.focusFirstDescendant(wrapper.find("h1").element)).toBe(false);
        document.body.removeChild(wrapper.element);
      });
    });
    describe("focusLastDescendant", () => {
      it("should focus last focusable item and return true", () => {
        wrapper = getWrapper({ props, slots });
        const vm = wrapper.vm;
        document.body.appendChild(wrapper.element);
        expect(vm.focusLastDescendant(vm.$refs.content)).toBe(true);
        expect(document.activeElement.id).toBe("last");
        document.body.removeChild(wrapper.element);
      });
      it("should return false if nothing was focused", () => {
        wrapper = getWrapper({ props, slots });
        const vm = wrapper.vm;
        document.body.appendChild(wrapper.element);
        expect(vm.focusLastDescendant(wrapper.find("h1").element)).toBe(false);
        document.body.removeChild(wrapper.element);
      });
    });
  });
});
