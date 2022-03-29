import { mount } from "@vue/test-utils";
import axe from "axe-core";
import FeatherDrawer from "./FeatherDrawer.vue";
import { getCalls } from "@featherds/utils/test/calls";
const slots = {
  default: {
    template: `<div><h1>Drawer content</h1>
  <a id="first" href="something">Test</a>
  <a id="last" href="something">Test</a>
  </div>`,
  },
};

const FocusTrap = {
  template: "<div><slot /></div>",
};
const titleText = "test";
const closeText = "close";
const DialogClose = {
  template: '<a href="#" class="menu-close">Close</a>',
};

const getprops = (modelValue: boolean) => ({
  modelValue,
  width: "30%",
  closeText,
  titleText,
});

const getWrapper = function (options: Record<string, unknown>) {
  const global = (options.global as Object) || {};
  options.global = {
    ...global,
    stubs: {
      "focus-trap": FocusTrap,
      "dialog-close": DialogClose,
    },
  };
  return mount(FeatherDrawer, options);
};

describe("FeatherDrawer.vue", () => {
  it("should show drawer when modelValue prop changes", async () => {
    const wrapper = getWrapper({ props: getprops(false), slots });
    expect(wrapper.find(".content").isVisible()).toBe(false);
    await wrapper.setProps({ modelValue: true });
    expect(wrapper.find(".content").isVisible()).toBe(true);
    await wrapper.setProps({ modelValue: false });
    expect(wrapper.find(".content").isVisible()).toBe(false);
  });
  describe("close()", () => {
    it("should trigger change event with false", () => {
      const wrapper = getWrapper({ props: getprops(true), slots });
      wrapper.vm.close();
      expect(getCalls<[boolean]>(wrapper, "update:modelValue")[0][0]).toBe(
        false
      );
    });
  });

  describe("a11y", () => {
    it("should have no accessibility errors when closed", (done) => {
      const wrapper = getWrapper({ props: getprops(false), slots });
      document.body.appendChild(wrapper.element);
      axe.run(
        wrapper.element,
        {
          runOnly: {
            type: "tag",
            values: ["wcag2a", "wcag2aa"],
          },
        },
        (err, result) => {
          expect(err).toBe(null);
          expect(result.violations.length).toBe(0);
          result.violations.forEach((v) => {
            //eslint-disable-next-line
            console.error(
              `${v.description} at ${v.nodes.map((n) => n.target).join(", ")}`
            );
          });
          document.body.removeChild(wrapper.element);
          done();
        }
      );
    });
    it("should have no accessibility errors when open", (done) => {
      const wrapper = getWrapper({ props: getprops(true), slots });
      document.body.appendChild(wrapper.element);
      axe.run(
        wrapper.element,
        {
          runOnly: {
            type: "tag",
            values: ["wcag2a", "wcag2aa"],
          },
        },
        (err, result) => {
          expect(err).toBe(null);
          expect(result.violations.length).toBe(0);
          result.violations.forEach((v) => {
            //eslint-disable-next-line
            console.error(
              `${v.description} at ${v.nodes.map((n) => n.target).join(", ")}`
            );
          });
          document.body.removeChild(wrapper.element);
          done();
        }
      );
    });
  });
});
