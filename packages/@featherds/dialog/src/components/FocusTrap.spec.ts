import { mount } from "@vue/test-utils";
import FocusTrap from "./FocusTrap.vue";
import { vi, expect, describe, it, afterEach } from "vitest";
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

const getWrapper = function (options: Record<string, unknown>) {
  return mount(FocusTrap, options);
};
describe("FocusTrap.vue", () => {
  let wrapper: ReturnType<typeof getWrapper>;
  afterEach(() => {
    if (wrapper && wrapper.unmount) {
      wrapper.unmount();
    }
  });
  it("should add/remove events when enable changes", async () => {
    wrapper = getWrapper({ props: { enable: false }, slots });
    const addEvents = vi.spyOn(wrapper.vm, "addFocusTrapEvents");
    const removeEvents = vi.spyOn(wrapper.vm, "removeFocusTrapEvents");
    await wrapper.setProps({ enable: true });
    expect(addEvents).toHaveBeenCalled();
    await wrapper.setProps({ enable: false });
    expect(removeEvents).toHaveBeenCalled();
  });
  it("should try and focus first descendant when enable changes to true", async () => {
    wrapper = getWrapper({ props: { enable: false }, slots });
    const focusFirst = vi.spyOn(wrapper.vm, "attemptToFocusFirst");
    await wrapper.setProps({ enable: true });
    expect(focusFirst).toHaveBeenCalled();
  });
  it("should remove events when unmounted", () => {
    wrapper = getWrapper({ props: { enable: false }, slots });
    const removeEvents = vi.spyOn(wrapper.vm, "removeFocusTrapEvents");
    wrapper.unmount();
    expect(removeEvents).toHaveBeenCalled();
  });
  describe("focus", () => {
    describe("isFocusable", () => {
      it("should return true for focusable elements", () => {
        wrapper = getWrapper({ props, slots });
        const vm = wrapper.vm;
        expect(vm.isFocusable(document.createElement("input"))).toBe(true);
        expect(vm.isFocusable(document.createElement("button"))).toBe(true);
        expect(vm.isFocusable(document.createElement("select"))).toBe(true);
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
      it("should set lastFocus to event.target if it's inside content element", () =>
        new Promise((done) => {
          wrapper = getWrapper({ props, slots, attachTo: document.body });
          const vm = wrapper.vm;
          const first = wrapper.find("#first").element;
          vm.trapFocus();
          setTimeout(() => {
            expect(vm.lastFocus).toBe(first);
            done("");
          }, 1);
        }));
      it("should loop focus back to last element if focusing before", () => {
        vi.useFakeTimers({
          toFake: ["setTimeout", "clearTimeout"],
        });
        wrapper = getWrapper({ props, slots });
        const vm = wrapper.vm;

        //add an element before
        const button = document.createElement("BUTTON");
        button.id = "pre-button";
        const t = document.createTextNode("Test Button");
        button.appendChild(t);
        document.body.appendChild(button);

        document.body.appendChild(wrapper.element);
        //focus first element
        const first = wrapper.find("#first").element;
        vm.lastFocus = first;
        const butt = document.getElementById("pre-button") as HTMLElement;
        const last = wrapper.find("#last").element;

        //try to focus something before the trap
        butt.focus();
        vm.trapFocus();

        //should set focus to last
        vi.runAllTimers();
        expect(vm.lastFocus).toBe(last);
        document.body.removeChild(wrapper.element);
        document.body.removeChild(butt);
      });
      it("should loop focus back to first element if focusing after", () => {
        vi.useFakeTimers({
          toFake: ["setTimeout", "clearTimeout"],
        });
        wrapper = getWrapper({ props, slots });
        const vm = wrapper.vm;

        document.body.appendChild(wrapper.element);

        //add an element after
        const button = document.createElement("BUTTON");
        button.id = "post-button";
        const t = document.createTextNode("Test Button");
        button.appendChild(t);
        document.body.appendChild(button);

        //focus last element
        const first = wrapper.find("#first").element;
        const butt = document.getElementById("post-button") as HTMLElement;
        const last = wrapper.find("#last").element;
        vm.lastFocus = last;

        //try to focus something after the trap
        butt.focus();
        vm.trapFocus();

        //should set focus to first
        vi.runAllTimers();
        expect(vm.lastFocus).toBe(first);
        document.body.removeChild(wrapper.element);
        document.body.removeChild(butt);
      });
    });
    describe("focusFirstDescendant", () => {
      it("should focus first focusable item and return true", () => {
        wrapper = getWrapper({ props, slots });
        const vm = wrapper.vm;
        document.body.appendChild(wrapper.element);
        expect(vm.focusFirstDescendant(vm.$refs.content as HTMLElement)).toBe(
          true
        );
        const active = document.activeElement as HTMLElement;
        expect(active.id).toBe("first");
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
        expect(vm.focusLastDescendant(vm.$refs.content as HTMLElement)).toBe(
          true
        );
        const active = document.activeElement as HTMLElement;
        expect(active.id).toBe("last");
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
