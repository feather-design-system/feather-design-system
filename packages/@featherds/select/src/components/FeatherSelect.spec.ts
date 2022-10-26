import FeatherSelect from "./FeatherSelect.vue";
import { mount } from "@vue/test-utils";
import * as id from "@featherds/utils/id";
import axe from "@featherds/utils/test/axe";
import { getCalls } from "@featherds/utils/test/calls";
import "@featherds/input-helper/test/MutationObserver";
import { nextTick } from "vue";
import { ISelectItemType } from "./types";
import { Code } from "@featherds/utils/keys";
import { vi, expect, describe, it } from "vitest";
vi.spyOn(id, "getSafeId").mockImplementation((x) => x);

const getProps = (props: unknown) => {
  return {
    label: "Users",
    ...(props as Record<string, unknown>),
  };
};

const options = [
  {
    _text: "Item 1",
  },
  {
    _text: "Item 2",
  },
] as ISelectItemType[];
const getFullWrapper = function (options: Record<string, unknown> = {}) {
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
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should not raise the label when its empty", () => {
    const wrapper = getFullWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render in error state", () => {
    const wrapper = getFullWrapper({
      props: {
        error: "ERROR",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render in disabled state", () => {
    const wrapper = getFullWrapper({
      props: {
        disabled: true,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should open the menu on enter", async () => {
    const wrapper = getFullWrapper({
      props: {
        options,
      },
    });
    const input = wrapper.find("input");
    await input.trigger("focus");
    await input.trigger("keydown", { code: Code.ENTER });

    expect(wrapper.vm.showMenu).toBe(true);
  });
  it("should close the menu on esc and emit update:modelValue", async () => {
    const wrapper = getFullWrapper({
      props: {
        options,
      },
    });
    const input = wrapper.find("input");
    await input.trigger("focus");
    await input.trigger("keydown", { code: Code.ENTER });
    await input.trigger("keydown", { code: Code.ESCAPE });

    expect(wrapper.vm.showMenu).toBe(false);
    expect(
      getCalls<[ISelectItemType]>(wrapper, "update:modelValue")[0][0]
    ).toStrictEqual(options[0]);
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
    expect(
      getCalls<[ISelectItemType]>(wrapper, "update:modelValue")[0][0]
    ).toBeUndefined();
  });
  it("should open and select first item on first down", async () => {
    const wrapper = getFullWrapper({
      props: {
        options,
      },
    });
    const input = wrapper.find("input");
    await input.trigger("focus");
    await input.trigger("keydown", { code: Code.DOWN });

    expect(wrapper.vm.showMenu).toBe(true);
    expect(wrapper.vm.internalValue).toStrictEqual(options[0]);
  });
  it("should open and select first item on first up", async () => {
    const wrapper = getFullWrapper({
      props: {
        options,
      },
    });

    const input = wrapper.find("input");
    await input.trigger("focus");
    await input.trigger("keydown", { code: Code.UP });

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

    const input = wrapper.find("input");
    await input.trigger("focus");
    await input.trigger("keydown", { code: Code.DOWN });

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

    const input = wrapper.find("input");
    await input.trigger("focus");
    await input.trigger("keydown", { code: Code.DOWN });
    expect(wrapper.vm.showMenu).toBe(true);

    await input.trigger("keydown", { code: Code.ESCAPE });
    expect(wrapper.vm.showMenu).toBe(false);
    expect(
      getCalls<[ISelectItemType]>(wrapper, "update:modelValue")[0][0]
    ).toStrictEqual(options[1]);
  });
  it("should not wrap to the top when down is pressed on the last option", async () => {
    const wrapper = getFullWrapper({
      props: {
        options,
        modelValue: options[options.length - 1],
      },
    });

    const input = wrapper.find("input");
    await input.trigger("focus");
    await input.trigger("keydown", { code: Code.DOWN });

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

    const input = wrapper.find("input");
    await input.trigger("focus");
    await input.trigger("keydown", { code: Code.UP });

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

    const input = wrapper.find("input");
    await input.trigger("focus");
    await input.trigger("keydown", { code: Code.UP });

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

    const input = wrapper.find("input");
    await input.trigger("focus");
    await input.trigger("keydown", { code: Code.HOME });
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

    const input = wrapper.find("input");
    await input.trigger("focus");
    await input.trigger("keydown", { code: Code.END });

    expect(wrapper.vm.showMenu).toBe(true);
    expect(wrapper.vm.internalValue).toStrictEqual(options[options.length - 1]);
  });
  it("should remain focused when item is selected via click and emit update:modelValue", async () => {
    const wrapper = getFullWrapper({
      props: {
        options,
      },
    });

    const input = wrapper.find("input");
    await input.trigger("focus");
    await input.trigger("keydown", { code: Code.ENTER }); // open menu

    wrapper.findComponent({ ref: "list" }).vm.$emit("select", options[0]);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showMenu).toBe(false);
    expect(document.activeElement).toBe(wrapper.find("input").element);
    expect(
      getCalls<[ISelectItemType]>(wrapper, "update:modelValue")[0][0]
    ).toStrictEqual(options[0]);
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
    vi.useFakeTimers({
      toFake: ["setTimeout", "clearTimeout"],
    });

    const wrapper = getFullWrapper({
      props: {
        options: options.concat([{ _text: "ab" }]),
      },
    });

    const input = wrapper.find("input");
    await input.trigger("focus");
    await input.trigger("keydown", { code: Code.ENTER });

    await input.trigger("keydown", { key: "a" });
    await input.trigger("keydown", { key: "b" });

    vi.runAllTimers();
    expect(
      (
        wrapper.vm.internalValue as ISelectItemType as { _text: string }
      )._text.indexOf("ab")
    ).toBe(0);
  });
  describe("accessibility", () => {
    it("should be accessible in normal state", async () => {
      vi.useRealTimers();

      const wrapper = getFullWrapper();
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
    it("should be accessible in open state with value", async () => {
      vi.useRealTimers();

      const wrapper = getFullWrapper({
        props: {
          options,
          modelValue: options[0],
        },
      });

      const input = wrapper.find("input");
      await input.trigger("focus");
      await input.trigger("keydown", { code: Code.ENTER });

      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
  });
});
