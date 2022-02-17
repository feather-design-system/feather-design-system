import FeatherSelect from "./FeatherSelect.vue";
import { shallowMount, mount } from "@vue/test-utils";
import * as id from "@featherds/utils/id";
import axe from "@featherds/utils/test/axe";
import "@featherds/input-helper/test/MutationObserver";
import { nextTick } from "vue";

jest.spyOn(id, "getSafeId").mockImplementation((x) => x);

const getProps = (props) => {
  return {
    label: "Users",
    ...props,
  };
};

const options = [
  {
    _text: "Item 1",
  },
  {
    _text: "Item 2",
  },
];
const getWrapper = function (options = {}) {
  options.props = getProps(options.props || {});
  options.attachTo = document.body;
  return shallowMount(FeatherSelect, options);
};
const getFullWrapper = function (options = {}) {
  document.body.innerHTML = "";
  options.props = getProps(options.props || {});
  options.attachTo = document.body;
  return mount(FeatherSelect, options);
};

describe("FeatherSelect.vue", () => {
  it("should raise the label when it has a value", () => {
    const modelValue = {
      _text: "Test1",
    };
    const wrapper = getFullWrapper({
      props: {
        modelValue,
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should not raise the label when its empty", () => {
    const wrapper = getFullWrapper();
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should render in error state", () => {
    const wrapper = getFullWrapper({
      props: {
        error: "ERROR",
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should render in disabled state", () => {
    const wrapper = getFullWrapper({
      props: {
        disabled: true,
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should open the menu on enter", async () => {
    const wrapper = getFullWrapper({
      props: {
        options,
      },
    });
    await wrapper.find("input").trigger("focus");
    await wrapper.find("input").trigger("keydown.enter");
    expect(wrapper.vm.showMenu).toBe(true);
  });
  it("should close the menu on esc and emit update:modelValue", async () => {
    const wrapper = getFullWrapper({
      props: {
        options,
      },
    });
    await wrapper.find("input").trigger("focus");
    await wrapper.find("input").trigger("keydown.enter");
    await wrapper.find("input").trigger("keydown.esc");
    expect(wrapper.vm.showMenu).toBe(false);
    expect(wrapper.emitted("update:modelValue")[0][0]).toStrictEqual(
      options[0]
    );
  });

  it("should clear the value when clear icon is clicked", async () => {
    const modelValue = {
      _text: "Test1",
    };
    const wrapper = getFullWrapper({
      props: {
        modelValue,
        clear: "Clear Value",
      },
    });
    await wrapper
      .find("[data-ref-id='feather-form-element-clear']")
      .trigger("click");
    expect(wrapper.emitted("update:modelValue")[0][0]).toBeUndefined();
  });
  it("should open and select first item on first down", async () => {
    const wrapper = getFullWrapper({
      props: {
        options,
      },
    });
    await wrapper.find("input").trigger("focus");
    await wrapper.find("input").trigger("keydown.down");
    expect(wrapper.vm.showMenu).toBe(true);
    expect(wrapper.vm.internalValue).toStrictEqual(options[0]);
  });
  it("should open and select first item on first up", async () => {
    const wrapper = getFullWrapper({
      props: {
        options,
      },
    });
    await wrapper.find("input").trigger("focus");
    await wrapper.find("input").trigger("keydown.up");
    expect(wrapper.vm.showMenu).toBe(true);
    expect(wrapper.vm.internalValue).toStrictEqual(options[0]);
  });
  it("should move selection down when down arrow is pressed and menu is open", async () => {
    const wrapper = getFullWrapper({
      props: {
        options,
        modelValue: options[0],
      },
    });
    await wrapper.find("input").trigger("focus");
    await wrapper.find("input").trigger("keydown.down");
    expect(wrapper.vm.showMenu).toBe(true);
    expect(wrapper.vm.internalValue).toStrictEqual(options[1]);
  });
  it("should not emit update:model till menu is closed", async () => {
    const wrapper = getFullWrapper({
      props: {
        options,
        modelValue: options[0],
      },
    });
    await wrapper.find("input").trigger("focus");
    await wrapper.find("input").trigger("keydown.down");
    expect(wrapper.vm.showMenu).toBe(true);
    await wrapper.find("input").trigger("keydown.esc");
    expect(wrapper.vm.showMenu).toBe(false);
    expect(wrapper.emitted("update:modelValue")[0][0]).toStrictEqual(
      options[1]
    );
  });
  it("should not wrap to the top when down is pressed on the last option", async () => {
    const wrapper = getFullWrapper({
      props: {
        options,
        modelValue: options[options.length - 1],
      },
    });
    await wrapper.find("input").trigger("focus");
    await wrapper.find("input").trigger("keydown.down");
    expect(wrapper.vm.showMenu).toBe(true);
    expect(wrapper.vm.internalValue).toStrictEqual(options[options.length - 1]);
  });
  it("should move selection up when up arrow is pressed and menu is open", async () => {
    const wrapper = getFullWrapper({
      props: {
        options,
        modelValue: options[options.length - 1],
      },
    });
    await wrapper.find("input").trigger("focus");
    await wrapper.find("input").trigger("keydown.up");
    expect(wrapper.vm.showMenu).toBe(true);
    expect(wrapper.vm.internalValue).toStrictEqual(options[options.length - 2]);
  });
  it("should not wrap to the bottom when up is pressed on the first option", async () => {
    const wrapper = getFullWrapper({
      props: {
        options,
        modelValue: options[0],
      },
    });
    await wrapper.find("input").trigger("focus");
    await wrapper.find("input").trigger("keydown.up");
    expect(wrapper.vm.showMenu).toBe(true);
    expect(wrapper.vm.internalValue).toStrictEqual(options[0]);
  });
  it("should move selection to first item  when home is pressed and menu is open", async () => {
    const wrapper = getFullWrapper({
      props: {
        options,
        modelValue: options[options.length - 1],
      },
    });
    await wrapper.find("input").trigger("focus");
    await wrapper.find("input").trigger("keydown.home");
    await nextTick();
    expect(wrapper.vm.showMenu).toBe(true);
    expect(wrapper.vm.internalValue).toStrictEqual(options[0]);
  });
  it("should move selection to last item when end is pressed and menu is open", async () => {
    const wrapper = getFullWrapper({
      props: {
        options,
        modelValue: options[0],
      },
    });
    await wrapper.find("input").trigger("focus");
    await wrapper.find("input").trigger("keydown.end");
    expect(wrapper.vm.showMenu).toBe(true);
    expect(wrapper.vm.internalValue).toStrictEqual(options[options.length - 1]);
  });
  it("should remain focused when item is selected via click and emit update:modelValue", async () => {
    const wrapper = getFullWrapper({
      props: {
        options,
      },
    });
    await wrapper.find("input").trigger("focus");
    await wrapper.find("input").trigger("keydown.enter"); //open menu
    wrapper.findComponent({ ref: "list" }).vm.$emit("select", options[0]);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showMenu).toBe(false);
    expect(document.activeElement).toBe(wrapper.find("input").element);
    expect(wrapper.emitted("update:modelValue")[0][0]).toStrictEqual(
      options[0]
    );
  });
  it("should not open menu when focused (tabbed to)", async () => {
    const wrapper = getFullWrapper({
      props: {
        options,
      },
    });
    await wrapper.find("input").trigger("focus");
    expect(wrapper.vm.showMenu).toBe(false);
  });
  it("should select item that starts with a character sequence when it is quickly typed", async () => {
    jest.useFakeTimers();

    const wrapper = getFullWrapper({
      props: {
        options: options.concat([{ _text: "ab" }]),
      },
    });
    await wrapper.find("input").trigger("focus");
    await wrapper.find("input").trigger("keydown.enter");
    await wrapper.find("input").trigger("keydown", {
      keyCode: 65,
    });
    await wrapper.find("input").trigger("keydown", {
      keyCode: 66,
    });
    jest.runAllTimers();
    expect(wrapper.vm.internalValue._text.indexOf("ab")).toBe(0);
  });
  describe("accessibility", () => {
    it("should be accessible in normal state", async () => {
      jest.useRealTimers();

      const wrapper = getFullWrapper();
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
    it("should be accessible in open state with value", async () => {
      jest.useRealTimers();

      const wrapper = getFullWrapper({
        props: {
          options,
          modelValue: options[0],
        },
      });
      await wrapper.find("input").trigger("focus");
      await wrapper.find("input").trigger("keydown.enter");
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
  });
});
