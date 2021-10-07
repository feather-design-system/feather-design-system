import { mount } from "@vue/test-utils";
import axe from "axe-core";
import FeatherDialog from "./FeatherDialog.vue";
const slots = {
  default: {
    template: `<div><h1>Dialog content</h1>
  <a id="first" href="something">Test</a>
  <a id="last" href="something">Test</a>
  </div>`,
  },
};

const focusTrap = {
  template: "<div><slot /></div>",
};
const title = "test";
const close = "close";

const getprops = (visible) => ({
  visible,
  labels: {
    title,
    close,
  },
});

const getWrapper = function (options) {
  if (!options.global) {
    options.global = {};
  }
  options.global.stubs = {
    "focus-trap": focusTrap,
  };
  return mount(FeatherDialog, options);
};

describe("FeatherDialog.vue", () => {
  it("should show dialog when visible prop changes", async () => {
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
      expect(wrapper.emitted("update:modelValue")[0][0]).toBe(false);
    });
  });
  describe("close icon", () => {
    it("should close dialog when close is clicked", async () => {
      const wrapper = getWrapper({ props: getprops(true), slots });
      await wrapper.find(".closeButton").trigger("click");
      expect(wrapper.emitted("update:modelValue")[0][0]).toBe(false);
    });
    it("should not display a close icon when disabled", async () => {
      const wrapper = getWrapper({ props: getprops(true), slots });
      await wrapper.setProps({ hideClose: true });
      expect(wrapper.find(".closeButton").exists()).toBe(false);
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
